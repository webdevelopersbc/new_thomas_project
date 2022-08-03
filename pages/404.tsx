import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 500);
  }, [router]);

  return (
    <div>
      <h1>(404) NotFound Page</h1>
    </div>
  );
};

export default NotFoundPage;
