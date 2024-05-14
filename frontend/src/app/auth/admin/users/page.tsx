// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn } from '@/lib/session';
import client from '@prisma/prismadb';
import UserCard from './_component/userCard';
import { Prisma } from '@prisma/client';
import cx from 'classnames';
import Link from 'next/link';

export type UserWithRole = Prisma.userGetPayload<{
  include: { role: true };
}>;

export default async function Page() {
  await ensureLoggedIn();

  const users: UserWithRole[] = await client.user.findMany({
    include: { role: true },
  });

  return (
    <div className={'grid gap-5 p-5'}>
      <div>
        <Link
          className={
            'rounded-md bg-indigo-300 px-5 py-2 transition-colors hover:bg-indigo-400'
          }
          href={'/auth/admin/register'}>
          New User
        </Link>
      </div>
      <div
        className={cx(
          'container mx-auto max-w-6xl ',
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
        )}>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
