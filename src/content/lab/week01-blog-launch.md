---
week: 1
title: 博客站点上线(Astro 静态站骨架)
done: true
repoDir: blog/my-astro-blog
metrics:
  "首屏 JS": "0 KB(内容页)"
  "直接依赖": "7 个"
  "构建": "astro build 通过"
pitfalls:
  - "Tailwind v4 必须在布局里 import global.css,否则样式完全不生效"
  - "Shiki 明暗双主题要配合 CSS 变量 --shiki-dark 才能切换"
  - "内容页用 Content Collections 做构建期校验,frontmatter 写错直接 build 失败"
---

## 本周产出

- 用 Astro 7 + Tailwind v4 搭好静态站点骨架,推 Git 即可自动发布
- Content Collections(posts / lab)两套 zod schema,构建期校验 frontmatter
- 首页、文章页(Shiki 高亮)、Lab 时间轴的纯静态页面,内容页零客户端框架
- 原生 CSS 变量的明暗主题;Giscus 评论区(填入仓库信息后启用)