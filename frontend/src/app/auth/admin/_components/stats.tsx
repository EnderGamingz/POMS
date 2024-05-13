// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function stats() {
  const outage_count = await client.incidents.count({
    where: { active: true },
  });

  const user_count = await client.user.count();

  return (
    <div className='col-span-6 row-span-1 flex justify-evenly'>
      <div className='flex w-40 flex-col items-center justify-center'>
        <p className='text-6xl'>{outage_count}</p>
        <p className='text-xs'>Outage Count</p>
      </div>
      <div className='flex w-40 flex-col items-center justify-center'>
        <p className='text-6xl'>{user_count}</p>
        <p className='text-xs'>User Count</p>
      </div>
    </div>
  );
}
