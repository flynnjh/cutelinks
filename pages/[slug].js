import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Slug() {

  const [ error, setError ] = useState(false);
  const router = useRouter();
  
  const getSlug = async (slug) => {
    await axios.get(`/api/${slug}`)
    .then(function (response) {
      window.location.assign(response.data.url);
    })
    .catch(function (error) {
      setError(error.response.data);
    })
  }

  useEffect(() => {
    if (router.isReady) {
      const slug = router.query.slug;
      getSlug(slug);
    }
  }, [router.isReady]);

  return (
    <div>
      {!error ? <h1>
        Redirecting...
      </h1> : <h1>slug not found :(</h1>}
    </div>
  )
}
