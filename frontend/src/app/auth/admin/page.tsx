// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn, getSessionData } from '@/lib/session';
import Stats from './_components/stats';
import OutageDataCollectionLog from './_components/outageDataCollectionLog';
export default async function Page() {
  await ensureLoggedIn();

  return (
    <div className='bg-gray min-h-full'>
      <div className='grid grid-cols-6 grid-rows-4 gap-2 px-4 py-4 [&>*]:min-h-40 [&>*]:rounded-md [&>*]:bg-white [&>*]:shadow-md'>
        <Stats />
        <OutageDataCollectionLog />
      </div>
    </div>
  );
}
