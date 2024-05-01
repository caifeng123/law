import styled from '@emotion/styled';
import { Form, Input } from 'antd';
import { memo, useContext, useEffect, useState } from 'react';

import { ConfigConetxt } from '@/hooks/context';

const MiddleTips = styled.div`
  display: grid;
  place-items: center center;
  height: 100%;
  font-size: 30px;
  text-align: center;
`;

export const InputForm = memo(() => {
  const [form] = Form.useForm();
  const [formItems, setFormItems] = useState<string[]>([]);
  const { setImmerConfig, config } = useContext(ConfigConetxt);
  const { showPaperKey, packages, showPackageKey } = config;
  const currentPaper = packages?.[showPackageKey]?.[showPaperKey] ?? {};

  useEffect(() => {
    if (currentPaper.formItems) {
      setFormItems(currentPaper.formItems);
    }
  }, [currentPaper.formItems]);

  useEffect(() => {
    if (showPackageKey) {
      setFormItems([]);
      form.resetFields();
    }
  }, [showPackageKey]);

  Form.useWatch((forms) => setImmerConfig({ forms }), form);

  if (!formItems.length) {
    return (
      <MiddleTips>
        <div>
          <div>表单区</div>
          请在左上角选择检查文案
        </div>
      </MiddleTips>
    );
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      {
        formItems.map((item) => (
          <Form.Item key={item} name={item} label={item} initialValue="">
            <Input />
          </Form.Item>
        ))
      }
    </Form>
  );
});
