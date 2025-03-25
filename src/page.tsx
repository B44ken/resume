import { useState } from 'react';
import { Resume } from './resume'
import { ResumeAnon } from './resume-anon';

export const Page = () => {
    const [anon, setAnon] = useState(false);

    return (
        <div className='mx-auto my-4 max-w-[8.5in] h-full print:m-0 leading-4'>
            <div className="h-1/6 print:hidden flex justify-center items-center space-x-4 underline">
                <a  href="/resume/Resume.pdf" className="text-bold hidden">Download PDF</a>
                <a className="hidden" onClick={() => setAnon(!anon)}>Anon: {anon ? "True" : "False"}</a>
            </div>
            <div className="shadow-md rounded-md py-2 px-4 h-5/6 print:h-full overflow-y-auto print:shadow-none leading-3">
                {anon ? <ResumeAnon /> : <Resume /> }
            </div>
            
        </div>
    );
}
