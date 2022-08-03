import { prisma } from "../../../utils/prisma";

export default async (req, res) => {
  // TODO: Replace Search Slug with try catch delete https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#delete
  const searchSlug = await prisma.shortLink.findUnique({
    where: {
        slug: req.query.slug
    }
  })

  if (!searchSlug) {
    return res.status(400).json({ message: `a slug called ${req.query.slug} does not exist :(` });
  }

  const deletedSlug = await prisma.shortLink.delete({
    where: {
        slug: req.query.slug
    }
  })

  return res.status(200).json({
    message: `${deletedSlug.slug} has been deleted. farewell little guy.`,
  });
};
