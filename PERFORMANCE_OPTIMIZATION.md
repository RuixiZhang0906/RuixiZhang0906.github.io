# 性能优化指南

本文档介绍了为博客网站实施的性能优化措施，以及如何维护和进一步优化这些功能。

## 已实施的优化

### 1. CSS 优化
- 将 `blog.css` 拆分为核心样式 (`blog-core.css`)、组件样式 (`blog-components.css`) 和布局样式 (`blog-layout.css`)
- 创建了压缩版 `blog.min.css` 减少 HTTP 请求

### 2. JavaScript 优化
- 优化了博客搜索功能 (`blog_search.min.js`)
- 重构了 Notes 页面功能 (`blog_notes.min.js`)
- 优化了浏览量计数器 (`blog_views.min.js`)
- 减少了不必要的 DOM 操作

### 3. 资源懒加载和预加载
- 实现了图片和 iframe 的懒加载 (`lazy_loading.min.js`)
- 为关键资源添加了预加载策略
- 更新了所有图片组件，添加了 `loading="lazy"` 属性

### 4. 缓存控制和资源压缩
- 添加了 `.htaccess` 文件配置缓存控制和资源压缩
- 集成了 Jekyll 资源压缩插件 (`jekyll-minifier`)
- 添加了站点地图生成插件 (`jekyll-sitemap`)
- 创建了 `robots.txt` 优化搜索引擎爬取

## 如何安装新添加的插件

1. 确保已安装所需的 Ruby gems：

```bash
bundle install
```

2. 如果在 GitHub Pages 上部署，请确保在 `_config.yml` 中正确配置了插件：

```yaml
plugins:
  - jekyll-email-protect
  - jekyll-minifier
  - jekyll-sitemap
```

## 缓存控制和资源压缩配置

### .htaccess 文件

`.htaccess` 文件配置了以下功能：

- **GZIP 压缩**：压缩 HTML、CSS、JavaScript 等文本资源
- **浏览器缓存**：为不同类型的资源设置适当的缓存时间
- **缓存控制头**：设置 Cache-Control 头以优化缓存策略
- **移除 ETags**：避免不必要的验证请求

### Jekyll Minifier 配置

`_config.yml` 中配置了 Jekyll Minifier 插件，用于：

- 压缩 CSS 和 JavaScript 文件
- 保留 Liquid 模板标签和注释
- 使用 harmony 模式处理现代 JavaScript 语法

## 进一步优化建议

1. **使用 CDN**：考虑将静态资源部署到 CDN 以提高全球访问速度
2. **图片优化**：使用 WebP 格式并根据设备提供不同尺寸的图片
3. **关键 CSS 内联**：将首屏渲染所需的关键 CSS 内联到 HTML 中
4. **延迟加载非关键 JavaScript**：使用 `defer` 或 `async` 属性
5. **使用 HTTP/2**：如果服务器支持，启用 HTTP/2 协议
6. **预连接到第三方域**：使用 `<link rel="preconnect">` 提前建立连接

## 性能监控

建议使用以下工具监控网站性能：

- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- Chrome DevTools Performance 面板

定期检查性能指标，特别是以下关键指标：

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)