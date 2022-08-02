import { prisma } from "../../../utils/prisma";

export default async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "url is a required field :(" });
  }

  const duplicate = await prisma.shortLink.count({
    where: {
        slug: req.query.slug
    }
  })

  if (duplicate) {
    return res.status(400).json({ message: `a slug called ${req.query.slug} already exists :(` });
  }

  const data = await prisma.shortLink.create({
    data: {
      url: req.body.url,
      slug: req.query.slug,
    },
  });

  return res.status(200).json({
    message: `${req.query.slug} with url ${req.body.url} successfully created!`,
  });
};
