# 装备页交互档案

2026-10-07，本地完成 `/gear` 第一版改造，尚未发布。

- 主体使用《The Art of The Batman》BM_27 正背面三维设计（用户选图）。网页遮罩覆盖左上说明框与左下图版标签；来源图与放大查看图保留完整内容。
- 八组随身装备通过目录切换，其中六组设身体热点。隐形眼镜与黏弹发射器保留独立入口。
- 影片用途与设计过程分开展示，图版只保留标题、图注和放大查看。页面聚焦 2022 年影片与概念设计，续集片场变体不混入人物图。
- 每件装备的影片用途与设计过程各自展开为两段以上的双语说明：战衣补充第二年原型、活动性与磨损；头罩、徽记、护臂、抓钩和腰带补充结构取舍；镜片、黏弹发射器和三款载具补充道具流程、部署方式与设计演变。正文使用设定集与创作者页面的概括，不复制长段原文。
- 蝙蝠战车、蝙蝠机车、流浪者机车各提供两张设计视角；保留引擎、私人座驾、车间与信号灯的关联条目。
- 保留原有 15 个装备锚点，新增 `drifter`。搜索摘要和中英文文本从同一档案数据生成。
- 桌面切换保持浏览位置；手机选择装备后滚动到详情。支持键盘选择、灯箱焦点循环、关闭后焦点返回、大图缩放和图片切换。

## 数据与图片

- 内容：`src/lib/gear-archive.ts`
- 搜索兼容层：`src/lib/gear.ts`、`src/lib/i18n/gear-en.ts`
- 页面：`src/routes/gear.tsx`
- 样式：`src/components/gear-archive.css`
- 来源清单与下载源文件 SHA256：`docs/gear-assets.json`
- 发布图：`public/media/gear-archive/`；书页配较小预览图，灯箱读取大图。
- 下载的原始扫描与创作者原图继续存放在上级 `reference-materials/`。
- 被替换的 13 张旧网页图移至上级 `reference-materials/gear-previous-assets/` 留存。旧 `gear-kit.jpg` 的造型与本次设定稿不一致；旧 `gear-turbine.jpg` 实为车间场景，改用可见引擎的战车概念图。

## 验证

通过 `typecheck`、`content:check`、`i18n:check`、`media:check`、`build:github-pages` 和三项装备数据回归。图片检查剩余 21 条既有小图提示，新增资源没有重复、孤儿或 MIME 错配。

完整 `npm test` 首次在受限环境中无法启动本机服务；允许本机浏览器测试后，出现地图/搜索页面加载超时。失败用例使用以下串行命令复查，28 项全部通过：

```sh
node --test --test-concurrency=1 scripts/gotham-model-ui.test.mjs scripts/search-ui.test.mjs
```

专项浏览器检查同时验证开发页和 GitHub Pages 静态构建：八组切换、六个热点、图版切换与缩放、关闭后焦点、历史返回、旧锚点、三款载具、手机详情滚动、英文界面及横向溢出。两种运行方式均通过，未发现页面异常或失效的图片请求。截图及结果位于 `output/playwright/gear-*`。
