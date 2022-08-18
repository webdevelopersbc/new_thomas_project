import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { startDate, title },
  } = req;

  const pagePath = `/event/${startDate}/${title}`;

  try {
    await res.revalidate(pagePath);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send(`Error revalidating path: ${pagePath}`);
  }
}
