import prisma from "..";

/** Function that gets tweets, and only retrive the current user's like (to check if he liked it or not) */
export async function getTweets(search: string, viewerEmail?: string | null, trending?: boolean) {
    const tweets = await prisma.tweet.findMany({
      // if trending
      orderBy: trending?[
        // order by likes first
        {
          Likes:{
            _count: "desc"
          }
        },
        // then order by views second
        {
          Views:"desc"
        }
      ]:[

         // order second by users who are most active first
         {
          User:{
            tweets:{
              _count:"desc"
            }
          }
        },
        
        {
          // order by last tweet first
          createdAt: "desc"
        },
       
      ],
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
                email: viewerEmail
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
    return tweets;
  }
  
  
  /** Function that add a view to tweets, lastviewer shouldn't be able to add another view */
  export async function addViewToTweets(tweets: { id: string }[], lastViewerId?: any) {
    await prisma.tweet.updateMany({
      where: {
        id: {
          in: tweets.map(t => t.id)
        },
        lastViewerId: {
          not: lastViewerId || ""
        }
      },
      data: {
        Views: {
          increment: 1
        }
      }
    })
  }