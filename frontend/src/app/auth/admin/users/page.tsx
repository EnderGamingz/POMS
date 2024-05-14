// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn } from '@/lib/session';
import client from '@prisma/prismadb';
import UserCard from './_component/userCard';

export default async function Page() {
  await ensureLoggedIn();

  const users = await client.user.findMany({include: {role: true}});

  return (
    <>
    <div>
      <h2>New User</h2>
    </div>
      {users.map(user => (
        <>
          <UserCard user={user}/>
        </>
      ))}
    </>
  );
}
