//Revalidate-URL: 'http://localhost:3000/api/revalidate?path=/&secret=NKPlearnsCode'

//handler cannot be testet in dev-mode
//function compares url-token with stored secret token and then revalidates path also provided in URL
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token ' })
    }

    const path = req.query.path as string

    await res.revalidate(path)

    return res.json({ revalidated: true })

}