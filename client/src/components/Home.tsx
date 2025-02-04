import icon from '../../public/icon.png'
export default function Home({ navigate }: { navigate: (route: string) => void }) {

    return <div className="bg-[#FFFBE6] w-[500px] h-[600px] flex flex-col items-center justify-center p-10 gap-4">

        <img src={icon} alt='' className='w-[10rem]' />
        <h1 className='font-semibold text-gray-700 text-4xl' >The Cat <span className='font-bold italic text-yellow-700'>Cute</span> Pics!! </h1>
        <p className='text-center text-lg text-gray-600'>Discover the joy of everyday moments with our simple, practical solutions for a better life.</p>
        <button onClick={() => navigate('catGallery')} className='cursor-pointer font-semibold mt-5 text-lg bg-orange-600 rounded-full text-white px-10 py-3'>
            Miaw Now
        </button>
    </div>
}