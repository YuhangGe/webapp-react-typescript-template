# 项目名

## Develop

首先访问 https://pnpm.io/installation 安装 pnpm

初始化项目
````bash
git clone xxx/project_name
cd project_name
pnpm install
````

配置 vscode
````
typescript.tsserver.pluginPaths: ["typescript-plugin-css-modules"]
````
如果没有配置 vscode，module css 没有智能提示和高级类型约束。

