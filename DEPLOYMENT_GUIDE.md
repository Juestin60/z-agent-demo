# GitHub Pages 部署指南

## 仓库信息
- GitHub 用户名: Juestin60
- 仓库名称: z-agent-demo
- 网站访问地址: https://juestin60.github.io/z-agent-demo/

## 部署步骤

### 1. 在 GitHub 上创建仓库

请访问: https://github.com/new

填写以下信息：
- Repository name: `z-agent-demo`
- Description: (可选) "Z-Agent Demo Website"
- 选择 **Public** (公开仓库才能使用免费的 GitHub Pages)
- **不要** 勾选 "Add a README file"
- **不要** 勾选 "Add .gitignore"
- **不要** 选择 License

点击 "Create repository" 按钮。

### 2. 推送代码到 GitHub

创建仓库后，在您的终端中运行以下命令：

```bash
cd /Users/juestin60/Documents/Mycode/xagent

# 添加远程仓库
git remote add origin https://github.com/Juestin60/z-agent-demo.git

# 推送代码到 GitHub
git push -u origin main
```

如果提示需要登录，请按照提示操作。

### 3. 配置 GitHub Pages

推送成功后：

1. 访问仓库设置页面: https://github.com/Juestin60/z-agent-demo/settings/pages

2. 在 "Build and deployment" 部分：
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 "main"，目录选择 "/ (root)"
   - 点击 "Save"

3. 等待 1-2 分钟，GitHub Pages 会自动构建和部署

4. 部署完成后，访问: https://juestin60.github.io/z-agent-demo/

## 注意事项

- 本地仓库已经通过 .gitignore 排除了所有 Python 脚本和配置文件
- 只有网站文件 (HTML, CSS, JS, 图片等) 会被上传到 GitHub
- 您的克隆脚本代码不会被公开

## 后续更新

如果您需要更新网站内容，只需：

```bash
cd /Users/juestin60/Documents/Mycode/xagent
git add .
git commit -m "Update website"
git push
```

GitHub Pages 会自动重新部署更新后的内容。

