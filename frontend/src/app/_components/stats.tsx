// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function () {
  const outage_count = await client.incidents.count({
    where: { active: true },
  });

  return (
    <div className='py-2 sm:py-4'>
      <div className='mx-auto max-w-7xl px-2 lg:px-4'>
        <dl className='flex gap-x-2 gap-y-2 text-center lg:grid-cols-3'>
          <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
            <dt className='text-xs leading-7 text-gray-600'>Current Outages</dt>
            <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
              {outage_count}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
