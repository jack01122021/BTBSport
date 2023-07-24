import { useSession, signIn, signOut } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <img
          class="w-10 h-10 rounded-full"
          src={session.user.image}
          alt="User Image"
        />
        <button
          className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
