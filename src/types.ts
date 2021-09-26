export type MojangUserProfile = {
    name: string
    id: string
}

export type MojangUsernameHistory = {
    name: string
    changedToAt?: number
}

export type MojangUser = {
    profile: MojangUserProfile
    usernameHistories: MojangUsernameHistory[]
}