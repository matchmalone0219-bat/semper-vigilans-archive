# Project Agent Notes

本项目的内容录入、来源等级、媒体路径、日期格式、访谈直译与史料严谨性统一遵循：

`CONTENT_GUIDE.md`

核心文案与史料准则：
1. **直接引语客观直译**：`quoteZh` 严禁过度文学化润色与拔高，忠实保留当事人平实直接的原话口吻。
2. **访谈分析与原话分层**：访谈及一手发言中的二级解读、风格推断与背景补充放入 `note`，并统一前缀 `【本站整理】`；分析型栏目继续使用其既有正文结构。
3. **史料原版与扩展彻底解耦**：`historical` 判断素材本身是否为真实历史原物，不等同于 `sourceTier=official`；本站扩展（`extended`）必须在数据对象与标签上独立分立。
4. **核心事实单一来源**：片名、正式档期等以 `src/data/film.ts` 的 `FILM` 为项目级权威事实源；其他页面不得自行维护另一套值。当前档期值见 `FILM.releaseLabel` / `FILM.releaseIso`。

完成修改后必须运行验证工作流：

```bash
npm run typecheck
npm test
npm run content:check
npm run i18n:check
npm run media:check
npm run build:github-pages
```
