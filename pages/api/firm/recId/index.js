import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { firmId } = req.query;

    try {
      const gotFirm = await prisma.firm.findUnique({
        where: {
          id: firmId,
        },
      });
      res.status(200).json(gotFirm);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
