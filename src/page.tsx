import { Resume } from './resume'

export const Page = () => {
    return (
        <div className='mx-auto my-4 max-w-[8.5in] h-full print:m-0 leading-4'>
            <div className="h-1/6 print:hidden flex justify-center items-center space-x-4 underline">
                <a href="/resume.pdf" className="text-bold hidden">Download PDF</a>
            </div>
            <div className="shadow-lg py-3 px-7 print:h-full print:shadow-none">
		<Resume />
            </div>
        </div>
    );
}
