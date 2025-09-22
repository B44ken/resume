import { Section, Entry, Bullets, SkillCategory, Header } from './components';

export const Resume = () => {
  // Determine if anonymized resume should be displayed
  const isAnon = new URLSearchParams(window.location.search).has('anon');

  // Contact info for Header component
  const contactInfo = isAnon
    ? [
        { href: '#', label: 'github/anon' },
        { href: '#', label: 'example.com' },
      ]
    : [
        { href: 'https://github.com/b44ken', label: 'github/b44ken' },
        { href: 'https://boratto.ca', label: 'boratto.ca' },
        { href: 'tel:2269616479', label: '226 961 6479' },
        { href: 'mailto:brad@boratto.ca', label: 'brad@boratto.ca' },
      ];

  const name = isAnon ? 'Anonymous' : 'Bradley Boratto';

  return (
    <div className="mx-autofont-sans text-gray-800">
      <Header name={name} contactInfo={contactInfo} />
      
      <Section title="Education" />
      <Entry 
        company="University of Toronto" 
        dates="Expected Apr 2027" 
	title="Bachelor of Science, Computer Science & Physics double major"
        location="Toronto, Ontario" 
      />
      
      <Section title="Experience" />
      <Entry 
        company="RIIS" 
        dates="May 2025 - Aug 2025" 
        title="Software Engineering Intern" 
        location="Full-Time / Troy, Michigan" 
      />
      <Bullets items={[
	"Built drone remote controller from scratch, designed custom PCB & case as well as code",
	"Developed efficient C++ firmware (ATMega32U4: 2KB RAM, 16MHz CPU) based on asynchronous event loop",
	"Communicated directly with clients to draft requirements, procure components, iterate on design"
      ]} />
      
      <Entry 
        company="Watoga Technologies" 
        dates="Feb 2025 - Mar 2025" 
        title="Riipen Intern" 
        location="Part-Time / Remote" 
      />
      <Bullets items={[
          "Used Python/SQL to process 440MB of poorly formatted rock samples, then multithreaded code for 800% speedup",
          "Built regression models to find mineral rich deposits, using novel 2D & 3D visualizations to prove accuracy"
      ]} />
      
      <Entry 
        company="Optimotive" 
        dates="Jan 2023 - May 2023" 
        title='Robotics Intern' 
        location="Part-Time / Windsor, Ontario" 
      />
      <Bullets items={[
        "Primary engineer of an industrial cleaning robot prototype (programming, fabrication, & electronics)",
        "Programmed subsystems (ex. RealSense depth cameras), interfacing with our robot chassis via its Linux computer",
        "Reverse engineered undocumented motor controller protocols to support game controller input"
      ]} />
      
      {/* Extracurricular Section */}
      <Section title="Extracurricular" />
      <Entry 
        company="UofT Autonomous Scale Racing" 
        dates="Nov 2024 - Present" 
        title="Team Member" 
        location="Toronto, Ontario" 
      />
      <Bullets items={[
        "Firmware development, electronics, etc... in production of an autonomously driving 1/10th scale RC car"
      ]} />
      
      <Entry 
        company="CS Games" 
        dates="Mar 2024" 
        title="Participant/Winner" 
        location="Montréal, Québec" 
      />
      <Bullets items={[
        "Selected by university to participate in 3 days of pair competitive-programming style challenges",
        "Won \"High-Performance Computing\", best performance optimizing an ML framework in C++ & WebGPU"
      ]} />
      
      <Entry 
        company="University of Windsor" 
        dates="Oct 2023 - Dec 2023" 
        title="Software Developer (Research Assistant)" 
        location="Windsor, Ontario" 
      />
      <Bullets items={[
        "Developed HTTP/REST server (C++, for ESP32) to host realtime sensor data dashboard (React)"
      ]} />
      
      {/* <Entry 
        company="Knight Vision Robotics" 
        dates="Jan 2019 - Jun 2023" 
        title="Programming Lead, Engineering Member" 
        location="Windsor, Ontario" 
      />
      <Bullets items={[
        "Created, manufactured CAD models (Fusion 360) alongside engineering team & professional mentors",
        "Developed computer vision program (OpenCV, Java, Python) for autonomous game piece manipulation"
      ]} /> */}
      
      {/* Projects Section */}
      <Section title="Projects"/>
      <Entry company="reactutor (live demo)" link="https://reactutor.boratto.ca" />
      <Bullets items={[
	"AI course tutor. Users upload PDF assignments, AI determines relevant learning goals & practice problems, and can then generate practice exams. AI chat provides feedback on incorrect answers, explains concepts, etc...",
	"Backend: Flask (Python), Frontend: React, Tailwind, Vite (JavaScript), AI: Google Gemini Pro & Flash"
      ]} />
      <Entry company="onef (github)" link="https://github.com/b44ken/onef#onef" />
      <Bullets items={[
        "Toy deep learning / ML framework in plain C++. Supports inference, training (SGD & backprop) for sequential-style networks (units like Linear, ReLU). Solves many classification problems (XOR, MNIST)."
      ]} />
      
      <Entry company="winzard (github)" link="https://github.com/b44ken/winzard" />
      <Bullets items={[
        "Tool to generate optimal (least time between classes) university timetables, actively used by students.",
      ]} />
      
      {/* Technical Skills Section */}
      <Section title="Technical Skills" />
      <SkillCategory title="Languages" skills="C, C++, C#, Go, Python, HTML, CSS, JavaScript, Java, Bash" />
      <SkillCategory title="Developer Tools" skills="React, Bulma, Tailwind, Firebase, Unity, MongoDB, SQL, Git, Docker" />
      <SkillCategory title="Other" skills="Fusion 360, 3D Printing, Linux, Embedded Systems, Arduino, ESP32" />
    </div>
  );
};
