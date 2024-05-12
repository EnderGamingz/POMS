// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import Link from 'next/link';

const navItems = [
  { text: 'Home', path: '/auth/admin' },
  { text: 'Users', path: '/auth/admin/users' },
  { text: 'Services', path: '/auth/admin/services' },
];

export default function () {
  const nav = [
    { text: 'Home', path: '/auth/admin' },
    { text: 'Users', path: '/auth/admin/users' },
    { text: 'Services', path: '/auth/admin/services' },
  ];

  return (
    <nav className='m-h-ful'>
      {navItems.map(item => (
        <Link
          key={item.text}
          className={
            'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
          }
          href={item.path}>
          {item.text}
        </Link>
      ))}
    </nav>
  );
}
