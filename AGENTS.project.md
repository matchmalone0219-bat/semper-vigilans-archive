# Semper Vigilans 内容更新规范

本指南用于指导《新蝙蝠侠2》档案站（Semper Vigilans Archive）的内容录入与日常资料维护，确保数据可靠性与结构一致性。

---

## 核心录入原则

1. **数据与展现分离**：内容数据应优先放在 `src/data/`（如 `film.ts`、`interviews.ts`、`recap.ts`）或稳定的实体库（如 `src/lib/people.ts`、`src/lib/places.ts`、`src/lib/relations.ts`）。
2. **禁止在组件中硬编码**：页面组件仅负责渲染与交互，严禁在 React 组件内硬编码新增新闻、路透或图文资料。
3. **拍摄日志结构约束**：新增拍摄日志必须严格遵循当前 `LOG` 数据结构（包含 `date`、`iso`、`title`、`body`、`kind`，可选 `source`、`sourceUrl`、`sourceTier`、`image`、`images`、`video` 等）。
4. **日期字段规范**：
   - `iso` 字段必须遵循 `YYYY-MM-DD` 格式且必须为有效日历日期（如平年 2 月 29 日、2 月 30 日等均会被校验器拦截）。
   - 展示日期 `date` 遵循项目约定（如 `YYYY.MM.DD` 或无明确日期时的 `YYYY.MM`）。
5. **来源信息三要素完整性**：若声明信源，以下三个字段必须同时提供，不可残缺：
   - `source`：信源机构或记者/账号名称（如 `Variety`、`STV News`、`片场路透 · hoeBread36`）。
   - `sourceUrl`：可访问的完整链接（必须以 `http://` 或 `https://` 开头）。
   - `sourceTier`：信源等级。
6. **来源等级枚举限制**：`sourceTier` 仅允许以下三个预设级别，严禁自行扩展：
   - `official`：官方信源（导演/主创公开账号、制片厂公报、官方备案等）。
   - `press`：媒体信源（主流影视期刊、专业采写、市政交通通告等）。
   - `set`：片场记录（实地目击路透、现场照片/影像记录等）。
7. **静态资源存放规范**：本地图片与静态媒体统一存放在 `public/media/` 目录下（如 `public/media/log/`、`public/media/places/`）。
8. **路径与文件存在性保证**：数据中引用 `/media/...` 路径时，必须保证文件真实存在于本地对应目录中。
9. **外键关联 ID 校验**：
   - `CAST` 中的 `personId` 必须引用已有的人物节点 ID（存在于 `NODES`）。
   - 人物档案中的 `places` 必须引用已有的地点 ID（存在于 `PLACES`）。
   - 地点档案中的 `people` 必须引用已有的人物 ID。
   - 人物关系网络 `EDGES` 中的 `a` 与 `b` 必须引用已有的人物 ID。
10. **真实度与确信度等级**：故事线索及设定必须维持当前确信度规则：
    - `confirmed`：主创或官方正式公布。
    - `hint`：片场实景道具、拍摄通告等间接线索印证。
    - `rumor`：未经证实的行业或粉丝传闻推测。

---

## 验证工作流

新增资料或修改数据后，请依次执行以下命令：

1. **内容校验（必须通过）**：
   ```bash
   npm run content:check
   ```
   该命令会自动核查日期合法性、信源三要素、媒体文件存在性以及关联实体 ID。

2. **完整提交前验证（建议执行）**：
   ```bash
   npm run typecheck
   npm run test
   npm run content:check
   npm run build:github-pages
   ```

---

## 强调事项

新增普通资料时，原则上只应修改 `src/data/` 和 `public/media/`。如发现每次新增一条资料都需要修改 React 页面，应优先检查是否存在结构设计问题。
