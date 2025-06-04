import Card from './Card'

import { useGemini } from '../context/Bard';


const Output = () => {
    const {thread,loading} = useGemini();



  return (

    <div className='w-3/4 px-28 flex gap-12 mt-12 justify-center items-center h-32'>
        {loading && <p className='text-2xl font-semibold text-gray-500'>Loading...</p>}

        {!loading && thread.length === 0 === 0 && <p className='text-2xl font-semibold text-gray-500'>No threads generated yet.</p>}

        {!loading && Object.values(thread).map((tweet, index) => (
                <Card key={index} content={tweet} />
            ))}

      


    </div>
  )
}

export default Output;