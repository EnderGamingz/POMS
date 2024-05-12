// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ensureLoggedIn } from '@/lib/session';
import AdminPageHeader from '../_components/pageHeader';

export default async function Page() {
  await ensureLoggedIn();

  return (
    <div className='min-h-full'>
      <AdminPageHeader />
    </div>
  );
}
