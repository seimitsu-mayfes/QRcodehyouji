'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { exhibitionItems } from "./exhibition.data";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % exhibitionItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const item = exhibitionItems[current];

  return (
    <div className="h-screen w-full flex items-stretch justify-stretch bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#181818] dark:via-[#232323] dark:to-[#222] relative">
      {/* 左上のラベル */}
      <div className="absolute top-4 left-6 text-xs text-gray-400 tracking-widest select-none z-20">
        2025年5月祭精密工学科
      </div>
      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        {/* 左側：展示 */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-0 md:px-16 relative overflow-hidden min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.h2
              key={item.title}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-100 tracking-tight drop-shadow-sm"
            >
              {item.title}
            </motion.h2>
          </AnimatePresence>
          <div className="w-full flex justify-center items-center mb-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.file}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="w-full flex justify-center items-center"
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.file}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="rounded-2xl shadow-xl object-contain max-h-[500px] bg-white/60 dark:bg-black/30"
                    style={{ maxHeight: 500 }}
                  />
                ) : (
                  <motion.video
                    src={item.file}
                    width={800}
                    height={500}
                    className="rounded-2xl shadow-xl object-contain max-h-[500px] bg-black/60"
                    style={{ maxHeight: 500 }}
                    controls
                    loop
                    autoPlay
                    muted
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title + item.description}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl bg-white/60 dark:bg-black/30 rounded-xl px-6 py-4 shadow-sm mt-2">
                {item.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* 右側：QRコード */}
        <div className="w-full md:w-[420px] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#222] p-10 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 min-h-[60vh]">
          <Image
            src="/QRcode.png"
            alt="QRコード"
            width={220}
            height={220}
            className="mb-6 drop-shadow-lg"
          />
          <span className="text-base text-gray-500 dark:text-gray-400">精密工学科に投票をお願いします</span>
        </div>
      </div>
    </div>
  );
}
