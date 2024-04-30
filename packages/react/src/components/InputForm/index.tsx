import { Form, Input } from 'antd';
import { memo, useContext } from 'react';

import { formItems } from '@/constants';
import { ConfigConetxt } from '@/hooks/context';

export const InputForm = memo(() => {
  const [form] = Form.useForm();
  const { setImmerConfig } = useContext(ConfigConetxt);

  Form.useWatch((forms) => setImmerConfig({ forms }), form);

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
