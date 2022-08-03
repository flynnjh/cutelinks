import { prisma } from "../../../utils/prisma";
import moment from "moment";

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

  const ttl = moment().add(5, "hours").toISOString(); 

  const data = await prisma.shortLink.create({
    data: {
      url: req.body.url,
      slug: req.query.slug,
      ttl: ttl,
    },
  });

  return res.status(200).json({
    url: `${data.url}`,
    slug: `${data.slug}`
  });
};
