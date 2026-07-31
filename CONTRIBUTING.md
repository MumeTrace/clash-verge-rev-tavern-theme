# Contributing

感谢你改进本主题。

## 开发流程

1. Fork 仓库并从 `main` 创建功能分支。
2. 只修改 `parts/*.css`，不要直接维护生成文件中的重复规则。
3. 不要提交图片、图片直链、私人配置或 Clash 配置内容。
4. 运行 `npm ci`、`npx playwright install chromium` 和 `npm test`。
5. 提交 Pull Request，并说明适配的 Clash Verge Rev 版本、DOM 依据和验证结果。

## 选择器要求

- 优先使用应用固定类、MUI 固定组件类、语义属性和局部结构关系。
- 禁止使用 `.css-xxxx` 动态哈希类。
- 禁止使用 `* { color: ... }` 一类全局文字覆盖。
- 禁止全局清空 `.MuiBox-root` 背景。
- 新增关键视觉状态时，同时更新 `tests/css-parse.html` 的计算样式断言。

## 提交信息

使用简短的祈使语气，例如：

- `Improve selected node contrast`
- `Add responsive traffic panel sizing`
- `Update selectors for Clash Verge Rev 2.5.3`
