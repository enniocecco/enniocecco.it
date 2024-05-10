'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import Link from 'next/link';
import Script from "next/script";

const projects = [
  {
    title: "Questo sito web",
    src: "enniocecco.png",
    color: "#000000",
    text:"white",
    href: "https://github.com/enniocecco/enniocecco.it",
    slug: "this-website",
    technologies: "Next.js, SCSS, GSAP, Locomotive Scroll, Three JS",
    description: "Personal Portoflio per me stesso, sviluppatore web. Realizzato interamente in Next JS e utilizzato GSAP e Locomotive Scroll per l'animazione. Presenti elementi in Three JS."
  },
  {
    title: "Motorlcass",
    src: "motorclass-screenshot.png",
    color: "#000",
    text:"white",
    href: "https://motorclass.boiledbrains.it/",
    slug: "this-website",
    technologies: "React.js, Webpack, API integrations",
    description: "Una piattaforma web interattiva per la consultazione di un catalogo di auto a marchio Audi sincronizzato con un gestionale."
  },
  {
    title: "Makaki",
    src: "makaki.png",
    color: "#e44a64",
    text:"white",
    href: "https://www.makaki.it/",
    slug: "this-website",
    technologies: "Wordpress, Poke Configurator, Cassa in Cloud integration, Brand Identity",
    description: "E-commerce per una pokeria nata come ghost kitchen, con un avanzato sistema logistico di food delivery e integrazione custom con Cassa in Cloud. All'interno presente un configuratore di pokè."
  },
  {
    title: "Cubitto",
    src: "cubitto.png",
    color: "#ffd6d6",
    text:"black",
    href: "https://github.com/enniocecco/Cubitto",
    slug: "this-website",
    technologies: "React Native, WebUI API",
    description: "Una piattaforma web interattiva per la consultazione di un catalogo di auto a marchio Audi sincronizzato con un gestionale."
  },
  
  {
    title: "Fristeel",
    src: "fristeel.png",
    color: "#005092",
    text:"white",
    href: "https://www.fristeel.com/",
    slug: "this-website",
    technologies: "Wordpress, Gutenberg Custom Blocks",
    description: "Sito corporate veloce ed ottimizzato e scritto interamente in blocchi Gutenberg customizzati, per una facile personalizzazione autonoma."
  },
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }


  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects} id="work">
     <Script
        async
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      ></Script>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} manageModal={manageModal} key={index} href={project.href} slug={project.slug} technologies={project.technologies} />
        })
      }
    </div>
    
    <Rounded>
      <p>Start Your project</p>
    </Rounded>
    
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider} >
            {
                projects.map( (project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{backgroundColor: color, flexDirection: 'column'}} key={`modal_${index}`}  >
                  <div style={{color: project.text}}>{project.title}</div>
                  <p style={{color: project.text, fontSize: "10px"}}>{project.technologies}</p>
                    <Image 
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                   
                    />
                    <p style={{color: project.text, fontSize: "12px", padding:20, textAlign: "center"}}>{project.description}</p>
                </div>
                })
            }
            </div>
        </motion.div>
        
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.a ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} target="_blank" href={projects[index].href} >Guarda</motion.a>
        
    </>
  </main>
  )
}
