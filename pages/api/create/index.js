import { prisma } from "../../../utils/prisma";
import moment from "moment";

export default async (req, res) => {
  const createShortLink = async (url, slug) => {
    const data = await prisma.shortLink.create({
      data: {
        url: url,
        slug: slug,
        ttl: ttl,
      },
    });

    return res.status(200).json({
      url: `${data.url}`,
      slug: `${data.slug}`,
    });
  };

  if (!req.body.url) {
    return res.status(400).json({ message: "url is a required field :(" });
  }

  // TODO: replace duplicate with try catch
  const duplicate = await prisma.shortLink.count({
    where: {
      slug: req.body.slug,
    },
  });

  const ttl = moment().add(5, "hours").toISOString();

  if (!req.body.slug) {
    const characters = "abcdefghiklmnopqrstuvwxyz24689";
    let id = "";

    while (id.length < 3) {
      id += characters[Math.floor(Math.random() * characters.length)];
    }

    createShortLink(req.body.url, id);
  } else {
    if (duplicate) {
      return res
        .status(400)
        .json({ message: `a slug called ${req.body.slug} already exists :(` });
    }
    createShortLink(req.body.url, req.body.slug);
  }
};
