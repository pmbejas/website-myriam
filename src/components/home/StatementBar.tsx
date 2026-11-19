"use client";

import { motion } from "framer-motion";

export function StatementBar() {
  return (
    <div className="w-full bg-[#632D3E] text-[#FFF9EE] py-7 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center"
      >
        <motion.span
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif italic text-xl sm:text-2xl lg:text-[28px] tracking-tight text-[#FFF9EE]"
        >
          Mesas que enamoran.
        </motion.span>

        <motion.small
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-[11px] uppercase tracking-[0.22em] font-semibold text-[#F0D9D8] px-4 py-1.5 rounded-full border border-[#D3A3A5]/40 bg-[#4A202B]/50"
        >
          Hecho para celebrar
        </motion.small>

        <motion.span
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif italic text-xl sm:text-2xl lg:text-[28px] tracking-tight text-[#FFF9EE]"
        >
          Experiencias que llegan al corazón.
        </motion.span>
      </motion.div>
    </div>
  );
}
