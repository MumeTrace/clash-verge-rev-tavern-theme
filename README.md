# Clash Verge Rev Warm Tavern Theme

一个仅通过 CSS 注入实现的 Clash Verge Rev 暖色酒馆主题。它不修改应用核心代码，并尽量只使用稳定的应用类名、MUI 固定类、语义属性和 DOM 结构选择器。

> 当前适配并验证的版本：Clash Verge Rev 2.5.2。

## 特性

- 左右分区背景、暖色渐变衔接和响应式定位。
- 半透明导航、卡片、弹窗和输入控件，不全局破坏 MUI 状态色。
- 节点卡片、协议标签、延迟、选中状态和订阅卡片的独立样式。
- 流量图、速度与内存信息保留在自定义人物背景前景。
- 不使用 `.css-xxxx` 一类会随构建变化的 MUI 哈希类。
- 自动检查危险的全局选择器、动态类名、公开图片 URL 和误提交的图片文件。
- Chromium CSSOM 与计算样式测试，覆盖关键选择器和视觉状态。

## 隐私与素材边界

本仓库采用 MIT 许可证，但作者使用的背景图、人物图以及对应图片地址不属于开源内容，也不会进入 Git 历史。

公开主题的三个图片变量默认均为 `none`。你需要使用自己有权使用的图片，并将地址保存在被 Git 忽略的 `theme.private.json` 中。

## 使用方法

需要 Node.js 22 或更高版本。

```powershell
npm ci
Copy-Item theme.private.example.json theme.private.json
```

编辑 `theme.private.json`：

```json
{
  "mainImageUrl": "你的右侧背景直链",
  "sidebarImageUrl": "你的左侧竖图直链",
  "chibiImageUrl": "你的透明人物图直链"
}
```

生成不会被 Git 跟踪的私人主题文件：

```powershell
npm run build:private
```

将 `clash-verge-tavern-theme.private.css` 的完整内容粘贴到 Clash Verge Rev 的 CSS 注入编辑器中。不要把它追加到旧版 CSS 后面，否则旧的 `!important` 规则可能继续生效。

## 开发

主题按职责拆分在 `parts/`：

| 文件 | 职责 |
| --- | --- |
| `00-variables.css` | 公开占位图片、颜色、尺寸和公共阴影 |
| `01-background.css` | 右侧背景、页面透明化与定位 |
| `02-sidebar.css` | 左侧背景、导航、Logo 与选中动画 |
| `03-traffic-chibi.css` | 流量统计框和人物背景层 |
| `04-titlebar-controls.css` | 标题栏与按钮 |
| `05-node-cards.css` | 节点、标签、延迟与选中状态 |
| `06-panels-overlays.css` | 首页卡片、订阅、输入框、弹窗和响应式规则 |

构建公开合并文件：

```powershell
npm run build
```

执行全部检查：

```powershell
npm test
```

浏览器测试需要 Playwright Chromium。首次本地运行前可执行：

```powershell
npx playwright install chromium
```

Windows 用户也可以使用 `build-theme.ps1` 和 `validate-theme.ps1` 包装脚本。

## 为什么不用 MUI 哈希类

`.css-1abcxyz` 一类名称由 CSS-in-JS 构建过程生成，升级应用、调整组件样式顺序或重新打包后都可能变化。本项目优先使用：

- 应用固定类：`.layout-content__left`、`.the-menu`、`.the-traffic`、`.the-delay`。
- MUI 固定组件类：`.MuiListItemButton-root`、`.Mui-selected`、`.MuiDialog-paper`。
- 稳定属性：`data-css-injection-root`、`data-index`、`data-tauri-drag-region`。
- 父子与相邻结构关系。

这种方式无法保证跨越所有未来版本，但比绑定哈希类更容易维护和诊断。

## 兼容性说明

- 本主题只在 Clash Verge Rev 2.5.2 的 DOM 结构上完成验证。
- WebView2 支持主题使用的 `:has()`、背景滤镜和 CSS 自定义属性。
- Clash Verge Rev 更新后，如果固定结构发生变化，应先更新测试夹具和选择器，再发布兼容版本。

## 参与贡献

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题请按 [SECURITY.md](SECURITY.md) 中的方式报告。

## 许可证

代码以 [MIT License](LICENSE) 发布。图片、图片 URL 和其他未提交的私人素材不包含在授权范围内。
