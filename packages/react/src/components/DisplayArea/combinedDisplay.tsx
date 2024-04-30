import './combinedDisplay.css';

import { Tooltip } from 'antd';
import parse from 'html-react-parser';

const options = (forms) => ({
  // eslint-disable-next-line consistent-return
  replace: (DOMNode) => {
    const { attribs } = DOMNode;
    if (attribs?.['attr-key']) {
      const key = attribs['attr-key'];
      return (
        <Tooltip title={forms[key] ? key : '暂无输入'}>
          <span className="bg-yellow">{forms[key] || `[${key}]`}</span>
        </Tooltip>
      );
    }
  }
});

export function CombinedDisplay({ html, forms }: { html: string, forms: Record<string, string> }) {
  return <div>{parse(html, options(forms))}</div>;
}
