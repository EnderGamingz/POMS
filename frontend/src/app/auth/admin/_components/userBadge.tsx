// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
'use client';
import { user } from '@prisma/client';
import { useState } from 'react';
import UserMenu from './userMenu';

interface IUser {
  username: String | undefined;
  id: Number | undefined;
  role_id: Number | undefined;
}

export default function (user: IUser) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div>
        <p
          className='user-badge rounded-md border-2 border-green-300 bg-green-700 px-2 py-1 text-green-300 hover:cursor-pointer'
          onClick={() => setMenuOpen(!menuOpen)}>
          {user.username}
        </p>
        {menuOpen && (
          <div>
            <UserMenu />
          </div>
        )}
      </div>
    </>
  );
}
