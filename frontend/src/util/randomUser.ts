import { Profile } from "@prisma/client";

export type RandomUser = Pick<Profile, "fname" | "lname">;

export const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api/?inc=name&noinfo');
    const { results } = await res.json();
    return {
        fname: results[0].name.first,
        lname: results[0].name.last
    } as RandomUser;
}