import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    try {
    if (method == 'GET'){
       
            const { id } = req.query;
            const pageSize = 10; // Adjust the page size as needed
            const skip = id ? (parseInt(id as string) - 1) * pageSize : 0;
            const posts = await prisma.post.findMany({
              take: pageSize,
              skip,
              orderBy: {
                updatedAt: 'desc',
              },
              include: {
                user: true,
              }
            });
        
            const total = await prisma.post.count();
        
            res.status(200).json({ posts, total });
          } 
          else if (method == 'DELETE'){
            const postId = parseInt(req.query.id as string, 10);
            await prisma.post.delete({
                where: {
                  id: postId,
                },
              });
          
              res.status(204).end(); // Successful deletion, no content to return
          }
    }
    catch (error) {
        console.error('Error with posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
  try {
    // Use Prisma to delete the post
  
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}