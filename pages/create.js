import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [url, setURL] = useState();
  const [slug, setSlug] = useState();
  const [info, setInfo] = useState();
  const [errorMessage, setErrorMessage] = useState();


  const handleSubmit = async () => {
    axios
      .post(`/api/create/`, {
        url: url,
        slug: slug,
      })
      .then(function (response) {

        const shortLinkInfo = {
          slug: response.data.slug,
          pinReminder: response.data.pinReminder
        }

        setInfo(shortLinkInfo);
        setSlug("");
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
        setSlug("");
      });
  };

  return (
    <>
    <Head>
      <title>Cutelinks</title>
    </Head>
    <div className="flex flex-col h-screen justify-center place-items-center md:bg-slate-900/60 bg-[#1E2536]">
      <div className="w-full max-w-lg max-h-lg">
        <form className="md:bg-slate-700/20 md:ring-1 md:ring-inset md:ring-white/10 md:shadow-2xl md:rounded-2xl px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-col justify-center place-items-center">
          <h1 className="text-4xl font-semibold text-slate-200/95 py-6">Cutelinks</h1>
          <h5 className="pb-4 text-center">Cute, disposable links that <strong>expire after five hours.</strong> Death comes for us all. <a className="text-sky-400 hover:underline" href="https://github.com/flynnjh/cutelinks">View the source code on Github</a>.</h5>
          <h5 className="pb-4 text-center">Please report any abusive shortlinks to <a className="text-sky-400 hover:underline" href="https://twitter.com/distantsynths">@distantsynths</a> on Twitter.</h5>
          <h5 className="pb-4 text-center">Any shortlink that&apos;s found to have an offensive slug or illegal content will be deleted without warning.</h5>        
        </div>
        <div className="flex flex-row text-lg justify-center font-bold text-sky-400/95 pb-4 gap-6 w-auto">
          <Link href="/"><a className="hover:underline">Create</a></Link>
          <Link href="/delete"><a className="hover:underline">Delete</a></Link>
        </div>
          <div className="mb-4 mt-2">
            <input
              className="shadow rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100 ring-1 ring-inset ring-white/40"
              id="url"
              type="text"
              placeholder="Paste your long URL"
              onChange={(e) => setURL(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100 ring-1 ring-inset ring-white/40"
              id="slug"
              type="text"
              placeholder="Enter your slug (optional)"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ring-1 ring-inset ring-blue-500/50"
              type="button"
              onClick={handleSubmit}
            >
              Create!
            </button>
          </div>
          {info ? (
            <div className="flex flex-col justify-center pt-6">
              <Link href={info.slug}><a>
                <h1 className="text-sky-400 hover:underline font-semibold">
                  {info.slug} created successfully!
                </h1>
              </a>
              </Link>
                <h1 className="pt-4 font-bold">
                  Your pin for this slug is {info.pinReminder}.
                </h1>
                <h1 className="text-red-400 font-extrabold">
                  Remember it if you want to manually delete your slug!
                </h1>
            </div>
          ) : null}
          {errorMessage ? <h1>{errorMessage}</h1> : null}
        </form>
      </div>
    </div>
    </>
  );
}
