// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
'use client';
import { useState } from 'react';
import AdminUserMenu from './AdminUserMenu';

export type User = {
  id: number;
  name: string;
  secret: string;
  roleId: number;
} | null;

export default function AdminUserBadge({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <div>
      <button
        className={
          'user-badge rounded-md border-2 border-green-600 bg-green-400 px-3 py-1 text-green-800'
        }
        onClick={() => setMenuOpen(!menuOpen)}>
        {user.name}
      </button>
      {menuOpen && <AdminUserMenu />}
    </div>
  );
}
