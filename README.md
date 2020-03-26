# phecda

#### 使用技术

- **UI 框架**: `react`、`react-hook`
- **UI 组件**: `antd`
- **数据管理**：`redux`、`react-redux`、`redux-thunk`、`redux-logger`
- **类型检查**：`typescript`
- **接口请求**：`axios`
- **cookies**：`js-cookie`
- **过渡动画**：`react-transition-group`
- **CSS 规则**：`BEM`


#### 文件说明

```js
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── api
│   │   ├── request.ts // Axios 请求统一封装
│   ├── components // 系统组建和业务无关
│   ├── hooks // 自定义 react-hook
│   ├── index.tsx
│   ├── layout // 页面布局组件
│   ├── react-app-env.d.ts
│   ├── router
│   ├── serviceWorker.ts
│   ├── store  // redux
│   ├── styles // 基本公用的样式
│   ├── typings // 类型申明
│   ├── utils // 工具类
│   └── views // 视图
└── tsconfig.json

#### 支持环境

现代浏览器及 IE11

