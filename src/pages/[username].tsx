import Link from 'next/link'
import Head from 'next/head'

import { User, UserCard, UserImageLinks } from '../components/user';
import { fetcher } from '../fetcher';
import { MojangUser, MojangUsernameHistory, MojangUserProfile } from '../types';
import { GetServerSideProps } from 'next';

type ServerSideProps = {
    error?: {
        code: number
        message: string
    },
    user?: MojangUser
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    ctx.res.setHeader("Cache-Control", "max-age=300, public, stale-while-revalidate")

    const { username } = ctx.query

    if(!username || username == null || typeof username != "string") return { 
        props: {
            error: {
                code: 500,
                message: "ユーザーネームを入力してください"
            }
        } 
    }

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
                error: {
                    code: 404,
                    message: "ユーザーが見つかりませんでした"
                }
            }
        }
    }
    return {
        props: {
            user: user
        }
    }
}

const UserPage: React.FC<ServerSideProps> = ({ user, error }) => {
    if (error) {
        return (
            <div className="mt-5">
                <p>{error.code}: {error.message}</p>
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
                <>
                    <Head>
                        <title>minecraft-user-search - {user.profile.name}</title>
                    </Head>
                    <div className="mt-5">
                        <UserCard user={user} />
                    </div>
                    <div className="mt-5">
                        <UserImageLinks user={user} />
                    </div>
                    <div className="mt-5">
                        <User user={user} />
                    </div>
                    <div className="mt-10">
                        <Link href="/">
                            インデックスに戻る
                        </Link>
                    </div>
                </>
            }
        </>
    )
}

export default UserPage
