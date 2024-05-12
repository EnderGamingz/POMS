import { ServiceDataRequestBody } from '@globalTypes/ServiceDataRequest';
import client from '@prisma/prismadb';

export async function POST(request: Request) {
  const req: ServiceDataRequestBody = await request.json();
  if (!req.token) return Response.json({ error: 'token required' }, { status: 400 });

  const service = await client.service.findUnique({
    where: { token: req.token },
  });
  if (!service) return Response.json({ error: 'not allowed' }, { status: 401 });


  await client.service.update({
    where: { id: service.id },
    data: {
      incidents: {
        updateMany: {
          where: {
            active: true,
          },
          data: {
            active: false,
          },
        },
        createMany: {
          data: req.incidents.map((incident) => ({
            ...incident,
            start_time: new Date(incident.start_time),
            end_time: !!incident.end_time ? new Date(incident.end_time) : undefined,
          })),
        },
      },
    },
  });

  await client.outageDataCollectionLog.create({data: {
    info: `Received data about ${req.incidents.length} incidents`,
    serviceId: service.id
  }})

  return Response.json({ success: true });
}