"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Marquee from "react-fast-marquee";

export default function Header() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect( () => {
      if(isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
                onEnterBack: () => {gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"},setIsActive(false))}
            }
        })
    }, []);

    const handleNavClick = (value) => {

        setIsActive(value); // This will log 'false' when the nav element in ChildComponent is clicked
      };

      return (
        <>
          <div ref={header} className={styles.header}>
            <div className={styles.logo}>
              
              <svg width="30%" height="30%" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M11.7006 6.9571C12.0766 6.78324 12.2404 6.33752 12.0665 5.96157C11.8927 5.58561 11.447 5.42177 11.071 5.59563C9.1061 6.50429 7.59171 8.31108 6.89971 10.4974C6.77471 10.8923 6.99352 11.3138 7.38843 11.4388C7.78333 11.5638 8.20479 11.345 8.32978 10.9501C8.9073 9.12545 10.1551 7.67181 11.7006 6.9571Z" fill="#6bea99"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3856 1.72865C12.8568 1.09045 11.1432 1.09045 9.61438 1.72865C5.15333 3.59087 2.25 8.02164 2.25 12.9281V13.1928C2.25 18.4551 6.42548 22.75 11.6115 22.75H12.3885C17.5745 22.75 21.75 18.4551 21.75 13.1928V12.9281C21.75 8.02164 18.8467 3.59087 14.3856 1.72865ZM10.1922 3.11289C11.3513 2.62904 12.6487 2.62904 13.8078 3.11289C17.6962 4.73608 20.25 8.61139 20.25 12.9281V13.1928C20.25 17.6587 16.7145 21.25 12.3885 21.25H11.6115C7.2855 21.25 3.75 17.6587 3.75 13.1928V12.9281C3.75 8.61139 6.30376 4.73608 10.1922 3.11289Z" fill="#6bea99"/>
</svg>
            </div>
            <div className={styles.nav}>
              <Magnetic>
                <div className={styles.el}>
                  <a href="#work">Work</a>
                  <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                    <a href="#about">About</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                    <a href="#contact-me">Contact</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a href="/contact">Contatti</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
            </div>
            <div className={styles.marq}></div>
      </div>
     
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav onNavClick={handleNavClick} />}</AnimatePresence>
    </>
  );
}
