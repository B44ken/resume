type EntryProps = { company: string, dates?: string, title?: string, link?: string }
type SectionProps = { title: string }
type BulletsProps = { items: string[] }
type SkillCategoryProps = { title: string, skills: string }
type ContactItem = { href: string, label: string }
type HeaderProps = { name: string, info: ContactItem[] }

export const Section: React.FC<SectionProps> = ({ title }) =>
  <div className="mt-2">
    <h2 className="text-lg font-bold uppercase">{title}</h2>
    <hr className="border-t border-black mt-0.5 mb-0.5" />
  </div>

export const Entry: React.FC<EntryProps> = ({ company, dates, title, link }) => {
  const companyEl = link ? <a href={link} target="_blank" className="underline">{company}</a> : <span>{company}</span>

  return <div className="m-0 mt-1 flex justify-between text-[0.9375rem]">
    <div> {title ? <><span className="font-bold">{title}</span>, {companyEl}</> : <span className="font-bold">{companyEl}</span>} </div>
    <div className="text-right whitespace-nowrap ml-2"> {dates} </div>
  </div>
}

export const Bullets: React.FC<BulletsProps> = ({ items }) =>
  <ul className="list-disc ml-3 mb-0 text-[0.9375rem]"> {items.map((item, i) => <li key={i} className="mb-0">{item}</li>)} </ul>

export const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) =>
  <div className="mb-0.5 text-[0.9375rem]"> <span className="font-bold">{title}:</span> {skills} </div>

export const Header: React.FC<HeaderProps> = ({ name, info }) =>
  <header className="flex flex-row md:items-center mb-0 flex-wrap justify-between">
    <h1 className="text-3xl font-bold">{name}</h1>
    <div className="text-[0.9375rem] mt-1 md:mt-0 gap-2">
      <div className="flex flex-row gap-2"> {info.map((item, i) => <a key={i} href={item.href} className="underline">{item.label}</a>)} </div>
    </div>
  </header>