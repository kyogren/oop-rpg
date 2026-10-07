import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'

const components: Components = {
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-lg font-bold first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="my-3 leading-7">{children}</p>,
  ul: ({ children }) => <ul className="my-3 list-disc space-y-1.5 pl-6 marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 list-decimal space-y-1.5 pl-6 marker:text-primary">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} className="font-medium text-primary underline underline-offset-4">
      {children}
    </a>
  ),
  // Khối code đã được CodeBlock bọc riêng nên bỏ thẻ <pre> mặc định
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) =>
    /language-/.test(className ?? '') ? (
      <CodeBlock code={String(children)} className="my-4" />
    ) : (
      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-accent-foreground">
        {children}
      </code>
    ),
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="text-[15px] text-foreground/90">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  )
}
