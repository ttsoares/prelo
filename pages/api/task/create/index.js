import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content, ownerId, firmId } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const newTask = await prisma.task.create({
        data: {
          content,
          ownerId,
          firmId,
        },
      });
      res.status(200).json({ task: newTask, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, task: null });
    }
  }
}
