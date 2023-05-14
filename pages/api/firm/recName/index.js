import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { firmName } = req.query;

    try {
      const gotFirm = await prisma.firm.findUnique({
        where: {
          name: firmName,
        },
      });
      res.status(200).json(gotFirm);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
