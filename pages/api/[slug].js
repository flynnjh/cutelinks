import { prisma } from "../../utils/prisma";

export default async (req, res) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.status(404).json({ message: "pls use with a slug" });
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.status(404).json({ message: "slug not found" });
    return;
  }

  return res.status(200).json({"url": data.url, "slug": data.slug});
};
