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

  const currentTime = new Date().toISOString();

  if (data.ttl < currentTime) {
    const deletedSlug = await prisma.shortLink.delete({
      where: {
          slug: req.query.slug
      }
    })
    return res.status(400).json({"message": `${deletedSlug.slug} has been deleted :(`});
  } else {
    return res.status(200).json({"createdAt": data.createdAt, "ttl": data.ttl, "url": data.url, "slug": data.slug});
  }

};
