'use client';
import { AnimatePresence } from 'framer-motion';
import Curva from '@/components/Curva';
import Projects from '@/components/Projects';
import { useEffect, useState } from 'react'
import { getAllPostIds } from '../../lib/projects';

export default function SingleProject() {

  const [isLoading, setIsLoading] = useState(true);

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
        <Projects />
   
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