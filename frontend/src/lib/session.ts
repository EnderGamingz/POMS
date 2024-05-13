import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_SECRET = process.env.SECRET;

export async function getSessionData() {
  if (!SESSION_SECRET) throw new Error('No secret set');
  return getIronSession(cookies(), {
    password: SESSION_SECRET,
    cookieName: 'poms_session',
  });
}

export async function ensureLoggedIn() {
  const session = await getSessionData();
  // @ts-ignore
  if (!session.user_id) redirect('/auth/login');
  // @ts-ignore
  return session.user_id as number;
}

export async function isAuthenticated() {
  const session = await getSessionData();
  // @ts-ignore
  return !!session.user_id;
}
