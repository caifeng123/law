import { message } from 'antd';
import { saveAs } from 'file-saver';
import HTMLtoDOCX from 'html-to-docx';
import JSZip from 'jszip';

import { fetchLostPapers, replaceSpecialHTMLToDownload } from '@/utils';

export const download = async ({ papers, showPaperKey, forms }) => {
  if (!showPaperKey || !papers[showPaperKey].html) {
    message.error('请先选择「检查文案」');
    return;
  }
  const html = replaceSpecialHTMLToDownload(papers[showPaperKey].raw, forms);
  const data = await HTMLtoDOCX(html);
  saveAs(data, showPaperKey);
};

export const downloadAll = async (
  { papers, forms }:
  { papers: Record<string, any>, forms:Record<string, string> }
) => {
  // 尝试获取一次缺失文件
  const { successPapers } = await fetchLostPapers(papers);

  const allPapers = { ...papers, ...successPapers };

  const paperList = Object.entries(allPapers).reduce((all, [key, value]) => {
    if (value.raw) {
      all.push({
        key,
        value: value.raw
      });
    }
    return all;
  }, [] as Array<{ key: string, value: string }>);

  const blobList = await Promise.all(paperList.map(async ({ key, value }) => {
    const html = replaceSpecialHTMLToDownload(value, forms);
    return {
      key,
      blob: HTMLtoDOCX(html)
    };
  }));
  const zip = new JSZip();
  blobList.forEach(({ key, blob }) => {
    // 使用 blob 的内容创建一个新的 zip 文件条目
    zip.file(`${key}`, blob);
  });

  // 生成 zip 文件
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'documents.zip');
};
