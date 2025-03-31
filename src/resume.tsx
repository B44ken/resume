import { Section, Entry, Bullets, SkillCategory, Header } from './components';

export const Resume = () => {
  // Contact info for Header component
  const contactInfo = [
    { href: "https://github.com/b44ken", label: "github/b44ken" },
    { href: "https://boratto.ca", label: "boratto.ca" },
    { href: "tel:2269616479", label: "226 961 6479" },
    { href: "mailto:brad@boratto.ca", label: "brad@boratto.ca" },
  ];

  return (
    <div className="mx-autofont-sans text-gray-800">
      {/* Header */}
      <Header name="Bradley Boratto" contactInfo={contactInfo} />
      
      {/* Education Section */}
      <Section title="Education" />
      <Entry 
        company="University of Toronto" 
        dates="Sep 2024 - Apr 2027" 
        title="BSc (Intended: Double Major, Computer Science/Physics)" 
        location="Toronto, Ontario" 
      />
      <Bullets items={[
        "Courses include Multivariable Calculus, Linear Algebra, Software Engineering, Systems Programming, Physics..."
      ]} />
      
      {/* Experience Section */}
      <Section title="Experience" />
      <Entry 
        company="RIIS" 
        dates="May 2025 - Aug 2025" 
        title="Software Engineering Intern" 
        location="Full-Time / Troy, Michigan" 
      />
      <Bullets items={[
        "Incoming SWE intern (Drones, Robotics)",
      ]} />
      
      <Entry 
        company="Watoga Technologies" 
        dates="Feb 2025 - Mar 2025" 
        title="Riipen Intern" 
        location="Part-Time / Remote" 
      />
      <Bullets items={[
          "Used Python/SQL to process 440MB of badly formatted rock samples, then multithreaded code for 800% speedup",
          "Built regression models to find mineral rich deposits, using novel 2D and 3D visualizations to prove accuracy"
      ]} />
      
      <Entry 
        company="Optimotive" 
        dates="Jan 2023 - May 2023" 
        title='Robotics Intern' 
        location="Part-Time / Windsor, Ontario" 
      />
      <Bullets items={[
        "Primary engineer of an industrial cleaning robot prototype (programming, fabrication, and electronics)",
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
        "Won \"High-Performance Computing\", best performance optimizing an ML framework in C++ and WebGPU"
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
        "Created, manufactured CAD models (Fusion 360) alongside engineering team and professional mentors",
        "Developed computer vision program (OpenCV, Java, Python) for autonomous game piece manipulation"
      ]} /> */}
      
      {/* Projects Section */}
      <Section title="Projects"/>
      <Entry company="onef" link="https://boratto.ca/blog/onef" />
      <Bullets items={[
        "Toy deep learning / ML framework in plain C++. Supports inference, training (SGD and backprop) for sequential-style networks (units like Linear, ReLU). Solves many classification problems (XOR, MNIST)."
      ]} />
      
      <Entry company="winzard" link="https://boratto.ca/winzard" />
      <Bullets items={[
        "Tool to generate optimal (least time between classes) university timetables, actively used by students.",
        "Led development (team of 3) when the project was officially adopted by UWindsor CS Society."
      ]} />
      
      <Entry company="boratto.ca" link="https://boratto.ca" />
      <Bullets items={[
        "Many different services (VPN, website, Minecraft...) on many different platforms (Linux VM, Cloudflare...)."
      ]} />
      
      {/* Technical Skills Section */}
      <Section title="Technical Skills" />
      <SkillCategory title="Languages" skills="C, C++, C#, Go, Python, HTML, CSS, JavaScript, Java, Bash" />
      <SkillCategory title="Developer Tools" skills="React, Bulma, Tailwind, Firebase, Unity, MongoDB, SQL, Git, Docker" />
      <SkillCategory title="Other" skills="Fusion 360, 3D Printing, Linux, Embedded Systems, Arduino, ESP32" />
    </div>
  );
};
