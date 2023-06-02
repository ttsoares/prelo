import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const taskList = await prisma.task.findMany({
        where: {
          ownerId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          firm: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(taskList);
    } catch (error) {
      res.status(500).json({ error: error.message, tasks: null });
    }
  }
}
