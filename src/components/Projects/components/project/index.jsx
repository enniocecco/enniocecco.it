"use client";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation"; // if you use app dir

export default function index({ index, title, manageModal, key, href, slug, technologies }) {
  const router = useRouter();

  const onClick = async (event) => {
    event.preventDefault();
   
 
      await router.push(href);
    
  };

  return (
   
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <h2>{title}</h2>
      <p>{technologies}</p>
    </div>
   
  );
}
