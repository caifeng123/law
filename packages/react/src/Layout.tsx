import styled from '@emotion/styled';

import { DisplayArea } from './components/DisplayArea';
import { InputForm } from './components/InputForm';
import { Toolbar } from './components/Toolbar';
import { ConfigConetxtProvide } from './hooks/context';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template: auto 1fr / repeat(2, 1fr);
  height: 100vh;
  box-sizing: border-box;
  .toolbar {
    grid-area: 1 / 1 / 1 / -1;
  }
  .grid-item {
    padding: 10px;
    margin: 10px;
    border: 1px solid green;
    overflow-y: scroll;
  }
`;

// 需求设计图
// https://esx5ln58og.feishu.cn/docx/EXPXdk9K5oHDj9xM4ipcqLrrnvh
function Layout() {
  return (
    <ConfigConetxtProvide>
      <LayoutWrapper>
        <div className="grid-item toolbar"><Toolbar /></div>
        <div className="grid-item"><InputForm /></div>
        <div className="grid-item"><DisplayArea /></div>
      </LayoutWrapper>
    </ConfigConetxtProvide>
  );
}

export default Layout;
