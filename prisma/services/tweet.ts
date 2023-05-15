import prisma from "..";

/** Function that gets tweets, and only retrive the current user's like (to check if he liked it or not) */
export async function getTweets(search: string, viewerEmail?: string | null) {
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