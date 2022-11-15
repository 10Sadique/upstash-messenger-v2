import Pusher from 'pusher';
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_APPID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true,
})

export const clientPusher = new ClientPusher('7a20c06103aa515e0dd0', {
    cluster: 'ap2',
    forceTLS: true
})