import Tweet from '../components/tweet/skeleton'
import CreateTweet from './@create/loading'

export default async function Home(props: any) {
    return (<>
        {/* @ts-ignore */}
        <CreateTweet {...props} />
        <div className='flex flex-col w-full'>
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
        </div>
    </>
    )
}