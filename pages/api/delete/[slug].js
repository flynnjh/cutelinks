import { prisma } from "../../../utils/prisma";
import bcrypt from "bcrypt";

export default async (req, res) => {

  // gets the slug's hashedPin
  const searchSlug = await prisma.shortLink.findUnique({ 
    where: {
        slug: req.query.slug
    }
  })

  if (!searchSlug) {
    return res.status(400).json({ message: `a slug called ${req.query.slug} does not exist :(` });
  }

  if (!req.body.pin) {
    return res.status(400).json({ message: `you must provide the currect pin to delete your slug >:()` });
  }

  const validPin = bcrypt.compare(req.body.pin, searchSlug.hashedPin, async (err, data) => {
    if (err) {
      return err
    }
  
    if (data) {
      const deletedSlug = await prisma.shortLink.delete({
        where: {
            slug: req.query.slug
        }
      })
    
      return res.status(200).json({
        message: `${deletedSlug.slug} has been deleted. farewell little guy.`,
      });
    } else {
      return res.status(401).json({ message: "incorrect pin >:(" })
    }
  });

};
