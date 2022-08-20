import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (!session) return null;

  console.log(session);

  return (
    <div className="grid place-content-center h-screen">
      <div className="flex items-center">
        <h2 className="mr-3">Signed in as {session?.user?.name}</h2>
        <button className="rounded-sm bg-rose-500 text-white font-medium px-3 py-2 leading-none" onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  )
}

export default Home
