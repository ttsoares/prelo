import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { taskId } = req.query;

    try {
      const taskDeleted = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      res.status(200).json({ Deleted: taskDeleted, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
