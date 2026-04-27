import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session ? session.value : null;
}

export async function createSession(adminId: string) {
  const cookieStore = await cookies();
  // In a production app, use a secure JWT here. For this task, we use a simple session token.
  const sessionToken = Buffer.from(`${adminId}:${Date.now()}`).toString('base64');
  cookieStore.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
