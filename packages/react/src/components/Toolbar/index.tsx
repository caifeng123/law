import styled from '@emotion/styled';
import { Button, Select } from 'antd';
import { memo, useMemo } from 'react';

import { usePaper } from '@/hooks/usePaper';

import { download, downloadAll } from './util';

const ToolbarWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  grid-gap: 20px;
`;

export const Toolbar = memo(() => {
  const {
    packages,
    changeShowPackageKey,
    changeShowPaperKey,
    forms,
    showPaperKey,
    showPackageKey
  } = usePaper();
  const papers = packages[showPackageKey] ?? {};
  const dirOptions = useMemo(
    () => Object.keys(packages).map((packageName) => ({ label: packageName, value: packageName })),
    [packages]
  );

  const docOptions = useMemo(
    () => Object.keys(papers).map((paper) => ({ label: paper, value: paper })),
    [packages, showPackageKey]
  );

  return (
    <ToolbarWrapper>
      <Select value={showPackageKey} options={dirOptions} onChange={changeShowPackageKey} placeholder="请选择文件夹" style={{ width: 200 }} />
      <Select value={showPaperKey} options={docOptions} onChange={changeShowPaperKey} placeholder="请选择文档" style={{ width: 200 }} />
      <div />
      <Button type="primary" onClick={() => download({ papers, showPaperKey, forms })}>下载当前页</Button>
      <Button onClick={() => downloadAll({ papers, forms, showPackageKey })}>下载所有页面</Button>
    </ToolbarWrapper>
  );
});
