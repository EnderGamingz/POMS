// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.



export default function () {
  const nav = [
    { text: 'Home', path: '/auth/admin' },
    { text: 'Users', path: '/auth/admin/users' },
    { text: 'Services', path: '/auth/admin/services' },
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
