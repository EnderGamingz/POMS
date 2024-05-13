// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { getSessionData } from '@/lib/session';
import Nav from './nav';
import client from '@prisma/prismadb';
import UserBadge from './userBadge';

export default async function () {
  const session = await getSessionData();
  //@ts-ignore
  const user = await client.user.findUnique({ where: { id: session.user_id } });

  return (
    <>
      <header className='flex h-12 items-center justify-between bg-gray-900 px-1'>
        <Nav />
        <UserBadge user={user} />
      </header>
    </>
  );
}
