import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password, role } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          password,
          role,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
