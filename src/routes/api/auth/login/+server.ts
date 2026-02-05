// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { generateToken } from "$lib/server/auth/auth.utils";
import { getUserByEmail } from "$lib/server/db/queries";
import { verifyPassword } from "$lib/server/auth/auth.service";

export const POST = async ({ request, cookies }) => {
    const { email, password } = await request.json();
    const user = await getUserByEmail(email);

    if (!user) {
        return json({ error: "User not found" }, { status: 404 });
    }

    if (!user.password_hash) {
        return json({ error: "Invalid credentials" }, { status: 401 });
    }

    const validPassword = verifyPassword(password, user.password_hash);

    if (!validPassword) {
        return json({ error: "Invalid credentials" }, { status: 401 });
    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    
    const token = generateToken(payload);

    cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        secure: !dev,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    });

    const { password_hash, ...userWithoutPassword } = user;

    return json({ 
        success: true, 
        user: userWithoutPassword 
    });
}