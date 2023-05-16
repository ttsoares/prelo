import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name } = req.query;

    console.log(">>>>>>>", name);

    try {
      const getUser = await prisma.user.findUnique({
        where: {
          name: name,
        },
      });
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
