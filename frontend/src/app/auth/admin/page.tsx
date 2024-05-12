// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn, getSessionData } from '@/lib/session';
import client from '@prisma/prismadb';
import AdminNav from './_components/AdminNav';
import AdminUserBadge from './_components/AdminUserBadge';
import { use } from 'react';

export default async function Page() {
  await ensureLoggedIn();

  const session = await getSessionData();
  //@ts-ignore
  const user = await client.user.findUnique({ where: { id: session.user_id } });

  return (
    <>
      <div className='min-h-full'>
        <header className='flex h-12 items-center justify-between bg-gray-900 px-1'>
          <AdminNav></AdminNav>
          <AdminUserBadge
            id={user?.id}
            username={user?.name}
            role_id={user?.roleId}></AdminUserBadge>
        </header>
      </div>
    </>
  );
}
