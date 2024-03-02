import '../src/all'
import { Bullets } from '../src/components'

export default <Page font="EB Garamond">
    <Title>Bradley Boratto</Title>
    <Subtitle>
        Windsor, Canada <br />
        <Social href='https://boratto.ca' />
        <Social href="https://github.com/b44ken" />
    </Subtitle>
    
    <Section label="Education" />

    <Section label="Experience" />
    <Details company="Optimotive Technologies" position="Robotics Intern" date="January 2023 - May 2023" />
    <Bullets>
        Primary engineer of an industrial cleaning robot prototype, involved in all aspects of development including conceptualization, programming, fabrication, and electronics <br />
        Prototyped and programmed electronic components (e.x. servos, relays) in Python, on Linux <br />
        Reverse engineered and interfaced third-party systems (e.x. motor controllers over CAN bus)
    </Bullets>

    <Section label="Extracurricular" />

    <Section label="Projects">
    <Details title="BlazeGuard React, Node.js">
        <p>Wildfire detection and reporting app concept developed for NASA Space Apps hackathon.</p>
        <ul>
        <li>React frontend and Node.js backend running deep learning fire detection service.</li>
        <li>First place winner at local event (global judging results pending).</li>
        </ul>
    </Details>
    <Details title="boratto.ca/winzard | React, MongoDB, Go, Python" />
    <Bullets>
        Tool to generate optimized university timetables. <br />
        Course availability data pulled from University website using Python scraper, uploaded to MongoDB database, then served to React frontend through Go backend server.
    </Bullets>
    <Details title="boratto.ca | NGINX, Linux, Various Technologies">
        <p>Hosts many services such as VPN and website, primarily running on Linux and routed through NGINX.</p>
    </Details>
    </Section>

    <Section label="Technical Skills">
    <p><b>Languages:</b> C, C++, C#, Go, Python, HTML, CSS, JavaScript, Bash</p>
    <p><b>Developer Tools:</b> React, Bulma, Firebase, Unity, MongoDB</p>
    <p><b>Other:</b> Fusion 360, 3D Printing, Linux, Arduino, ESP32</p>
    </Section>
</Page>