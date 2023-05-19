import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel';
import { Layout } from '~/components/layout';
import { getOtherUsers } from '~/utils/users.server';
import { useLoaderData, Outlet } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const users = await getOtherUsers(userId)
  return json({ users })
}

export default function Home() {
  const { users } = useLoaderData()
  return <Layout>
    <Outlet />
    <div className='h-full flex'>
        <UserPanel users={users}></UserPanel>
    </div>
  </Layout>
}