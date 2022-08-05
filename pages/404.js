import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <div className='flex flex-col justify-center place-items-center text-xl p-9 h-screen'>
        <h1>slug not found :(</h1>
        <Link href="/">
        <a className='pt-4 hover:underline text-sky-300'>
            Create your own cutelink!
        </a>
        </Link>
    </div>
  </>
}