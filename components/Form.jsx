import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const Form = () => {

  const [url, setURL] = useState();
  const [slug, setSlug] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async () => {

    if (!slug) {
        let id = nanoid();
        id = id.toLowerCase().slice(0, 2);
        setSlug(id);
    } 

    axios
        .post(`/api/create/${slug}`, {
            url: url,
            slug: slug,
        })
        .then(function (response) {
            setMessage(response.data.message);
            setSlug("");
        })
        .catch(function (error) {
            setMessage(error.response.data.message);
            setSlug("");
        });
     

    };

    useEffect(() => {
        if (!slug) {
            let id = nanoid();
            id = id.toLowerCase().slice(0, 2);
            setSlug(id);
        }
    }, [handleSubmit]);

  return (
    <div class="w-full max-w-lg max-h-lg">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="url">
            url
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="enter your url..."
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="slug">
            slug
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="slug"
            type="text"
            placeholder="enter your slug..."
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleSubmit}
          >
            Create!
          </button>
        </div>
        <div className="p-4 font-semibold">
            {message ? <h1>{message}</h1> : null}
        </div>
      </form>
    </div>
  );
};

export default Form;
