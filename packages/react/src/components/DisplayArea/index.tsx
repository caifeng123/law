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
  text-align: center;
`;

export const DisplayArea = memo(() => {
  const [html, setHtml] = useState('');
  const { forms, showPaperKey, packages, showPackageKey, setPaperDetail } = usePaper();
  const papers = packages[showPackageKey] ?? {};
  const { data, loading, run } = useRequest(fetchDetailHtml, {
    manual: true,
    onError: () => setHtml(''),
    onBefore: () => setHtml('')
  });

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
    return (
      <MiddleTips>
        <div>
          <div>展示区</div>
          请在左上角选择检查文案
        </div>
      </MiddleTips>
    );
  }
  if (loading) {
    return <MiddleTips>加载中...</MiddleTips>;
  }
  if (!html) {
    return (
      <MiddleTips>请求出错 请看控制台</MiddleTips>
    );
  }
  return (
    <CombinedDisplay html={html} forms={forms} />
  );
});
