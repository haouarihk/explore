import Tweet from './components/tweet/skeleton'
import NavControls from './components/nav/controls';

export default async function Home() {
    return (
        <main className="h-full flex flex-col items-center justify-between md:px-24 pt-32 w-full">
            <div className='max-w-5xl w-full h-full'>
                <div className='flex justify-between items-center p-4 fixed px-8 left-0 top-0 w-full backdrop-blur-md z-50'>
                    <h1 className='font-bold text-3xl select-none'>Explore</h1>
                    <NavControls defaultSearchValue={""} user={{} as any} />
                </div>
                <div className='flex flex-col'>
                    <Tweet />
                    <Tweet />
                    <Tweet />
                    <Tweet />
                </div>
            </div>
        </main>
    )
}