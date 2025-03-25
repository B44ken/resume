import { FC } from 'react';

interface SectionProps {
  title: string;
}

interface EntryProps {
  company: string;
  dates?: string;
  title?: string;
  location?: string;
  link?: string;
}

interface BulletsProps {
  items: string[];
}

interface SkillCategoryProps {
  title: string;
  skills: string;
}

interface ContactItem {
  href: string;
  label: string;
}

interface HeaderProps {
  name: string;
  contactInfo: ContactItem[];
}

// Component for section headers
export const Section: FC<SectionProps> = ({ title }) => {
  return (
    <div className="mt-1">
      <h2 className="text-lg font-bold uppercase">{title}</h2>
      <hr className="border-t border-black mt-0.5 mb-0.5" />
    </div>
  );
};

// Component for each experience/education entry
export const Entry: FC<EntryProps> = ({ company, dates, title, location, link }) => {
  return (
    <div className="m-0">
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          {link ? 
          <a href={link} target="_blank" className="underline">
            <h3 className="font-bold text-base">{company}</h3>
          </a> : <h3 className="font-bold text-base">{company}</h3>}
          {title && <div className="italic text-sm">{title}</div>}
        </div>
        <div className="text-right text-sm mt-0.5 sm:mt-0">
          {dates && <div>{dates}</div>}
          {location && <div>{location}</div>}
        </div>
      </div>
    </div>
  );
};

// Component for bullet points
export const Bullets: FC<BulletsProps> = ({ items }) => {
  return (
    <ul className="list-disc ml-3 mb-0 text-sm">
      {items.map((item, index) => (
        <li key={index} className="mb-0">{item}</li>
      ))}
    </ul>
  );
};

// Component for skill categories
export const SkillCategory: FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <div className="mb-0.5 text-sm">
      <span className="font-bold">{title}:</span> {skills}
    </div>
  );
};

export const Header: FC<HeaderProps> = ({ name, contactInfo }) => {
  return (
    <header className="flex flex-row md:items-center mb-0 flex-wrap justify-between">
      <h1 className="text-3xl font-bold">{name.replace(" ", "\u00A0")}</h1>
      <div className="text-sm mt-1 md:mt-0 gap-2">
      <div className="flex flex-row gap-2">
          {contactInfo.map((item, index) => (
            <a key={index} href={item.href} className="underline">{item.label}</a>
          ))} 
      </div>
        <a>{"This resume was built with React/TypeScript"}</a>
      </div>
    </header>
  );
};
