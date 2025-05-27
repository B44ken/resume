import { Section, Entry, Bullets, SkillCategory, Header } from './components';

export const Resume = () => {
  // replace with your own info
  const contactInfo = [
    { href: "https://github.com/your-username", label: "github/your-username" },
    { href: "https://yourwebsite.com",   label: "yourwebsite.com" },
    { href: "tel:1234567890",             label: "(123) 456-7890" },
    { href: "mailto:you@domain.com",      label: "you@domain.com" },
  ];

  return (
    <div className="mx-auto font-sans text-gray-800">
      {/* Header */}
      <Header name="Your Name" contactInfo={contactInfo} />

      {/* Education */}
      <Section title="Education" />
      <Entry
        company="University Name"
        dates="Start – End"
        title="Degree & Major"
        location="City, State/Province"
      />
      <Bullets items={[
        "Relevant coursework, honors, GPA, etc."
      ]} />

      {/* Experience */}
      <Section title="Experience" />
      <Entry
        company="Company Name"
        dates="Start – End"
        title="Job Title"
        location="Remote, City"
      />
      <Bullets items={[
        "Key accomplishment or responsibility #1",
        "Key accomplishment or responsibility #2"
      ]} />

      {/* add more <Entry> blocks for each role */}

      {/* Projects */}
      <Section title="Projects" />
      <Entry
        company="Project Name"
        link="Project URL"
      />
      <Bullets items={[
        "Brief description of the project, your role, technologies used, outcomes"
      ]} />

      {/* Skills */}
      <Section title="Technical Skills" />
      <SkillCategory
        title="Languages"
        skills="List of languages separated by commas"
      />
      <SkillCategory
        title="Frameworks & Tools"
        skills="List of frameworks, libraries, tools"
      />
      <SkillCategory
        title="Other"
        skills="Any other relevant skills or platforms"
      />
    </div>
  );
};

