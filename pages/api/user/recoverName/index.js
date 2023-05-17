import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name } = req.query;

    try {
      const gotUser = await prisma.user.findUniqueOrThrow({
        where: {
          name: name,
        },
      });
      res.status(200).json(gotUser);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
