// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export default function () {
  return (
    <div className='absolute right-0 mr-8 h-auto w-60 rounded-sm bg-white px-1 shadow-md'>
      <h1>Menu</h1>
      <ul className='gap-y-1'>
        <li className='my-1 rounded-md bg-indigo-400 py-1 text-center'>
          <a className='block w-full' href='/auth/logout'>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
