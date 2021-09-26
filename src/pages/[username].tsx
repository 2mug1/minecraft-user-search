import Link from 'next/link'

import { User } from '../components/user';
import { fetcher } from '../fetcher';
import { MojangUser, MojangUsernameHistory, MojangUserProfile } from '../types';

type Context = {
    query: { 
        username: string 
    }
}

type ServerSideProps = {
    errorCode?: number
    user?: MojangUser
}

export const getServerSideProps = async (context: Context) => {
    const { username } = context.query
    const user = await new Promise<MojangUser | null>((resolve) => {
        fetcher(`users/profiles/minecraft/${username}?at=${Date.now()}`).then((res) => {
            if (res.status != 200) {
                return resolve(null)
            }
            const profile = res.data as MojangUserProfile
            fetcher(`user/profiles/${profile.id}/names`).then((res) => {
                if (res.status != 200) {
                    return resolve(null)
                }
                resolve({ profile, usernameHistories: (res.data as MojangUsernameHistory[]).reverse() } as MojangUser)
            })
        })
    })
    if (!user) {
        return {
            props: {
                errorCode: 404
            } as ServerSideProps
        }
    }
    return {
        props: {
            user: user
        } as ServerSideProps
    }
}

const PlayerPage: React.FC<ServerSideProps> = ({ user, errorCode }) => {
    if (errorCode) {
        return (
            <div className="mt-5">
                <p>ユーザーが見つかりませんでした</p>
                <div className="mt-10">
                    <Link href="/">
                        インデックスに戻る
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            {user &&
                <div className="mt-5">
                    <User user={user} />
                    <div className="mt-10">
                        <Link href="/">
                            インデックスに戻る
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerPage


