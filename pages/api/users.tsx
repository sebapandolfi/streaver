import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                },
            });
            const userIds = users.map((user) => user.id);
            res.status(200).json({ userIds });
        } catch (error) {
            console.error('Error fetching user IDs:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

