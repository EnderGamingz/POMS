// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style

import { role } from '@prisma/client';

// license that can be found in the LICENSE file.
export type User = {
  id: number;
  name: string;
  secret: string;
  roleId: number;
  lastSuccessfullLogin: Date | null;
  role: role;
} | null;
export default async function userCard({ user }: { user: User }) {
  return (
    <>
      <div className='px-2 py-2'>
        <p className='text-xl'>
        {user?.id} • {user?.name} • {user?.role.name}
        </p>
        <p className='text-xs'>
          Last login: {user?.lastSuccessfullLogin?.toISOString()}
        </p>

        <div className='[&>*]:w-full [&>*]:bg-slate-300 [&>*]:my-1 [&>*]:rounded-sm [&>*]:text-sm'>
          <button className='block'>Rename</button>
          <button className='block'>Set Role</button>
          <button className='block'>New Secret</button>
          <button className='block'>Remove</button>
        </div>
      </div>
    </>
  );
}
