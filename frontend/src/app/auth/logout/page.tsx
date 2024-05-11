import { handleLogout } from '@/app/auth/logout/handleLogout';

export default function Page() {
  return (
    <form action={handleLogout}>
      <button type='submit'>Logout</button>
    </form>
  );
}