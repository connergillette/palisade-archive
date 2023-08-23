interface Props {
  signOut: Function,
  session?: object
}

export default function Nav({ signOut, session }: Props) {
  return (
    <div className="fixed flex align-middle w-8/12 min-w-[900px] max-md:w-11/12 max-md:min-w-[300px] mx-auto h-14 z-20">
      <a href="/" className="py-3">
        <div className={`font-bold italic text-3xl align-middle py-1 transition`}>Palisade Archive</div>
      </a>
      <div className="flex justify-end align-middle gap-2 grow py-2">
        {
          !session && (
            <>
              <a href="/login" className={`hover:bg-zinc-600 rounded-md px-4 py-2 transition h-min`}>Log in</a>
              {/* <a href="/register" className={`bg-yellow-200 text-zinc-900 opacity-100 hover:opacity-90 rounded-md px-4 py-2 transition h-min font-bold`}>Sign up</a> */}
            </>
          )
        }
        {
          session && (
            <>
              <button className={`hover:bg-zinc-600 hover:text-black rounded-md px-4 py-2 transition h-min text-gray-600`} onClick={() => signOut()}>Log out</button>
            </>
          )
        }
      </div>
    </div>
  )
}