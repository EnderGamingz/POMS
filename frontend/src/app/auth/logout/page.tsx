import { handleLogout } from '@/app/auth/logout/handleLogout';

export function LogoutButton() {
  return (
    <form action={handleLogout}>
      <button className='w-full' type='submit'>Logout</button>
    </form>
  );
}

export default function Page() {
  return <LogoutButton />;
}
