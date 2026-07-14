# Zhonghai Lu’s Lab 内容更新指南

网站首页的各个列表都由 Markdown 或 YAML 数据自动生成，不需要直接修改首页 HTML。

| 首页区域 | 英文内容 | 中文内容 |
|---|---|---|
| 图片轮播 | `content/en/events/<slug>/index.md` | `content/zh/events/<slug>/index.md` |
| Research | `content/en/research/<slug>/index.md` | `content/zh/research/<slug>/index.md` |
| Publications | `content/en/publications/<slug>/index.md` | `content/zh/publications/<slug>/index.md` |
| News | `content/en/news/<slug>/index.md` | `content/zh/news/<slug>/index.md` |
| Awards | `content/en/awards/<slug>/index.md` | `content/zh/awards/<slug>/index.md` |
| Join Us | `content/en/opportunities/<slug>/index.md` | `content/zh/opportunities/<slug>/index.md` |
| Team | `data/authors/<slug>.yaml` | `data/zh/authors/<slug>.yaml` |

## 修改轮播按钮

每个轮播事件的 `index.md` 中有三个关键字段：

```yaml
button: Read the story
target: '#news'
featured: true
```

- `button` 是按钮文字。
- `target` 是点击目标；站内栏目使用 `#news`、`#publications` 或 `#join-us`，外部页面可写完整 `https://...` 链接。
- `featured: true` 表示进入轮播；改为 `false` 就退出轮播。
- 中英文事件使用相同的文件夹 slug，分别维护按钮文字。

## 增加或修改 Team 成员

当前首页使用的稳定资料位如下：`member-01` Hongji Pei、`member-02` Jingwei Li、`member-03` Chao Guo、`member-04` Yushang Jin、`member-05` Yizhe Xiong、`member-06` Jinhuang Lin、`member-07` Chen Yang。修改某个人时，保持 slug 不变，编辑对应 YAML 即可。

1. 在 `data/team.yaml` 中增加成员 slug，并设置分组和顺序：

```yaml
- slug: jingwei-li
  group: PhD Students
  weight: 20
```

2. 英文资料写入 `data/authors/<slug>.yaml`。常用字段如下：

```yaml
name:
  display: Jingwei Li
role: PhD Student
bio: Short verified biography.
avatar: /images/team/jingwei-li.jpg
affiliations:
  - name: Thrust of Microelectronics, HKUST(GZ)
interests:
  - Network-on-Chip
links:
  - icon: at-symbol
    url: mailto:name@connect.hkust-gz.edu.cn
    label: Email
  - icon: scholar
    url: https://scholar.google.com/...
    label: Google Scholar
```

3. 中文翻译写入 `data/zh/authors/<slug>.yaml`。不必重复邮箱、Scholar、头像等不随语言变化的字段；系统会自动继承英文数据。
4. 为个人主页建立 `content/en/authors/<slug>/_index.md` 和 `content/zh/authors/<slug>/_index.md`。文件只需包含标题，也可以在 front matter 之后继续写完整个人经历。
5. 头像放在 `static/images/team/`，在 YAML 中写 `/images/team/文件名.jpg`。推荐统一使用竖版照片，并在发布前取得成员授权。

支持的图标名称包括 `at-symbol`、`scholar`、`github`、`linkedin`、`website`。首页姓名、头像和 Profile 图标都会进入成员个人页；其他图标直接进入对应外部链接。

## 增加 Publications

- 复制 `content/en/publications/sample-paper-03/` 和对应中文目录，修改文件夹 slug 与 `index.md` 内容。
- 首页按 `date` 从新到旧自动显示前六篇；展示数量在 `layouts/index.html` 中由 `first 6` 控制。
- `authors` 填写 Team 成员的 slug，即可把论文关联到成员个人页。

## 样式修改位置

- Team 米色背景：`static/css/lab.css` 的 `.section-team`。
- Team 两列布局和卡片：`.member-grid`、`.member-card`、`.member-avatar`。
- 个人主页：`.profile-shell`、`.profile-hero`、`.profile-links-large`。
- Publications 列表：`.publication-list`、`.publication-row`。

## 发布前仍需确认

- 完整、经本人确认的 Team 名单、头像、个人简介和学术链接。
- 正式研究方向、示例论文、新闻、奖项和岗位内容。
- `data/contact.yaml` 与 `data/zh/contact.yaml` 中的联系方式。
- 正式中英文组名、院校归属及 Logo 使用规范。

## 本地预览

在项目根目录运行 `scripts/preview-site.ps1`。英文首页是 `/`，中文首页是 `/zh/`。
