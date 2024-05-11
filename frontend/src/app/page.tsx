import client from '@prisma/prismadb';
import IncidentList from './_components/incidentList';
import Stats from './_components/stats';

export default async function Home() {
  const value = await client.incidents.findMany();

  return (<>
    <div className='w-3/4 shadow-md mx-auto max-h-dvh rounded-md'>
      <Stats />
    </div>
    <div className='w-3/4 mx-auto max-h-dvh'>
      <IncidentList />
    </div>
  </>

  );
}
