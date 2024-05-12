// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from '@prisma/prismadb';

export default async function () {
  const log = await client.outageDataCollectionLog.findMany({
    include: { service: true },
  });

  return (
    <div className='col-span-3 row-span-2'>
      <header className='flex h-10 w-full  items-center justify-center rounded-md rounded-b-none bg-gray-700 text-gray-200'>
        <p>Outage Collection Log</p>
      </header>
      <div className='text-center h-full w-full px-2 py-2'>
        <div>
          <div className='outageDataCollectionLogRow grid w-full grid-cols-5 shadow-md rounded-md text-sm'>
            <span >Id</span>
            <span>Time</span>
            <span>Info</span>
            <span>Service ID</span>
            <span>Service</span>
          </div>

          <div className='max-h-64 overflow-auto text-xs'>
            {log.map(l => (
              <div className='outageDataCollectionLogRow grid w-full grid-cols-5 shadow-sm  my-2 py-1 rounded-md  even:bg-gray-200 odd:bg-gray-100'>
                <span>{l.id}</span>
                <span>{l.time.toISOString()}</span>
                <span>{l.info}</span>
                <span>{l.serviceId}</span>
                <span>{l.service.name}</span>
              </div>
            )).reverse()}
          </div>
        </div>

        {/* <table className='w-full'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Time</th>
              <th>Info</th>
              <th>Service Id</th>
              <th>Service name</th>
            </tr>
          </thead>

          <tbody className='text-center text-xs '>
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
        </table> */}
      </div>
    </div>
  );
}
