// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export default function () {
  return <div className="absolute rounded-sm w-60 shadow-md bg-white h-auto mr-8 right-0 px-1">
    <h1>Menu</h1>
    <ul className="gap-y-1">
      <li className="bg-indigo-400 text-center py-1 rounded-md my-1">
        <a className="" href="/auth/logout">Logout</a>
      </li>
    </ul>
  </div>;
}
