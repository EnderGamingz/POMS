// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function () {
  const incidents = await client.incidents.findMany({
    where: { active: true },
    include: { service: true },
  });

  return (
    <ul role='list'>
      {incidents.map(incident => (
        <li
          key={incident.id}
          className=' my-2 flex justify-between gap-x-5 rounded-md px-4 py-5 shadow-md'>
          <div className='flex min-w-2 shrink-0 items-center gap-x-4'>
            <div className='min-w-0 flex-auto'>
              <p className='text-white-900 font-semibold leading-6'>
                {incident.location}
              </p>
              <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                {incident.description} • {incident.service.name}
              </p>
            </div>
          </div>
          <div className='hidden items-center sm:flex'>
            <p className='mt-1 text-center text-xs leading-5 text-gray-500'>
              {incident.additional_information}
            </p>
          </div>
          <div className='flex shrink-0 items-center'>
            <div>
              <p className='text-sm leading-6 text-gray-500'>
                S: {incident.start_time.toLocaleTimeString()}
              </p>
              <p className='text-sm leading-6 text-gray-500'>
                E: {incident.end_time?.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
