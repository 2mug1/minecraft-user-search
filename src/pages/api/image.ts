import { NextApiRequest, NextApiResponse } from "next";
import chromium from "chrome-aws-lambda"
import fs from 'fs'
import path from 'path'

const chromiumFontSetup = () => {
    if (process.env.HOME == null) process.env.HOME = "/tmp"
    const dest = process.env.HOME + "/.fonts"
    if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    const src = './public/fonts/Noto_Sans_JP'
    for (const font of fs.readdirSync(src)) {
        if (!font.endsWith(".otf")) continue
        if (fs.existsSync(path.join(dest, font))) continue
        fs.copyFileSync(path.join(src, font), path.join(dest, font))
    }
}

const shot = async (username: string) => {
    //chromiumFontSetup()
    const { puppeteer } = chromium
    const agent = await puppeteer.launch({
        args: [...chromium.args, '--window-size=1920,1080'],
        headless: false,
        defaultViewport: null,
        executablePath: await chromium.executablePath,
        env: {
            ...process.env,
            LANG: "ja_JP.UTF-8"
        }
    })
    const page = await agent.newPage()
    try {
        const targetElementSelector = '#user-card'
        await page.goto(`https://biomex.vercel.app/${username}`)
        const clip = await page.evaluate((s: any) => {
            const el = document.querySelector(s)
            const { width, height, top: y, left: x } = el.getBoundingClientRect()
            return { width, height, x, y }
        }, targetElementSelector)
        return await page.screenshot({ clip, type: "png" })
    } finally {
        await page.close()
    }
}

const image = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("X-Robots-Tag", "noindex")
    const { username } = req.query
    if (typeof username != "string") return res.status(500)
    shot(username).then((img) => {
        res.setHeader("Link", `<${username}>; rel="canonical"`);
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Content-DPR", "2.0");
        res.send(img);
    })
}

export default image