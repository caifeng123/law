export const getRepoTrees = () => fetch('https://gitee.com/api/v5/repos/cc123nice/law_packages/git/trees/master?recursive=1&access_token=c9a612387a4a85183907a1a8c461f17a')
  .then((res) => res.json());

export const getRawFile = (path: string) => fetch(`https://gitee.com/api/v5/repos/cc123nice/law_packages/raw/${path}?access_token=c9a612387a4a85183907a1a8c461f17a`)
  .then((res) => res.arrayBuffer());
