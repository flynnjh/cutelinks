import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function DeletePage() {
  const [slug, setSlug] = useState();
  const [pin, setPin] = useState();
  const [info, setInfo] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async () => {
    axios
      .post(`/api/delete/${slug}`, {
        pin: pin,
      })
      .then(function (response) {
        setInfo(response.data.message);
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
        <h1 className="flex justify-center text-4xl font-semibold text-slate-200/95 py-4 break-all">Delete your Cutelink</h1>
        <h1 className="flex justify-center text-2xl font-semibold text-slate-200/95 pb-4 break-all">:(</h1>
        <div className="flex flex-row text-lg justify-center font-bold text-sky-400/95 pb-4 gap-6 w-auto">
          <Link href="/"><a className="hover:underline">Create</a></Link>
          <Link href="/delete"><a className="hover:underline">Delete</a></Link>
        </div>
          <div className="mb-4 mt-2">
            <input
              className="shadow rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100 ring-1 ring-inset ring-white/40"
              id="slug"
              type="text"
              placeholder="Slug for your short link (e.g. hv)..."
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100 ring-1 ring-inset ring-white/40"
              id="pin"
              type="text"
              placeholder="Pin to your Slug (e.g. 30)..."
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ring-1 ring-inset ring-red-500/50"
              type="button"
              onClick={handleSubmit}
            >
              Delete! :O
            </button>
          </div>
          {info ? (
            <div className="flex flex-col justify-center place-items-center pt-6 font-semibold">
                <h1 className="text-sky-400 hover:underline">
                  {info}
                </h1>
            </div>
          ) : null}

          {errorMessage ? <h1 className="flex flex-col justify-center place-items-center pt-6 font-semibold text-red-400">{errorMessage}</h1> : null}
        </form>
      </div>
    </div>
    </>
  );
}
