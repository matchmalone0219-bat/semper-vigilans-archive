# Project Agent Notes

本项目的内容录入、来源等级、媒体路径、日期格式、访谈直译与史料严谨性统一遵循：

`CONTENT_GUIDE.md`

核心文案与史料准则：
1. **直接引语客观直译**：`quoteZh` 严禁过度文学化润色与拔高；拿不到可逐字核对的原文时降级为“发言摘要”，不得继续使用直接引语样式。
2. **访谈分析与原话分层**：访谈及一手发言中的二级解读、风格推断与背景补充放入独立 `note` 字段；前台通过结构与版式区分，不添加 `【本站整理】`、`[ARCHIVE CURATOR NOTE]`、“经核对”等自证式前缀。
3. **史料原版与扩展彻底解耦**：`historical` 判断素材本身是否为真实历史原物，不等同于 `sourceTier=official`；本站新建复原内容默认 `extended`，只有核对历史原物后才能显式升级为 `historical`。
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
