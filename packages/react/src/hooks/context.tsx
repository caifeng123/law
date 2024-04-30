import { Spin } from 'antd';
import { createContext, useMemo } from 'react';

import { InitalConfig } from '@/constants';
import { Config } from '@/utils/types';

import { useConfig } from './useConfig';

export const ConfigConetxt = createContext({
  config: InitalConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setImmerConfig: (_: Partial<Config> | ((config: Config) => Config)) => {}
});

export function ConfigConetxtProvide({ children }: { children: React.ReactElement }) {
  const { loading, config, setImmerConfig } = useConfig();

  const value = useMemo(() => ({ setImmerConfig, config }), [config]);

  return (
    <ConfigConetxt.Provider value={value}>
      <Spin fullscreen spinning={loading} />
      {children}
    </ConfigConetxt.Provider>
  );
}
