'use client';
import { AnimatePresence } from 'framer-motion';
import Curva from '@/components/Curva';
import Projects from '@/components/Projects';
import { useEffect, useState } from 'react'
import { getAllPostIds, getPostData } from '../../../lib/projects';
import { useRouter, useParams } from "next/navigation";

export default function SingleProject({postData}) {

  const [isLoading, setIsLoading] = useState(true);
  const router = useParams();
  console.log(router);
  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 50)
      }
    )()
  }, []);

  return (
    <>
       <AnimatePresence mode='wait'>
        {isLoading && <Curva />}
      </AnimatePresence>
        <div>{router.project}</div>
   
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getInitialProps({ params }) {
    const postData = getPostData(params.id);
    console.log(postData);
    return {
      props: {
        postData,
      },
    };
  }