import { prisma } from "../../../utils/prisma";
import moment from "moment";
import bcrypt from "bcrypt";

export default async (req, res) => {
  const generatePin = async () => {
    const numbers = "0123456789";
    let id = "";
  
    while (id.length < 2) {
      id += numbers[Math.floor(Math.random() * numbers.length)];
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(id,salt);
    return [hashedPin, id];
  };

  const createShortLink = async (url, slug) => {
    const pin = await generatePin();
    const data = await prisma.shortLink.create({
      data: {
        url: url,
        slug: slug,
        ttl: ttl,
        hashedPin: pin[0]
      },
    });

    return res.status(200).json({
      url: `${data.url}`,
      slug: `${data.slug}`,
      pinReminder: `${pin[1]}`,
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
    const characters = "abcdefghiklmnopqrstuvwxyz";
    let id = "";

    while (id.length < 2) {
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
