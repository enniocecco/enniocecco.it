import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

export default function Contact() {
  const container = useRef(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#000000" },
        },
      });
    })();
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const callMe = (() => {
    window.open("https://wa.me/393517387821?text=Ciao%20Ennio%2C%20vorrei%20mettermi%20in%20contatto%20con%20te%2C%20quando%20possiamo%20sentirci%3F", "_blank");
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <main id="contacts">
    <motion.div style={{ y }} ref={container} className={styles.contact}>
        <Script
        async
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      ></Script>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/fisheye.jpg`} />
            </div>
            <div>
              <h2>Lavoriamo</h2>
              <h2>assieme</h2>
            </div>
          </span>
          
          <motion.div style={{ x }} className={styles.buttonContainer}>
          
            <Rounded backgroundColor={"#fff"} color={"#000"} className={styles.button} onClick={() => callMe() }>
              <p>Whatsappami!</p>
            </Rounded>
          
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>
              <Link className={styles.link} href="mailto:info@enniocecco.it">
                info@enniocecco.it
              </Link>
            </p>
          </Rounded>
          <Rounded>
            <p>
              <Link className={styles.link} href="tel:+393517387821">
                +39 351 7387821
              </Link>
            </p>
          </Rounded>
        </div>
        </div>
            <div className={styles.body}>
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>2024 © Edition</p>
            </span>
          </div>
          <div>
            <span>
              <h3>socials</h3>
              <Magnetic>
                <p>
                  <Link
                    target="_blank"
                    className={styles.link}
                    href="https://github.com/enniocecco"
                  >
                    Github
                  </Link>
                </p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>
                <Link
                  target="_blank"
                  className={styles.link}
                  href="https://www.linkedin.com/in/ennio-cecco-81924429/"
                >
                  Linkedin
                </Link>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <Link
                  target="_blank"
                  className={styles.link}
                  href="https://www.facebook.com/enniocecco/"
                >
                  Facebook
                </Link>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <Link
                  target="_blank"
                  className={styles.link}
                  href="https://www.instagram.com/cequenho/"
                >
                  Instagram
                </Link>
              </p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
    </main>
  );
}
