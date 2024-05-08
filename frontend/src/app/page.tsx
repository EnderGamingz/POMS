import client from '@prisma/prismadb';

export default async function Home() {
  const value = await client.incedents.findMany();

  return (
    <div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
