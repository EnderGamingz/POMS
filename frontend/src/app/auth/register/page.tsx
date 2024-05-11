import { getSessionData, isAuthenticated } from '@/lib/session';
import { redirect } from 'next/navigation';
import client from '@prisma/prismadb';
import { GeneratedSecret } from 'speakeasy';
import { NewTempSecrets } from '@/app/auth/register/_components/newTempSecrets';
import createUser from '@/app/auth/register/_components/createUser';
import { QrDisplay } from '@/app/auth/register/_components/qrDisplay';

export default async function Page() {
  const isRegisterAllowed = (await client.user.count()) === 0;
  if (!isRegisterAllowed) redirect('/auth/login');

  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) redirect('/auth/admin');

  const session = await getSessionData();
  // @ts-ignore
  const secret: GeneratedSecret | undefined = session.temp_secrets;

  if (!secret) return <NewTempSecrets />;

  return (
    <div className={'container mx-auto mt-10 max-w-lg'}>
      <form action={createUser} className={'flex flex-col gap-2'}>
        <QrDisplay value={secret.otpauth_url || ''} />
        <input type='text' name={'name'} className={'Name'} />
        <input type='number' name={'code'} placeholder={'Code'} />
        <button className={'rounded-lg bg-indigo-300 p-2'}>
          Generate Code
        </button>
      </form>
      <NewTempSecrets />
    </div>
  );
}
