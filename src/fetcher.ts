import axios from "axios";

const client = axios.create({
    baseURL: "https://api.mojang.com/",
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

export const fetcher = (url: string) => client.get(url).then(res => res)
