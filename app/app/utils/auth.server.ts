//.server non espone il codice al client, rimane nel backend
import { json, createCookieSessionStorage, redirect  } from "@remix-run/node";
import { prisma } from "./prisma.server";
import type { RegisterForm, LoginForm } from "./types.server";  //type perché ci servono solo i tipi, quindi importiamo solo quelli
import { createUser } from "./users.server";
import bcrypt from "bcryptjs";

const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error("SESSION_SECRET not set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secure: process.env.NODE_ENV == "production",  //se NODE_ENV in .env è in producion risulterà vero, e i cookies saranno secured
        secrets: [secret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true
    }
})

export const register = async (form: RegisterForm) => {
    const exists = await prisma.user.count({ where: { email: form.email } });

    if (exists) {
        return json(
            {error: 'user already exists!'},
            {status: 400} //400--> segnala che qualcosa è andato storto durante la richiesta del vostro client
        );
    }

    const newUser = await createUser(form);

    if (!newUser) {
        return json({
            error: "Something went wrong while creating the user",
            fields: {email: form.email, password: form.password}
        },
        {
            status: 400
        });
    };

    return createUserSession(newUser.id, '/');
};

export const login = async (form: LoginForm) => {
    const user = await prisma.user.findUnique({
        where: {email: form.email}
    });

    if(!user || !(await bcrypt.compare(form.password, user.password))) {
        return json({error: "incorrect login"}, {status: 400});
    };

    return createUserSession(user.id, '/');
};

export const createUserSession = async(
    userId: string,
    redirectTo: string
) => {
    const session = await storage.getSession();
    session.set("userId", userId)

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        }
    })
}
