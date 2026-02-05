// src/routes/api/auth/register/+server.ts
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { hashPasword } from '$lib/server/auth/auth.service';
import { generateToken } from '$lib/server/auth/auth.utils';
import { createUser, getUserByEmail } from '$lib/server/db/queries';
import type { UserRole } from '$lib/server/db/schema';

export const POST = async ({ request, cookies }) => {
  const data = await request.json();

  const email = data.email?.toLowerCase().trim();
  const password = data.password;
  const full_name = data.full_name;

  if (!email || !password || !full_name) {
    return json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  const emailExists = await getUserByEmail(email);
  if (emailExists) {
    return json({ error: 'Email already exists' }, { status: 409 });
  }

  const hashedPassword = hashPasword(password);

  const newUser = { 
    email, 
    password_hash: hashedPassword, 
    full_name, 
    role: "CLIENT" as UserRole 
  };

  const createdUser = await createUser(newUser);

  const payload = {
    id: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
  };

  const token = generateToken(payload);

  cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    secure: !dev,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  });

  const { password_hash, ...userWithoutPassword } = createdUser;

  return json({
    success: true,
    message: 'User registered successfully',
    user: userWithoutPassword
  }, { status: 201 });
};