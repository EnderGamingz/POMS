// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { UserWithRole } from '@/app/auth/admin/users/page';
import { HashtagIcon, UsersIcon } from '@heroicons/react/24/solid';

export default async function userCard({ user }: { user: UserWithRole }) {
  return (
    <>
      <div className='flex flex-col items-start gap-1 rounded-md bg-gray-50 p-3 shadow-sm'>
        <div
          className={
            'flex w-full flex-col items-center justify-between sm:flex-row'
          }>
          <h2 className={'flex items-center gap-3 text-2xl'}>
            <UsersIcon className={'h-5 w-5 text-indigo-400'} />
            {user.name}
          </h2>
          <div
            className={
              'rounded-full bg-indigo-200 px-3 outline outline-1 outline-indigo-500'
            }>
            {user.role.name}
          </div>
        </div>
        <p className={'flex items-center gap-1'}>
          <HashtagIcon className={'h-4 w-4 text-indigo-400'} /> {user.id}
        </p>
        <p className={'text-xs italic'}>
          Last login:{' '}
          {user.lastSuccessfulLogin?.toISOString() || 'Not available'}
        </p>
        <div
          className={
            'grid w-full gap-1.5 [&>*]:rounded-md [&>*]:bg-slate-300 [&>*]:p-1 [&>*]:text-sm'
          }>
          <button>Rename</button>
          <button>Set Role</button>
          <button>New Secret</button>
          <button>Remove</button>
        </div>
      </div>
    </>
  );
}
