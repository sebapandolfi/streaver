import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;

  try {
    const pageSize = 10; // Adjust the page size as needed
    const skip = page ? (parseInt(page as string) - 1) * pageSize : 0;

    const posts = await prisma.post.findMany({
      take: pageSize,
      skip,
      orderBy: {
        title: 'desc',
      },
    });

    const total = await prisma.post.count();

    res.status(200).json({ posts, total });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}