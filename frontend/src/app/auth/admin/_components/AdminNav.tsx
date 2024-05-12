// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import path from 'path';
import { text } from 'stream/consumers';

export default function AdminNav() {
  const nav = [
    { text: 'Users', path: '/users' },
    { text: 'Services', path: 'Services' },
  ];

  return (
    <>
      <nav className='m-h-ful'>
        {nav.map(i => (
          <a
            className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            href={i.path}>
            {i.text}
          </a>
        ))}
      </nav>
    </>
  );
}
