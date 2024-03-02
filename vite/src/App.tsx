import resume from '../resume/Resume'

export default function App() {
  return <>
    <div className='flex w-screen h-screen justify-center text-black text-sm'>
      <div className='h-[900px]'>
        { resume }
      </div>
    </div>
  </>
}