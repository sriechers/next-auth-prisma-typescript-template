import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, getProviders } from "next-auth/react"
import Link from "next/link"
import { useForm, FieldValues } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { BaseSyntheticEvent, ReactNode, useState } from 'react';
import { isValidEmail } from "../../utils"
import { GoogleIcon } from "../../components/logos/GoogleIcon"

const ProviderButtonContainer = ({ children, color = "black", bgColor = "white" }: { children: ReactNode, color?: string, bgColor?: string }) => (
  <span className={`bg-${bgColor} border-2 border-slate-50 px-7 py-3 text-${color} font-medium text-sm leading-snug uppercase rounded shadow-slate-200 shadow-md hover:shadow-lg hover:shadow-slate-200 focus:shadow-lg focus:shadow-slate-200 focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3`}>
    {children}
  </span>
)

const GoogleButton = ({ children }: { children: ReactNode }) => (
  <ProviderButtonContainer>
    <GoogleIcon className="w-5 h-5 mr-2"/>
    <span>{children}</span>
  </ProviderButtonContainer>
)

const ProviderButton = ({ text, providerId, onLoading }: { text: string, color: string, providerId: string, onLoading: (boolean: boolean) => void }) => {
  let content: ReactNode | null = null;
  let options = {}

  switch (providerId) {
    case "google":
      content = <GoogleButton>Sign in with Google</GoogleButton>;
      break;
  
    default:
      content = <ProviderButtonContainer>{text}</ProviderButtonContainer>;
      break;
  }

  return (
    <button
      className="w-full"
      onClick={() => {
        onLoading(true);
        signIn(providerId).catch(() => onLoading(false));
      }}
    >
      {content}
    </button>
  )
}

const formError = (field: string) => {
  return `Please enter a valid ${field}`;
}

type Props = {
  providers: any
}

const Login: NextPage<Props> = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState(false);

  if(session) return window.location.replace("/");

  const onSubmit = async (data: FieldValues, e: BaseSyntheticEvent<object, any, any> | undefined) => {
    e?.preventDefault();
    setLoading(() => true)
    // TODO implement E-Mail Login

    try {
      await signIn("email", {
        email: data.email
      })

    } catch (error) {
      setLoading(() => false)
    }

    setLoading(() => false)
    console.log(data);
  }

  return (
    <section className="h-screen bg-slate-100">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 px-10 py-9 rounded-lg bg-white">
            {!loading ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <input 
                      {...register("email", { required: formError("Email address"), validate: isValidEmail })} 
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address" 
                    />
                    <ErrorMessage 
                      errors={errors} 
                      name="email" 
                      render={({ message }) => <p className="text-rose-500 my-1">{message}</p>}
                    />
                  </div>


                  {/* <div className="mb-6">
                    <input 
                      {...register("password", { required: formError("Password") })} 
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password" 
                    />
                    <ErrorMessage 
                      errors={errors} 
                      name="password" 
                      render={({ message }) => <p className="text-rose-500 mt-1">{message}</p>}
                    />
                  </div> */}

                  {/* <div className="flex justify-between items-center mb-6">
                    <Link
                      href="/auth/register"
                      >
                      <a className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                        Dont have an Account?
                      </a>
                    </Link>
                    <Link
                      href="/auth/register"
                      >
                      <a className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                        Forgot password?
                      </a>
                    </Link>
                  </div> */}

                  <input 
                    type="submit"
                    className="cursor-pointer inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    value="Sign in"
                  />

                </form>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                  >
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                  {/* TODO implement E-Mail Magik Link Login and other providers than Google */}
                  {providers && Object.values(providers).map((provider) => {
                    if(provider.id === "email") return;
                    return (
                      <ProviderButton key={provider.name} onLoading={(isLoading) => setLoading(() => isLoading)} providerId={provider.id} text={`Continue with ${provider.name}`} color="#4285F4"/>
                    )
                  })}
                </form>
              </>
            ): (
              <p>loading…</p>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { 
      providers 
    },
  }
}

export default Login