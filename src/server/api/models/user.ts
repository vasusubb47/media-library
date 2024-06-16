import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { createHash, randomBytes } from "crypto";
import { user, type userInsert, type userInfo, type insertedUser } from "~/server/db/schema";

export function getAllUsers() {

    const users = db.select({
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
    }).from(user).orderBy(user.createdAt) as unknown as userInfo[];

    return users;
}

export function getUserById(id: string): userInfo {
    const userInfo = db.select({
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
    }).from(user).where(eq(user.id, id)) as unknown as userInfo;

    return userInfo;
}

export async function insertUser(userDetailes: userInsert): Promise<insertedUser> {

    const salt = randomBytes(64).toString();
    const passcode =  userDetailes.passcodeHash;
    const passcodeHash = `${createHash('sha512').update(passcode+salt).digest('hex')}:${salt}`;
    userDetailes.passcodeHash = passcodeHash;

    const newUser: insertedUser = (
        await db.insert(user)
        .values(userDetailes)
        .returning({ id: user.id, email: user.email})
    )[0] as unknown as insertedUser;
    return newUser;
}
