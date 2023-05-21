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


  return <div className='flex max-w-4xl flex-col'>

    {!!search.length && <div className='select-none p-4 text-2xl text-white/40'>
      Searching for <span className='select-text font-bold text-white'>{search}</span>
    </div>}

    {
      !!search.length && (!tweets.length ? <div className='w-full select-none p-8 text-center text-2xl text-white/20'>
        Couldn{"'"}t find Any Tweets
      </div>
        :
        <div className='select-none p-4 text-sm text-white/40'>
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