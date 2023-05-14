import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
