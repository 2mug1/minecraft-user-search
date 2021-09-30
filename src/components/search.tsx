import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { FaSearch } from 'react-icons/fa'

export const Search: React.FC<{}> = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")

     //リロードしても消えないように
     useEffect(() => {
        if (router.query.username) {
            if (typeof router.query.username === "string") {
                setUsername(router.query.username)
            }
        }
    }, [])

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(username) {
            router.push(`/${username}`)
        }
    }
    return (
        <>
            <form className="flex inline" method="PUT" onSubmit={(e) => { submit(e) }}>
                <input
                    className="form-input mt-1 block w-full border-solid border-2 rounded-md"
                    value={username}
                    required={true}
                    maxLength={16}
                    placeholder="ユーザー名"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button type="submit" className="ml-2 transition duration-500 ease-in-out whitespace-nowrap block items-center justify-center border border-transparent 
                px-3 py-3 my-1 rounded-full shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-blue-500"><FaSearch/></button>
            </form>
        </>
    )
}