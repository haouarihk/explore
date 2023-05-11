import prisma from '@/prisma';
import Tweet from './components/tweet'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SignInAlert from './components/signinAlert';
import CreateTweet from './components/tweet/create';
import Search from './components/search';



export default async function Home(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = props.searchParams;
  const search: string = decodeURIComponent((query?.search as string) || "");


  const s = await getServerSession(authOptions);
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
    <main className="min-h-screen flex-col items-center justify-between md:px-24 pt-32">
      {!authenticated && <SignInAlert />}
      <div className='flex justify-between items-center p-4 fixed  px-8 left-0 top-0 w-screen'>
        <h1 className='font-bold text-3xl select-none'>Explorer</h1>

        <Search defaultValue={search} />
      </div>
      {/* @ts-ignore */}
      {authenticated && <CreateTweet />}
      <div className='flex flex-col'>

        {!!search.length && <div className='p-4 text-2xl text-white/40 select-none'>
          Searching for <span className='font-bold select-text text-white'>{search}</span>
        </div>}
        {
          !!search.length && !tweets.length && <div className='p-4 text-2xl text-white/20 select-none'>
            Couldn{"'"}t find Your Tweet
          </div>
        }


        {
          // @ts-ignore
          tweets.map(t => <Tweet key={t.id} {...t} />)
        }
      </div>
    </main>
  )
}


export const dynamic = "force-dynamic";