import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth/auth.utils';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    try {
      const payload = verifyToken(token);

      event.locals.user = {
        id: payload.id,
        full_name: payload.full_name,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      console.log(error)
      event.locals.user = null;
      event.cookies.delete('token', { path: '/' });
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
