import Tweet from '../components/tweet'
import { getServerAuth } from '../components/auth';
import { addViewToTweets, getTweets } from '@/prisma/services/tweet';



export default async function Home(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search: string = decodeURIComponent((props.searchParams?.search as string) || "");
  const s = await getServerAuth();

  const tweets = await getTweets(search, s?.user?.email, true);

  if (tweets.length)
    // add view to viewed tweets
    await addViewToTweets(tweets, s?.user?.id);


  return <div className='flex flex-col max-w-4xl'>

    {!!search.length && <div className='p-4 text-2xl text-white/40 select-none'>
      Searching for <span className='font-bold select-text text-white'>{search}</span>
    </div>}

    {
      !!search.length && (!tweets.length ? <div className='p-8 text-center w-full text-2xl text-white/20 select-none'>
        Couldn{"'"}t find Any Tweets
      </div>
        :
        <div className='p-4 text-sm text-white/40 select-none'>
          Found {tweets.length} Result{tweets.length == 1 ? "" : "s"}
        </div>
      )}


    {
      // @ts-ignore
      tweets.map(t => <Tweet key={t.id} {...t} />)
    }
  </div>
}


export const dynamic = "force-dynamic";