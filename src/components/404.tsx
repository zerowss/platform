import { Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status={404}
    title="404"
    subTitle="很遗憾！页面不存在。"
  />
);

export default NoFoundPage;
