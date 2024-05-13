// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn } from '@/lib/session';
import client from '@prisma/prismadb';
import Nav from './_components/nav';
import UserBadge from './_components/userBadge';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const user_id = await ensureLoggedIn();

  const user = await client.user.findUnique({ where: { id: user_id } });

  return (
    <div className='min-h-full'>
      <header className='flex h-12 items-center justify-between bg-gray-900 px-1'>
        <Nav />
        <UserBadge user={user} />
      </header>
      {children}
    </div>
  );
}
