import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth/auth.utils';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    try {
      const payload = verifyToken(token);

      event.locals.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      
      event.locals.user = null;
      event.cookies.delete('token', { path: '/' });
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
