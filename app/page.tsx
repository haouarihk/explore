import prisma from '@/prisma';
import Tweet from './components/tweet'
import CreateTweet from './components/tweet/create';
import { getServerAuth } from './components/auth';



export default async function Home(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = props.searchParams;
  const search: string = decodeURIComponent((query?.search as string) || "");


  const s = await getServerAuth();
  console.log(s)
  const authenticated = !!s?.user?.email;

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
      storage: {
        select: {
          id: true,
          name: true,
          mimeType: true,
          type: true,
          size: true,
        }
      },
      _count: {
        select: {
          Comments: true,
          Likes: true
        }
      },
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


  return (<>
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
  </>
  )
}


export const dynamic = "force-dynamic";