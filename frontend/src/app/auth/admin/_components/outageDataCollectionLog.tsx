// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function OutageDataCollectionLog() {
  const log = await client.outageDataCollectionLog.findMany({
    include: { service: true },
    orderBy: { id: 'desc' },
  });

  return (
    <div className='col-span-3 row-span-2'>
      <header className='flex h-10 w-full items-center justify-center rounded-md rounded-b-none bg-gray-700 text-gray-200'>
        <p>Outage Collection Log</p>
      </header>
      <div className='h-full w-full px-2 py-2 text-center'>
        <div>
          <div className='outageDataCollectionLogRow grid w-full grid-cols-5 rounded-md text-sm shadow-md'>
            <span>Id</span>
            <span>Time</span>
            <span>Info</span>
            <span>Service ID</span>
            <span>Service</span>
          </div>

          <div className='max-h-64 overflow-auto text-xs'>
            {log.map(l => (
              <div className='outageDataCollectionLogRow my-2 grid w-full grid-cols-5 rounded-md py-1 shadow-sm odd:bg-gray-100 even:bg-gray-200'>
                <span>{l.id}</span>
                <span>{l.time.toISOString()}</span>
                <span>{l.info}</span>
                <span>{l.serviceId}</span>
                <span>{l.service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
