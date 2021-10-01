import { MojangUser, MojangUsernameHistory } from "../types"
import { format } from 'date-fns'
import { addDashesToUUID } from "../uuid"

const UsernameHistory: React.FC<{ histories: MojangUsernameHistory[] }> = ({ histories }) => {
    return (
        <>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">名前</th>
                        <th className="border px-2 py-2">変更日</th>
                    </tr>
                </thead>
                <tbody>
                    {histories &&
                        histories.map((history) => {
                            return (
                                <tr>
                                    <td className="border px-2 py-2">{history.name}</td>
                                    <td className="border px-2 py-2">{history.changedToAt && format(new Date(history.changedToAt), 'yyyy-MM-dd')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export const UserCard: React.FC<{ user: MojangUser }> = ({ user }) => {
    return (
        <div className="border">

            <div className="flex justify-between flex-row p-3" id="user-card">
                <div className="flex justify-between flex-col ml-1 text-sm">
                    <div>
                        <div className="text-lg">{user.profile.name}</div>
                        <div className="text-sm">{addDashesToUUID(user.profile.id)}</div>
                        <div className="text-sm">{user.profile.id}</div>
                    </div>
                    <div className="text-gray-500">
                        <p>biomex.vercel.app/{user.profile.name}</p>
                    </div>
                </div>

                <img src={`https://crafatar.com/renders/head/${user.profile.id}`} alt="" />
            </div>
        </div>
    )
}

export const User: React.FC<{ user: MojangUser }> = ({ user }) => {
    return (
        <div className="flex flex-row">
            <div>
                <div className="mb-1">
                    ユーザーネーム 変更履歴
                </div>
                <UsernameHistory histories={user.usernameHistories} />
            </div>

            <div className="ml-5">
                <img src={`https://crafatar.com/renders/body/${user.profile.id}`} alt="" />
            </div>
        </div>
    )
}


export const UserImageLinks: React.FC<{ user: MojangUser }> = ({ user }) => {
    const {name} = user.profile
    return (
        <div className="flex flex-col space-y-1">
            <p>画像リンク</p>
            <textarea
                className="form-input mt-1 block w-full border-solid border-2 rounded-md resize-none"
                value={`https://biomex.vercel.app/image/${name}#.png`}
            />
            <p>Scrapbox</p>
            <textarea
                className="form-input mt-1 block w-full border-solid border-2 rounded-md resize-none"
                value={`[https://biomex.vercel.app/image/${name}#.png https://biomex.vercel.app/${name}]`}
            />
            <p>Markdown</p>
            <textarea
                className="form-input mt-1 block w-full border-solid border-2 rounded-md resize-none"
                value={`[![${name}](https://biomex.vercel.app/image/${name}#.png)](https://biomex.vercel.app/${name})`}
            />
            <p>HTML</p>
            <textarea
                className="form-input mt-1 block w-full border-solid border-2 rounded-md resize-none"
                value={`<a href="https://biomex.vercel.app/${name}"><img src="https://biomex.vercel.app/image/${name}#.png"></a>`}
            />
        </div>

    )
}