import IncidentList from './_components/incidentList';
import Stats from './_components/stats';

export default async function Home() {
<<<<<<< HEAD
  const value = await client.incidents.findMany();

=======
>>>>>>> ff38728498bc8d77c757abfd793634da59eb9707
  return (
    <>
      <div className='mx-auto max-h-dvh w-3/4 rounded-md shadow-md'>
        <Stats />
      </div>
      <div className='mx-auto max-h-dvh w-3/4'>
        <IncidentList />
      </div>
    </>
  );
}
