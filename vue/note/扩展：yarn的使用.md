## yarn

#### node 开启使用yarn

管理 Yarn 的首选方法是通过 [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html)，这是从 16.10 开始的所有 Node.js 版本附带的新二进制文件。它充当您和 Yarn 之间的中介，并允许您在多个项目中使用不同的包管理器版本，而无需再签入 Yarn 二进制文件。

要求：node >= 16.10

默认情况下，Corepack 包含在所有 Node.js 安装中，但目前是选择加入的。若要启用它，请运行以下命令：

```bash
corepack enable 
# 如果不需要就关闭即可
corepack disable
```

默认情况下，Corepack 包含在所有 Node.js 安装中，但目前是选择加入的。若要启用它，请运行以下命令：

```bash
npm i -g corepack
```

通过该种方式，你可以启用`yarn`和`pnpm`两种包管理器。

> 具体请看Node官网文档的介绍：https://nodejs.cn/api-v18/corepack.html。

更新包管理器

```bash
corepack prepare pnpm@8.10.5 --activate	# 更新pnpm
```







#### 1、什么是yarn





#### 2、yarn能做什么





#### 3、yarn指令

##### 3.1 yarn常用指令

```bash
# 1、添加依赖包
yarn add packagename	# 下载依赖包到本地
yarn add packagename1 packagename2 ...	# 下载多个依赖包到本地

# 2、查看包的版本,然后下载特定版本包
npm view 包名 versions	# 因为yarn没有查看包所有版本号的命令，所以使用npm
yarn add packagename@版本号


```

