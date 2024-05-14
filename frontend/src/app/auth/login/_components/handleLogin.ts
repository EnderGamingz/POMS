'use server';

import { z } from 'zod';
import client from '@prisma/prismadb';
import speakeasy from 'speakeasy';
import { getSessionData } from '@/lib/session';
import { redirect } from 'next/navigation';

const schema = z.object({
  username: z.string().min(3),
  code: z.string().min(6).max(6),
});

export default async function handleLogin(formData: FormData) {
  const validatedFields = schema.safeParse({
    username: formData.get('username'),
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const dbRes = await client.user.findUnique({
    where: { name: validatedFields.data.username },
  });

  if (!dbRes)
    return {
      errors: {
        name: 'User not found',
      },
    };

  const flag = speakeasy.totp.verify({
    secret: dbRes.secret,
    encoding: 'base32',
    token: validatedFields.data.code,
  });

  if (flag) {
    const session = await getSessionData();
    // @ts-ignore
    session.user_id = dbRes.id;
    await session.save();

    console.log(dbRes.id)

    await client.user.update({
      where: { id: dbRes.id },
      data: { lastSuccessfullLogin: new Date() },
    });

    redirect('/auth/admin');
  } else {
    return {
      errors: {
        code: 'Invalid code',
      },
    };
  }
}
