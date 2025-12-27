import { auth0 } from './auth0';
import { redirect } from 'next/navigation';
import { createUserFromAuth0 } from './createUserFromAuth0';
import prisma from '../prisma';

export interface Auth0User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

export async function getServerUser(): Promise<any> {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const user = await createUserFromAuth0(session.user);
  return user;
}

export async function getServerUserId(): Promise<any> {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const user = await createUserFromAuth0(session.user);
  return user?.id;
}

export async function getServerAdmin(): Promise<any> {
  const adminId = '4a8398ce-a333-4713-941a-950b5d0a8ddb'

  const admin = await prisma.admin.findUnique({where:{id: adminId}})

  if (!admin) {
    redirect('/auth/login');
  }
  return {
    namr: admin.fullName,
    email: admin.email,
    role: admin.role,
    loginAt: admin.lastLoginAt,
    isActive: admin.isActive
  };
}

export async function getServerAdminId(): Promise<any> {
  const adminId = '4a8398ce-a333-4713-941a-950b5d0a8ddb'

  if (!adminId) {
    redirect('/auth/login');
  }

  return adminId;
}