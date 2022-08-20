import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'

const VerifyRequest: NextPage = () => {

  return (
    <section className="h-screen bg-slate-100">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 px-10 py-9 rounded-lg bg-white">
            <h1 className="text-3xl font-bold mb-2">We've sent you an <span className="whitespace-nowrap">E-Mail</span></h1>
            <p>A sign in link has been sent to your <span className="whitespace-nowrap">E-Mail address.</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerifyRequest