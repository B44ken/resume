import { Section, Entry, Bullets, SkillCategory, Header } from './components';

export const Resume = () => {
  return (
    <div className="mx-auto font-sans text-gray-800">
      <Header name={'Bradley Boratto'} info={[
        { href: 'https://github.com/b44ken', label: 'github/b44ken' },
        { href: 'https://boratto.ca', label: 'boratto.ca' },
        { href: 'tel:2269616479', label: '226 961 6479' },
        { href: 'mailto:brad@boratto.ca', label: 'brad@boratto.ca' }
      ]} />

      <Section title="Education" />
      <Entry company="University of Toronto" title="Bachelor of Science, Computer Science & Physics Majors" dates="Expected Apr 2027" />

      <Section title="Experience" />
      <Entry company="RIIS" dates="May 2025 - Aug 2025" title="Software Engineering Intern" />
      <Bullets items={[
        "Built drone remote controller completely from scratch with custom PCB and case as well as software",
        "Designed efficient C++ firmware (on 2KB RAM, 16MHz CPU) based on asynchronous event loop",
        "Communicated directly with clients to make design choices and iterate based on feedback"
      ]} />

      <Entry company="Watoga Technologies" dates="Feb 2025 - Mar 2025" title="Riipen Intern" />
      <Bullets items={[
        "Used Python to process 440MB of poorly formatted rock samples, cleanup, and add to SQL database",
        "Multithreaded code to solve file parsing library bottleneck (7.6x speedup)",
        "Built Scipy/Matplotlib models to find mineral rich deposits, using 2D and 3D visualizations to prove accuracy"
      ]} />

      <Entry company="Optimotive" dates="Jan 2023 - May 2023" title='Robotics Intern' />
      <Bullets items={[
        "Primary engineer of an industrial cleaning robot prototype (programming, fabrication, & electronics)",
        "Programmed subsystems (ex. depth cameras), interfacing with our robot chassis via its Linux computer",
        "Reverse engineered undocumented motor controller protocols to support game controller input"
      ]} />

      <Section title="Extracurricular" />
      <Entry company="UofT Autonomous Scale Racing" dates="Nov 2024 - Present" title="Team Member" />
      <Bullets items={[
        "Firmware development, electronics, etc... in production of an autonomously driving 1/10th scale RC car"
      ]} />

      <Entry company="CS Games" dates="Mar 2024" title="Participant/Winner" />
      <Bullets items={[
        "Selected by university to participate in 3 days of pair competitive-programming style challenges",
        "Won \"High-Performance Computing\", best performance optimizing an ML framework in C++ & WebGPU"
      ]} />

      <Section title="Projects" />
      <Entry company="microgpt (live demo)" link="https://microgpt.boratto.ca" />
      <Bullets items={[
        "Interactive GPT-like small LLM in the browser via TensorFlow.js. Learns to generate names from 30k samples. Users can visualize model architecture, weights, and activations as it runs. 70k views on Hacker News."
      ]} />
      <Entry company="finetune (github)" link="https://github.com/b44ken/finetune" />
      <Bullets items={[
        "Finetuned Qwen 14B on personal chat data (250+ samples) using Unsloth, runs locally via Ollama",
        "Built Chrome extension to feed model output as input events to Discord; supports extensible app targets"
      ]} />
      <Entry company="reactutor (live demo)" link="https://reactutor.boratto.ca" />
      <Bullets items={[
        "AI tutor. Users upload course materials so Gemini understands the course, which serves targeted long-form practice problems to help them learn, via spaced repetition. I use this to help me study."
      ]} />
      <Entry company="wasm67 (github)" link="https://github.com/b44ken/wasm67" />
      <Bullets items={[
        "WASM4 virtual console runtime (Rust) for Raspberry Pi Pico. Implements framebuffer, input, and system calls"
      ]} />
      <Entry company="gloom (live demo)" link="https://boratto.ca/doom" />
      <Bullets items={[
        "WinHacks 2025 talk: built a raycasting engine and game from scratch with participants in one hour"
      ]} />
      <Entry company="onef (github)" link="https://github.com/b44ken/onef#onef" />
      <Bullets items={[
        "Deep learning framework in plain C++. Supports inference, training (SGD & backprop) for sequential networks. Solves MNIST, XOR, etc."
      ]} />

      <Section title="Technical Skills" />
      <SkillCategory title="Languages" skills="C, C++, C#, Rust, Go, Python, HTML, CSS, JavaScript, Java, Bash" />
      <SkillCategory title="Developer Tools" skills="React, Tailwind, Firebase, Unity, MongoDB, SQL, Git, Docker" />
      <SkillCategory title="Other" skills="Fusion 360, 3D Printing, Linux, Embedded Systems, Arduino, ESP32" />
    </div>
  );
};
