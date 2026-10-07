// Nạp nội dung lúc build: Markdown của từng tuần và code C++ trong thư mục code/ ở gốc repo
const markdown = import.meta.glob<string>('./weeks/*.md', { query: '?raw', import: 'default', eager: true })
const code = import.meta.glob<string>('/code/**/*.cpp', { query: '?raw', import: 'default', eager: true })

export const getWeekMarkdown = (slug: string) => markdown[`./weeks/${slug}.md`]

export const getCode = (path: string) => code[`/code/${path}`]
