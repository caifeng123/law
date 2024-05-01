import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { getRepoTrees } from '@/api/gitee';
import { InitalConfig } from '@/constants';
import { fetchLostPapers } from '@/utils';
import { Config } from '@/utils/types';

export const useConfig = () => {
  const [config, setConfig] = useState(InitalConfig);

  const { data, loading } = useRequest(getRepoTrees, {
    retryCount: 2,
    onError: (error) => {
      message.error(`接口出错啦：${error.message}`);
    }
  });

  const setImmerConfig = useCallback((
    templateConfig: Partial<Config> | ((config: Config) => Config)
  ) => {
    if (typeof templateConfig === 'function') {
      setConfig(templateConfig);
    } else {
      setConfig((old) => ({
        ...old,
        ...templateConfig
      }));
    }
  }, []);

  const setPackagePapers = useCallback(async (retry = 0) => {
    // 若重试2次则取消
    if (retry === 2) {
      return;
    }
    const { packages, showPackageKey } = config;
    const { successPapers, hasNoSuccess } = await fetchLostPapers(packages[showPackageKey]);
    setImmerConfig((config) => {
      const temp = { ...config };
      temp.packages[showPackageKey] = {
        ...temp.packages[showPackageKey] ?? {},
        ...successPapers
      };
      return temp;
    });

    // 有失败的则进入重试
    if (hasNoSuccess) {
      setPackagePapers(retry + 1);
    }
  }, [config.packages, config.showPackageKey]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const packages: Config['packages'] = data.tree.reduce((all, { type, path }) => {
      if (type === 'tree') {
        return {
          ...all,
          [path]: {}
        };
      } if (type === 'blob') {
        const [packageKey, fileName] = path.split('/');
        return {
          ...all,
          [packageKey]: {
            ...all[packageKey],
            [fileName]: { path }
          }
        };
      }
      return all;
    }, {} as Config['packages']);

    setImmerConfig({ packages });
  }, [data]);

  useEffect(() => {
    if (config.showPackageKey) {
      setPackagePapers();
    }
  }, [config.showPackageKey]);

  return {
    config,
    loading,
    setImmerConfig
  };
};
