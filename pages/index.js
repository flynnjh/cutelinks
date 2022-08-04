import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [url, setURL] = useState();
  const [slug, setSlug] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async () => {
    axios
      .post(`/api/create/`, {
        url: url,
        slug: slug,
      })
      .then(function (response) {
        setMessage(`/${response.data.slug}`);
        setSlug("");
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
        setSlug("");
      });
  };

  return (
    <>
    <Head>
      <title>Cutelinks</title>
    </Head>
    <div className="flex flex-col h-screen justify-center place-items-center bg-slate-900/60">
      <div className="w-full max-w-lg max-h-lg">
        <form className="bg-slate-700/20 ring-1 ring-inset ring-white/10 shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4">
        <h1 className="flex justify-center text-2xl text-semibold text-slate-200/95 pb-4">Cutelinks</h1>
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
          {message ? (
            <div className="flex justify-center pt-6 font-semibold">
              <Link href={message}>
                <h1 className="text-blue-400 hover:underline">
                  {message} created successfully!
                </h1>
              </Link>
            </div>
          ) : null}
        </form>
      </div>
    </div>
    </>
  );
}
