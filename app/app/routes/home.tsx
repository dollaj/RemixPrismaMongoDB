import { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel';
import { Layout } from '~/components/layout';

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
}

export default function Home() {
  return <Layout>
    <div className='h-full flex'>
        <UserPanel></UserPanel>
    </div>
  </Layout>
}