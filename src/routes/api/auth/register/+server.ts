/* eslint-disable @typescript-eslint/no-unused-vars */
import { hashPasword } from '$lib/server/auth/auth.service.js';
import { createUser, getUserByEmail } from '$lib/server/db/queries';
import { UserRole } from '$lib/server/db/schema';


export const POST = async ({ request }) => {
  const data = await request.json();

  const email = data.email?.toLowerCase().trim();
  const password = data.password;
  const full_name = data.full_name;

  if (!email || !password || !full_name) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  if (password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), { status: 400 });
  }

  const emailExists = await getUserByEmail(email);
  if (emailExists) {
    return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 409 });
  }

  const hashedPassword = await hashPasword(password); // ⚠️ asegúrate que hashPasword sea async
  const newUser = { 
    email, 
    password_hash: hashedPassword, 
    full_name, 
    role: UserRole.CLIENT };

  const createdUser = await createUser(newUser);

  const { password_hash, ...userWithoutPassword } = createdUser;

  return new Response(JSON.stringify({ message: 'User registered successfully', user: userWithoutPassword }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
