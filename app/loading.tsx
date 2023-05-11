import prisma from '@/prisma';
import Tweet from './components/tweet/skeleton'
import { revalidatePath } from 'next/cache';

export default async function Home() {
    return (
        <main className="min-h-screen flex-col items-center justify-between md:px-24">
            <div className='flex-col flex gap-3 p-4'>
                <textarea name="content" id="content" className='w-full bg-black text-white' cols={30} rows={10}></textarea>

                <div>
                    <button>Tweet</button>
                </div>
            </div>
            <div className='p-4'>
                <h1 className='font-bold text-3xl'>Explorer</h1>
            </div>
            <div className='flex flex-col'>
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </main>
    )
}