'use server';

import { getSessionData } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function handleLogout() {
  const session = await getSessionData();
  session.destroy();
  redirect('/auth/login');
}
