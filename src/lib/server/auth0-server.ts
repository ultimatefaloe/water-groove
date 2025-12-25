import { auth0 } from './auth0';
import { redirect } from 'next/navigation';
import { createUserFromAuth0 } from './createUserFromAuth0';

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
  const session = await auth0.getSession();
  
  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const user = await createUserFromAuth0(session.user);
  return user;
}

export async function getServerAdminId(): Promise<any> {
  const session = await auth0.getSession();
  
  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const user = await createUserFromAuth0(session.user);
  return user?.id;
}