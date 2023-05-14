import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allFirms = await prisma.firm.findMany();
      res.status(200).json(allFirms);
    } catch (error) {
      res.status(500).json({ error: error.message, firms: null });
    }
  }
}
