// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
'use client';
import { useState } from 'react';
import UserMenu from './userMenu';

export type User = {
  id: number;
  name: string;
  secret: string;
  roleId: number;
} | null;

export default function userBadge({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <div>
        <p
          className='user-badge rounded-md border-2 border-green-300 bg-green-700 px-2 py-1 text-green-300 hover:cursor-pointer'
          onClick={() => setMenuOpen(!menuOpen)}>
          {user.name}
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
