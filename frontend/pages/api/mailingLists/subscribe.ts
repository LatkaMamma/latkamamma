// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmail, Subscription } from '@mail';
import { prisma } from '@config/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

type Request = {
    email: string;
    fname: string;
    lname?: string;
    privacyConsent: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, fname, lname, privacyConsent } = req.body as Request;
    if (!privacyConsent) { res.status(418).json({ message: 'Privacy consent required' }); return }
    await prisma.$transaction(async (tx) => {
        const created = await tx.guestSubscriber.create({
            data: {
                email,
                fname,
                lname,
                mailingList: {
                    connect: {
                        id: 'cle8mllk10000syusut46bbxn'
                    }
                }
            }, select: {
                id: true
            }
        }).catch((err) => {
            console.log('Error creating guest subscriber', err);
        });
        if (created) {
            const sent = await sendEmail(email, new Subscription({
                name: fname,
                url: `http://localhost:3000/subscriptions/confirm/${created.id}`
            }));
            if (sent) {
                res.status(200).json({ message: 'OK' });
            } else {
                res.status(500).json({ message: 'Error sending email' });
            }
        } else {
            res.status(500).json({ message: 'Error creating guest subscriber' });
        }
    });
}