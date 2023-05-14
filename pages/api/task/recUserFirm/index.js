import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { userId, firmId } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    if (userId && firmId) {
      try {
        const taskList = await prisma.task.findMany({
          where: {
            ownerId: userId,
            firmId: firmId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        res.status(200).json(taskList);
      } catch (error) {
        res.status(500).json({ error: error.message, tasks: null });
      }
    } else {
      res.status(400).json({ tasks: undefined });
    }
  }
}
