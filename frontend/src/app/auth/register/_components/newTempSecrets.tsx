import speakeasy from 'speakeasy';
import { getSessionData } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function handleGenerateSecrets() {
  'use server';
  const cred = speakeasy.generateSecret({
    name: 'POMS Login',
    issuer: 'Power Outage Monitoring System',
  });
  const session = await getSessionData();
  // @ts-ignore
  session.temp_secrets = cred;
  await session.save();
  revalidatePath('');
}

export function NewTempSecrets() {
  return (
    <form action={handleGenerateSecrets}>
      <button type={'submit'}>Generate new secrets</button>
    </form>
  );
}
