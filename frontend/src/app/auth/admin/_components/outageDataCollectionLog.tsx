// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function () {
  const log = await client.outageDataCollectionLog.findMany({
    include: { service: true },
  });

  return (
    <div className='col-span-3 row-span-1'>
      <header className='flex h-10 w-full  items-center justify-center rounded-md rounded-b-none bg-gray-700 text-gray-200'>
        <p>Outage Collection Log</p>
      </header>
      <div className='overflow-y-auto max-h-svh  h-full w-full px-2 py-2'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Time</th>
              <th>Info</th>
              <th>Service Id</th>
              <th>Service name</th>
            </tr>
          </thead>
    
          <tbody className='text-center text-xs'>
            {log
              .map(l => (
                <tr className='border-b-2'>
                  <td>{l.id}</td>
                  <td>{l.time.toISOString()}</td>
                  <td>{l.info}</td>
                  <td>{l.serviceId}</td>
                  <td>{l.service.name}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
