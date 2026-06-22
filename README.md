# AI Pilot 工具导航站

这是一个无需构建工具的静态 AI 工具导航网站。

## 运行方式

直接双击 `index.html` 即可打开。

也可以在当前目录启动本地服务器，不需要安装任何 npm 包：

```powershell
node local-server.js
```

然后访问 `http://127.0.0.1:8080`。

## 修改内容

- 工具列表：编辑 `script.js` 里的 `tools`
- 分类：编辑 `script.js` 里的 `categories`
- 广告位文案和链接：编辑 `index.html` 中带有 `ad-slot` 的区域
- 颜色和布局：编辑 `styles.css` 里的 `:root` 变量和对应样式

## 部署到 Vercel 免费版

自动发布：

```powershell
.\publish.ps1
```

脚本会创建 GitHub 公共仓库、推送代码，并用当前登录的 Vercel 账号部署生产环境。

如果手动导入：

1. 把代码推送到 GitHub 仓库。
2. 登录 Vercel，选择 `Add New Project`。
3. 导入这个 GitHub 仓库。
4. Framework Preset 选择 `Other`，Build Command 留空，Output Directory 留空。
5. 点击 `Deploy`。
