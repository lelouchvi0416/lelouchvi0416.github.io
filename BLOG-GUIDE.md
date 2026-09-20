# 博客使用说明

## 日常写作

继续使用原来的 `/admin/` 后台发布文章，登录和文章目录均未改变。

- 标题、日期、正文照常填写；摘要用于首页简介和搜索引擎描述。
- 封面展开后选择图片，并填写图片说明，方便无障碍阅读。
- 分类建议少而固定，例如「嵌入式」「自动控制」「学习记录」；标签可具体到 STM32、FPGA、MQTT。
- 排序权重留空时按日期排列；需要置顶时填 1、2 等正整数，数字越小越靠前。
- 草稿不会出现在正式站点；未来日期的文章也不会提前发布。静态站点到时间后仍需要触发一次构建。
- 首页展示前五篇文章，全部文章在「文章」页面自动分页。分类、标签、搜索、归档和 RSS 随构建自动更新。

## 本地预览

在博客目录执行 `hugo server --disableFastRender`，访问命令输出的本地地址。若系统找不到 hugo，可使用本机路径：

```powershell
& 'C:\Program Files\hugo\hugo_extended_0.166.0_windows-amd64\hugo.exe' server --disableFastRender
```

预览草稿可以加 `-D`，发布前用 `hugo --minify` 构建检查。

## 发布本次改版

本次只修改本地文件，没有代为提交或推送。确认效果后将修改提交到 GitHub，原来的 GitHub Actions 会构建并发布。
如果期间通过后台发过新文章，先检查 `git status`，保存本地改动，再 `git pull --rebase` 同步；解决冲突后再推送。不要使用强制推送覆盖后台文章。

## 以后改哪里

- `assets/css/extended/custom.css`：颜色、字体、间距、手机适配。
- `layouts/home.html`：首页文字与模块。
- `content/projects.md`、`content/about.md`：项目和个人介绍，仍按 Markdown 编辑。
- `hugo.toml`：导航、站点信息、阅读功能。
- `static/admin/config.yml`：写作表单字段；后台 backend 已保留。
- `static/favicon.svg` 及 PNG / ICO：站点图标。
- `assets/js/garden.js`：中文搜索、快捷键、阅读进度和链接复制。

主题目录未修改。当前自定义模板适配 Hugo 0.166.0 和本地 PaperMod，自动构建已固定 Hugo 版本，升级主题时应先本地验证。

## 阅读功能

支持系统明暗偏好、手动切换并记忆；按 `/` 打开搜索；文章有目录、代码复制、阅读进度、链接复制、上一篇/下一篇和返回顶部。短文阅读进度显示完成；代码复制和链接复制在 HTTPS 或 localhost 下工作。

没有添加跟踪统计、付费服务或需要额外服务器的功能。后台登录和线上自动部署依赖原有服务，本次没有实际发布测试文章。
