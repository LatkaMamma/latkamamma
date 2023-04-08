import { prisma } from "@config/prisma";
import { logtoClient } from "@config/logto";
import { Profile as ProfileTabbed } from "@/src/_components/profile";
import { getRandomUser, RandomUser } from "@/src/util/randomUser";
import { PrismaPublicProfile } from "@consts";

export const getServerSideProps = logtoClient.withLogtoSsr(async function ({ req, res }) {
    const { user } = req;
    if (!user.isAuthenticated) {
        res.setHeader('location', '/api/auth/sign-in');
        res.statusCode = 302;
        res.statusMessage = 'User not authenticated';
        res.end();
    }
    const userId = user.claims?.sub;
    if (!userId) {
        res.setHeader('location', '/');
        res.statusCode = 500;
        res.statusMessage = 'Something went wrong fetching user id';
        res.end();
    }
    const profile = await prisma.profile.findUnique({
        where: {
            user_id: userId
        },
        select: {
            id: true,
            user_id: true,
            fname: true,
            lname: true,
            image: true,
            orders: {
                select: {
                    id: true,
                    total: true,
                    items: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            quantity: true,
                            thumbnail: true,
                            vat: true,
                        }
                    }
                }
            }
        }
    });
    const randomUser = !profile ? await getRandomUser() : null;
    return {
        props: { profile, uid: userId, randomUser },
    };
});

interface ProfileProps {
    profile: PrismaPublicProfile | null;
    uid: string;
    randomUser: RandomUser | null;
}

export default function ProfilePage(props: ProfileProps) {
    return <ProfileTabbed {...props} />;
}