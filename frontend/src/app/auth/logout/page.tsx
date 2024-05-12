import { handleLogout } from '@/app/auth/logout/handleLogout';

export function LogoutButton() {
  return (
    <form action={handleLogout}>
      <button type='submit'>Logout</button>
    </form>
  );
}

export default function Page() {
  return <LogoutButton />;
}
