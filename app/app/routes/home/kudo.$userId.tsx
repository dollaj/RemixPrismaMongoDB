import { json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserById } from '~/utils/users.server'

// 1
export const loader: LoaderFunction = async ({ request, params }) => {
  // 2
  const { userId } = params

  if (typeof userId !== 'string') {
    return redirect('/home')
  }

  const recipient = await getUserById(userId)

  return json({ recipient })
}

export default function KudoModal() {
  // 3
  const data = useLoaderData()
  return <h2> User: {data.userId} </h2>
}