import { prisma } from '@config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            const profile = await prisma.profile.create({
                data: {...req.body}
            })
            res.status(200).json(profile)
            break
        case 'PUT':
            const updatedProfile = await prisma.profile.update({
                where: {id: req.query.id as string},
                data: {...req.body}
            })
            res.status(200).json(updatedProfile)
            break
        case 'DELETE':
            const deletedProfile = await prisma.profile.delete({
                where: {id: req.query.id as string},
            })
            res.status(200).json(deletedProfile)
            break
        default:
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}