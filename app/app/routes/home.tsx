import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel';
import { Layout } from '~/components/layout';
import { addUserFilms, getUserFilms } from '~/utils/users.server';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  addUserFilms(userId, {
    title: "batman",
    forAdults: false,
    description: ".",
    release: "22",
    generIds: [6, 5],
    rating: 7
  })
  const userFilms = await getUserFilms(userId);
  return json ({ userFilms });
}

export default function Home() {
  const { userFilms } = useLoaderData()
  return <Layout>
    <div className='h-full flex'>
        <UserPanel films={userFilms}></UserPanel>
    </div>
  </Layout>
}