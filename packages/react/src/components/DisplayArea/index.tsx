import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { memo, useEffect, useState } from 'react';

import { usePaper } from '@/hooks/usePaper';
import { fetchDetailHtml, replaceSpecialHTMLToRender } from '@/utils';

import { CombinedDisplay } from './combinedDisplay';

const MiddleTips = styled.div`
  display: grid;
  place-items: center center;
  height: 100%;
  font-size: 30px;
`;

export const DisplayArea = memo(() => {
  const [html, setHtml] = useState('');
  const { forms, showPaperKey, packages, showPackageKey, setPaperDetail } = usePaper();
  const papers = packages[showPackageKey] ?? {};
  const { data, error, loading, run } = useRequest(fetchDetailHtml, { manual: true });

  useEffect(() => {
    if (showPaperKey) {
      if (papers[showPaperKey]?.html) {
        setHtml(papers[showPaperKey].html as string);
      } else {
        run(papers[showPaperKey].path);
      }
    }
  }, [showPaperKey]);

  useEffect(() => {
    if (!papers[showPaperKey]?.html && data) {
      const finalHTML = replaceSpecialHTMLToRender(data.value);
      setPaperDetail(data.value, finalHTML);
      setHtml(finalHTML);
    }
  }, [data]);

  if (!showPaperKey) {
    return <MiddleTips>请在左上角选择检查文案</MiddleTips>;
  }
  if (error) {
    return (
      <MiddleTips>请求出错 请看控制台</MiddleTips>
    );
  }
  if (loading) {
    return <MiddleTips>加载中...</MiddleTips>;
  }
  return (
    <CombinedDisplay html={html} forms={forms} />
  );
});
