import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const taskList = await prisma.task.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          owner: {
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
