import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const newFirm = await prisma.firm.create({
        data: {
          name,
        },
      });
      res.status(200).json(newFirm);
    } catch (error) {
      res.status(500).json({ error: error.message, firm: null });
    }
  }
}
