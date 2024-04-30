import { convertToHtml } from 'mammoth/mammoth.browser';

import { getRawFile } from '@/api/gitee';

import { Paper } from './types';

export const replaceSpecialHTMLToRender = (html: string) => {
  const res = html.replace(/\[(.*?)\]/g, (_, match) => `<span attr-key="${match}"></span>`);
  return res;
};

export const replaceSpecialHTMLToDownload = (html: string, forms) => {
  const res = html.replace(/\[(.*?)\]/g, (_, match) => `<span style="color: red;background-color: yellowgreen;">${forms[match] || `[${match}]`}</span>`);
  return res;
};

export const fetchDetailHtml = async (path: string) => {
  if (!path) {
    throw new Error('empty path, check query');
  }
  const arrayBuffer = await getRawFile(path);
  return convertToHtml({ arrayBuffer });
};

export const getNoSettledPapers = (papers: Record<string, Paper>) => Object.entries(papers)
  .reduce((all, [paperKey, { path, html }]) => {
    if (!html) {
      all.push({ paperKey, path });
    }
    return all;
  }, [] as { paperKey: string, path: string }[]);

export const fetchLostPapers = async (papers: Record<string, Paper>) => {
  const noSettledPapers = await Promise.allSettled(
    getNoSettledPapers(papers).map(async ({ paperKey, path }) => {
      const data = await fetchDetailHtml(path);
      const finalHTML = replaceSpecialHTMLToRender(data.value);
      return {
        paperKey,
        raw: data.value,
        html: finalHTML,
        path
      };
    })
  );
  let hasNoSuccess = false;

  const successPapers = noSettledPapers.reduce((all, result) => {
    if (result.status === 'fulfilled') {
      const { paperKey, ...rest } = result.value;
      all[paperKey] = rest;
    } else {
      hasNoSuccess = true;
    }
    return all;
  }, {} as Record<string, Paper>);

  return {
    hasNoSuccess,
    successPapers
  };
};
