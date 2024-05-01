import { useContext } from 'react';

import { getPaperFormItems } from '@/utils';

import { ConfigConetxt } from './context';

export const usePaper = () => {
  const { config, setImmerConfig } = useContext(ConfigConetxt);

  const changeShowPaperKey = (key: string) => setImmerConfig({ showPaperKey: key });
  const changeShowPackageKey = (key: string) => setImmerConfig({
    showPackageKey: key,
    showPaperKey: undefined
  });

  const setPaperDetail = (
    rawHtml: string,
    html: string
  ) => {
    setImmerConfig((conf) => {
      const tempConf = { ...conf };
      const paper = tempConf.packages[conf.showPackageKey][conf.showPaperKey];
      paper.formItems = getPaperFormItems(rawHtml);
      paper.html = html;
      paper.raw = rawHtml;
      return tempConf;
    });
  };

  return {
    changeShowPaperKey,
    changeShowPackageKey,
    setPaperDetail,
    ...config
  };
};
