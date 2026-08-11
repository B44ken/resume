import type { ReactNode } from 'react'
import type { Contact, EntryBlock, SectionBlock, SkillBlock } from './data'
import { safeHref } from './data'
import { Control, Controls, Editable, InlineControls } from './editable'
import { focusField, useEditing } from './editing'

type SectionProps = { block: SectionBlock, onChange: (block: SectionBlock) => void, controls?: ReactNode }
type EntryProps = { block: EntryBlock, onChange: (block: EntryBlock) => void, controls?: ReactNode }
type SkillProps = { block: SkillBlock, onChange: (block: SkillBlock) => void, controls?: ReactNode }
type HeaderProps = {
  name: string,
  info: Contact[],
  onName: (name: string) => void,
  onContact: (contact: Contact) => void,
  onAddContact: () => void,
  onRemoveContact: (id: string) => void,
}

const Link: React.FC<{ href: string, className?: string, children: ReactNode }> = ({ href, className, children }) => {
  const editing = useEditing()
  const url = safeHref(href)

  // while editing the link stays a plain span so clicking it puts the caret in
  // the text instead of navigating away
  if (editing || !url) return <span className={url ? className : undefined}>{children}</span>

  return <a href={url} target="_blank" rel="noreferrer" className={className}>{children}</a>
}

const editLink = (current: string, apply: (href: string) => void) => {
  const next = window.prompt('link url (leave empty for no link)', current)
  if (next !== null) apply(next.trim())
}

export const Section: React.FC<SectionProps> = ({ block, onChange, controls }) =>
  <div className="mt-2 group relative">
    <Controls>{controls}</Controls>
    <h2 className="text-lg font-bold uppercase">
      <Editable value={block.title} placeholder="section" onChange={title => onChange({ ...block, title })} />
    </h2>
    <hr className="border-t border-black mt-0.5 mb-0.5" />
  </div>

export const Entry: React.FC<EntryProps> = ({ block, onChange, controls }) => {
  const editing = useEditing()
  const hasTitle = block.title.length > 0

  const companyEl =
    <Link href={block.link} className="underline">
      <Editable value={block.company} placeholder="company" onChange={company => onChange({ ...block, company })} />
    </Link>

  return <div className="m-0 mt-1 flex justify-between text-[0.9375rem] group relative">
    <Controls>
      <Control label="link" title="edit link" onClick={() => editLink(block.link, link => onChange({ ...block, link }))} />
      {controls}
    </Controls>
    <div>
      {hasTitle || editing
        ? <><span className="font-bold"><Editable value={block.title} placeholder="title" onChange={title => onChange({ ...block, title })} /></span>{hasTitle ? ', ' : ' '}</>
        : null}
      <span className={hasTitle ? undefined : 'font-bold'}>{companyEl}</span>
    </div>
    <div className="text-right whitespace-nowrap ml-2">
      <Editable value={block.dates} placeholder="dates" onChange={dates => onChange({ ...block, dates })} />
    </div>
  </div>
}

export const Bullets: React.FC<EntryProps> = ({ block, onChange }) => {
  const editing = useEditing()
  const setBullets = (bullets: string[]) => onChange({ ...block, bullets })

  const insertAt = (index: number) => {
    setBullets([...block.bullets.slice(0, index), '', ...block.bullets.slice(index)])
    focusField(`${block.id}:${index}`)
  }

  const remove = (index: number) => {
    setBullets(block.bullets.filter((_, i) => i !== index))
    if (index > 0) focusField(`${block.id}:${index - 1}`)
    else if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  if (!editing && block.bullets.length === 0) return null

  return <ul className="list-disc ml-3 mb-0 text-[0.9375rem]">
    {block.bullets.map((item, i) =>
      <li key={i} className="mb-0 group relative">
        <Controls>
          <Control label="✕" title="delete bullet" onClick={() => remove(i)} />
        </Controls>
        <Editable
          value={item}
          field={`${block.id}:${i}`}
          placeholder="bullet point"
          onChange={value => setBullets(block.bullets.map((bullet, index) => index === i ? value : bullet))}
          onEnter={() => insertAt(i + 1)}
          onEmptyBackspace={() => remove(i)}
        />
      </li>)}
    {editing
      ? <li className="list-none -ml-3 print:hidden">
        <InlineControls>
          <Control label="+ bullet" title="add bullet" onClick={() => insertAt(block.bullets.length)} />
        </InlineControls>
      </li>
      : null}
  </ul>
}

export const SkillCategory: React.FC<SkillProps> = ({ block, onChange, controls }) =>
  <div className="mb-0.5 text-[0.9375rem] group relative">
    <Controls>{controls}</Controls>
    <span className="font-bold"><Editable value={block.title} placeholder="category" onChange={title => onChange({ ...block, title })} />:</span>{' '}
    <Editable value={block.skills} placeholder="skills" onChange={skills => onChange({ ...block, skills })} />
  </div>

export const Header: React.FC<HeaderProps> = ({ name, info, onName, onContact, onAddContact, onRemoveContact }) =>
  <header className="flex flex-row md:items-center mb-0 flex-wrap justify-between">
    <h1 className="text-3xl font-bold">
      <Editable value={name} placeholder="your name" onChange={onName} />
    </h1>
    <div className="text-[0.9375rem] mt-1 md:mt-0 gap-2">
      <div className="flex flex-row items-center gap-2">
        {info.map(item =>
          <span key={item.id} className="inline-flex items-center gap-1">
            <Link href={item.href} className="underline">
              <Editable value={item.label} placeholder="contact" onChange={label => onContact({ ...item, label })} />
            </Link>
            <InlineControls>
              <Control label="link" title="edit link" onClick={() => editLink(item.href, href => onContact({ ...item, href }))} />
              <Control label="✕" title="delete contact" onClick={() => onRemoveContact(item.id)} />
            </InlineControls>
          </span>)}
        <InlineControls>
          <Control label="+" title="add contact" onClick={onAddContact} />
        </InlineControls>
      </div>
    </div>
  </header>
