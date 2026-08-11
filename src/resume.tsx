import { Section, Entry, Bullets, SkillCategory, Header } from './components'
import { Control, InlineControls } from './editable'
import { useEditing } from './editing'
import { emptyEntry, emptySection, emptySkill, newId } from './data'
import type { Block, Contact, ResumeData, SectionBlock } from './data'

type ResumeProps = { data: ResumeData, onChange: (data: ResumeData) => void }

// a section owns every block after it until the next section; `end` is where a
// new block belongs when it is added from that section
type Group = { section: SectionBlock | null, blocks: Block[], end: number }

const groupBlocks = (blocks: Block[]): Group[] => {
  const groups: Group[] = []

  blocks.forEach((block, index) => {
    if (block.kind === 'section') groups.push({ section: block, blocks: [], end: index + 1 })
    else {
      if (groups.length === 0) groups.push({ section: null, blocks: [], end: index })
      const group = groups[groups.length - 1]
      group.blocks.push(block)
      group.end = index + 1
    }
  })

  return groups.length > 0 ? groups : [{ section: null, blocks: [], end: 0 }]
}

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

  const addBlock = (block: Block, index: number) =>
    setBlocks([...data.blocks.slice(0, index), block, ...data.blocks.slice(index)])

  const setContact = (contact: Contact) =>
    onChange({ ...data, info: data.info.map(current => current.id === contact.id ? contact : current) })

  const blockControls = (block: Block) => <>
    <Control label="↑" title="move up" onClick={() => moveBlock(block.id, -1)} />
    <Control label="↓" title="move down" onClick={() => moveBlock(block.id, 1)} />
    <Control label="✕" title="delete" onClick={() => removeBlock(block.id)} />
  </>

  const renderBlock = (block: Block) => {
    if (block.kind === 'section')
      return <Section key={block.id} block={block} onChange={updateBlock} controls={blockControls(block)} />

    if (block.kind === 'skill')
      return <SkillCategory key={block.id} block={block} onChange={updateBlock} controls={blockControls(block)} />

    return <div key={block.id}>
      <Entry block={block} onChange={updateBlock} controls={blockControls(block)} />
      <Bullets block={block} onChange={updateBlock} />
    </div>
  }

  const groups = groupBlocks(data.blocks)

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

      {groups.map(group =>
        <div key={group.section?.id ?? 'start'}>
          {group.section ? renderBlock(group.section) : null}
          {group.blocks.map(renderBlock)}

          {editing
            ? <div className="mt-1 print:hidden" data-chrome>
              <InlineControls>
                <Control label="+ section" title="add section" onClick={() => addBlock(emptySection(), group.end)} />
                <Control label="+ entry" title="add entry" onClick={() => addBlock(emptyEntry(), group.end)} />
                <Control label="+ skills" title="add skill category" onClick={() => addBlock(emptySkill(), group.end)} />
              </InlineControls>
            </div>
            : null}
        </div>)}
    </div>
  )
}
