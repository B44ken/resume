import { Section, Entry, Bullets, SkillCategory, Header } from './components'
import { Control, InlineControls } from './editable'
import { useEditing } from './editing'
import { emptyEntry, emptySection, emptySkill, newId } from './data'
import type { Block, Contact, ResumeData } from './data'

type ResumeProps = { data: ResumeData, onChange: (data: ResumeData) => void }

export const Resume: React.FC<ResumeProps> = ({ data, onChange }) => {
  const editing = useEditing()

  const setBlocks = (blocks: Block[]) => onChange({ ...data, blocks })

  const updateBlock = (block: Block) =>
    setBlocks(data.blocks.map(current => current.id === block.id ? block : current))

  const removeBlock = (id: string) =>
    setBlocks(data.blocks.filter(block => block.id !== id))

  const moveBlock = (id: string, offset: number) => {
    const index = data.blocks.findIndex(block => block.id === id)
    const target = index + offset
    if (index < 0 || target < 0 || target >= data.blocks.length) return

    const blocks = [...data.blocks]
    const [moved] = blocks.splice(index, 1)
    blocks.splice(target, 0, moved)
    setBlocks(blocks)
  }

  const addBlock = (block: Block) => setBlocks([...data.blocks, block])

  const setContact = (contact: Contact) =>
    onChange({ ...data, info: data.info.map(current => current.id === contact.id ? contact : current) })

  const blockControls = (block: Block) => <>
    <Control label="↑" title="move up" onClick={() => moveBlock(block.id, -1)} />
    <Control label="↓" title="move down" onClick={() => moveBlock(block.id, 1)} />
    <Control label="✕" title="delete" onClick={() => removeBlock(block.id)} />
  </>

  return (
    <div className="mx-auto font-sans text-gray-800">
      <Header
        name={data.name}
        info={data.info}
        onName={name => onChange({ ...data, name })}
        onContact={setContact}
        onAddContact={() => onChange({ ...data, info: [...data.info, { id: newId(), label: 'new link', href: '' }] })}
        onRemoveContact={id => onChange({ ...data, info: data.info.filter(contact => contact.id !== id) })}
      />

      {data.blocks.map(block => {
        if (block.kind === 'section')
          return <Section key={block.id} block={block} onChange={updateBlock} controls={blockControls(block)} />

        if (block.kind === 'skill')
          return <SkillCategory key={block.id} block={block} onChange={updateBlock} controls={blockControls(block)} />

        return <div key={block.id}>
          <Entry block={block} onChange={updateBlock} controls={blockControls(block)} />
          <Bullets block={block} onChange={updateBlock} />
        </div>
      })}

      {editing
        ? <div className="mt-3 print:hidden">
          <InlineControls>
            <Control label="+ section" title="add section" onClick={() => addBlock(emptySection())} />
            <Control label="+ entry" title="add entry" onClick={() => addBlock(emptyEntry())} />
            <Control label="+ skills" title="add skill category" onClick={() => addBlock(emptySkill())} />
          </InlineControls>
        </div>
        : null}
    </div>
  )
}
