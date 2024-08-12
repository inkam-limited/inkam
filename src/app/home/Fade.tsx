"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeInWhenVisible({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        hidden: { opacity: 0, y: 100, transition: { duration: 1 } },
      }}
    >
      {children}
    </motion.div>
  );
}
export default FadeInWhenVisible;
