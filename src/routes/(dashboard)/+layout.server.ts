import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth/auth.utils';

export const load = async ({ cookies }) => {
  const token = cookies.get('token');

  if (!token) {
    throw redirect(302, '/login');
  }

  try {
    const user = verifyToken(token);

    return {
      role: user.role,
      user
    };
  } catch {
    cookies.delete('token', { path: '/' });
    throw redirect(302, '/login');
  }
};
