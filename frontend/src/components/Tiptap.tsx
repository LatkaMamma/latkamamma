import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { JSONContent, Extensions } from '@tiptap/core'
import { generateHTML } from '@tiptap/html'
import { useMemo } from 'react'

export const extensions: Extensions = [
  StarterKit.configure({
    horizontalRule: {
        HTMLAttributes: {
            class: 'divider',
        },
    }
  })
]

export const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <EditorContent editor={editor} />
  )
}

export const TiptapHtml = ({ content }: { content: JSONContent }) => {
    const html = useMemo(() => {
        return generateHTML(content, extensions)
    }, [content])
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Tiptap