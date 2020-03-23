/*
 * @Author: your name
 * @Date: 2020-03-13 10:56:41
 * @LastEditTime: 2020-03-13 10:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/router/index.ts
 */
import staticRoutes from './staticRoutes';
import mainRoutes from './mainRoutes';

const routes = [...staticRoutes, ...mainRoutes];

export default routes;
