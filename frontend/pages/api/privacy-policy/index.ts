import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST' || 'PUT':
            var { policy } = req.body as { policy: string }
            fs.writeFileSync('./privacy-policy.json', policy, 'utf8')
            res.status(200).json({ message: 'Policy saved' })
            break
        case 'GET':
            if (!fs.existsSync('./privacy-policy.json')) {
                res.status(404).json({ message: 'Policy not found' })
                return
            }
            fs.readFile('./privacy-policy.json', (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: 'Internal server error' })
                    return
                }
                res.status(200).json({
                    policy: data.toString(
                        'utf8'
                    )
                })
            })
            break
        default:
            res.status(405).json({ message: 'Method not allowed' })
            break
    }
}