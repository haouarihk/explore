import prisma from '@/prisma';
import Tweet from './components/tweet'
import CreateTweet from './components/tweet/create';
import NavControls from './components/nav/controls';
import { getServerAuth } from './components/auth';



export default async function Home(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = props.searchParams;
  const search: string = decodeURIComponent((query?.search as string) || "");


  const s = await getServerAuth();

  const authenticated = !!s?.user;

  let tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
          id: true
        }
      },
      Likes: {
        where: {
          OR: [
            {
              email: s?.user?.email
            }
          ]
        },
        select: {
          email: true
        }
      },
      _count: {
        select: {
          Comments: true,
          Likes: true
        }
      }
    },


    where: {
      OR: [
        {
          content: {
            contains: search
          }
        },
        {
          User: {
            name: {
              contains: search
            }
          }
        }
      ]
    }
  })


  return (
    <main className="h-full flex flex-col items-center justify-between md:px-24 pt-32 w-full">
      <div className='max-w-5xl w-full h-full'>
        <div className='flex justify-between items-center p-4 fixed px-8 left-0 top-0 w-full backdrop-blur-md z-50'>
          <h1 className='font-bold text-3xl select-none'>Explore</h1>
          <NavControls defaultSearchValue={search} user={s?.user as any} />
        </div>
        {/* @ts-ignore */}
        {authenticated && <CreateTweet />}
        <div className='flex flex-col'>

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
      </div>
    </main>
  )
}


export const dynamic = "force-dynamic";