import { Message } from './../../typings.d';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { serverPusher } from '../../pusher';

type Data = {
    message: Message;
}

type ErrorData = {
    body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ body: 'Method not allowed' })
        return;
    }

    const { message } = req.body;
    const newMessage = {
        ...message,
        created_at: Date.now() // replacing the client timestamp with server timestamp
    }

    // push to upstash redis
    await redis.hset('messages', message.id, JSON.stringify(newMessage))

    // server pusher
    serverPusher.trigger('messages', 'new-message', newMessage)

    res.status(200).json({ message: newMessage })
}
