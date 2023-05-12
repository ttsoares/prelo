import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { content, taskId } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          content,
        },
      });
      res.status(200).json({ task: updatedTask, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, task: null });
    }
  }
}
