import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
import Link from "next/link";
import Script from "next/script";
export default function Description() {
  const phrase =
    "Da più di 15 anni mi occupo di sviluppo di siti web ed ecommerce molto personalizzati.";
  const description = useRef(null);
  const isInView = useInView(description);
  return (
    <div ref={description} className={styles.description} id="about">
     
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          Ho lavorato per diversi anni nell’ambito del food & beverage
          sviluppando anche soluzioni altamente customizzate per il food
          delivery.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
        
          <Rounded className={styles.button}>
            <Link
              style={{
                display: "inline-block",
                zIndex: 1,
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
              target="_blank"
              href="/cv-ennio-cecco.pdf"
              passHref
            >
              Scarica il CV
            </Link>
          </Rounded>
        
        </div>
      </div>
    </div>
  );
}
