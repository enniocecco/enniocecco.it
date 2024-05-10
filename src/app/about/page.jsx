'use client';
import { AnimatePresence } from 'framer-motion';
import Curva from '@/components/Curva';
import Description from '@/components/Description';
import { useEffect, useState } from 'react'

export default function About() {

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
        <Description />
   
    </>
  )
}