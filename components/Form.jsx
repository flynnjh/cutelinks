import axios from "axios";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useEffect, useState } from "react";

const Form = () => {

  const [url, setURL] = useState();
  const [slug, setSlug] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async () => {

    axios
        .post(`/api/create/${slug}`, {
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

    useEffect(() => {
      if (!slug) {
        const characters = 'abcdefghiklmnopqrstuvwxyz_-24689';
        let id = "";

        while (id.length < 4) {
          id += characters[Math.floor(Math.random() * characters.length)];
        } 

        setSlug(id);
    } 
    }, [handleSubmit]);

  return (
    <div className="w-full max-w-lg max-h-lg">
      <form className="bg-base-300 shadow-2xl shadow-base-100 rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 mt-2">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100"
            id="url"
            type="text"
            placeholder="Paste your long URL"
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-base-100"
            id="slug"
            type="text"
            placeholder="Enter your slug (optional)"
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleSubmit}
          >
            Create!
          </button>
        </div>
        {message ?<div className="flex justify-center pt-6 font-semibold">
            <Link href={message}><h1 className="text-blue-400 hover:underline">{message} created successfully!</h1></Link>
        </div> : null} 
      </form>
    </div>
  );
};

export default Form;
