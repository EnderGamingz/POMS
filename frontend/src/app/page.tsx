import IncidentList from './_components/incidentList';
import Stats from './_components/stats';

export default async function Home() {
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
