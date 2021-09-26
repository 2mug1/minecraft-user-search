import { MojangUser, MojangUsernameHistory } from "../types"
import { format, formatDistance } from 'date-fns'
import { ja } from 'date-fns/locale'

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

export const User: React.FC<{ user: MojangUser }> = ({ user }) => {
    return (
        <div className="mb-3 flex flex-row">
            <div>
                <div className="mb-5">
                    <div>ユーザーネーム: {user.profile.name}</div>
                    <div>UUID: {user.profile.id}</div>
                </div>

                <UsernameHistory histories={user.usernameHistories} />
            </div>

            <div className="ml-5">
                <img src={`https://crafatar.com/renders/body/${user.profile.id}`} alt="" />
            </div>
        </div>
    )
}