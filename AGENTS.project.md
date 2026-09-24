# Project Agent Notes

本项目的内容录入、来源等级、媒体路径、日期格式、访谈直译与史料严谨性统一遵循：

`CONTENT_GUIDE.md`

核心文案与史料准则：
1. **直接引语客观直译**：`quoteZh` 严禁过度文学化润色与拔高，忠实保留当事人平实直接的原话口吻。
2. **分析性评述收敛于按语**：所有二级解读、风格推断与脉络梳理必须放在 `note` 中，且统一前缀 `【本站整理】`。
3. **史料原版与扩展彻底解耦**：官方历史原版（`historical`）必须对应真实一手原物证；本站扩展（`extended`）在数据对象与标签上必须独立分立。
4. **全站档期与事实绝对一致**：《新蝙蝠侠 2》官方正式公映档期全站统一为 **2028 年 2 月 18 日**，严禁出现陈旧档期导致自相矛盾。

完成修改后必须运行验证工作流：

```bash
npm run typecheck
npm test
npm run content:check
npm run i18n:check
npm run media:check
npm run build:github-pages
```
