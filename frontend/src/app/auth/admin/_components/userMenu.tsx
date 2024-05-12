// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { LogoutButton } from '@/app/auth/logout/page';

export default function AdminUserMenu() {
  return (
    <div className='absolute right-0 mr-8 h-auto w-60 rounded-sm bg-white px-1 shadow-md'>
      <h1>Menu</h1>
      <ul className='gap-y-1'>
        <li className='my-1 rounded-md bg-indigo-400 py-1 text-center'>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
