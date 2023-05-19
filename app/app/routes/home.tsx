import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel';
import { Layout } from '~/components/layout';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return userId;
}

export default function Home() {
  const { userId } = useLoaderData()
  return <Layout>
    <div className='h-full flex'>
        <UserPanel></UserPanel>
    </div>
  </Layout>
}