'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import speakeasy, { GeneratedSecret } from 'speakeasy';
import { getSessionData } from '@/lib/session';
import client from '@prisma/prismadb';

const schema = z.object({
  name: z.string().min(3),
  code: z.string().min(6).max(6),
});

export default async function createUser(formData: FormData) {
  const session = await getSessionData();
  // @ts-ignore
  const secrets: GeneratedSecret | undefined = session.temp_secrets;

  if (!secrets) redirect('/auth/register');

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const dbRes = await client.user.findUnique({
    where: { name: validatedFields.data.name },
  });

  if (dbRes)
    return {
      errors: {
        name: 'User already exists',
      },
    };

  const verify = speakeasy.totp.verify({
    secret: secrets.base32,
    encoding: 'base32',
    token: validatedFields.data.code,
  });

  console.log(validatedFields.data.code, secrets.base32, verify);

  if (verify) {
    session.destroy();
    await client.user.create({
      data: {
        role: {
          connectOrCreate: {
            where: {
              name: 'admin',
            },
            create: {
              name: 'admin',
            },
          },
        },
        name: validatedFields.data.name,
        secret: secrets.base32,
      },
    });
    redirect('/auth/login');
  } else {
    return false;
  }
}
