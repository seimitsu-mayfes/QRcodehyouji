'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { exhibitionItems } from "./exhibition.data";
import { motion, AnimatePresence } from "framer-motion";

function CustomVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 動画要素がビューポートに表示されているかを検出
  useEffect(() => {
    if (!videoRef.current) return;
    
    // 現在の要素を変数に保存
    const currentVideo = videoRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // 動画が表示されている場合は再生し、そうでなければ一時停止
          if (entry.isIntersecting) {
            currentVideo?.play().catch(e => console.log('動画の再生に失敗:', e));
          } else {
            currentVideo?.pause();
          }
        });
      },
      { threshold: 0.1 } // 10%以上表示されていれば再生する
    );
    
    observer.observe(currentVideo);
    
    return () => {
      observer.unobserve(currentVideo);
    };
  }, []);
  
  return (
    <div style={{ position: "relative", width: 800, height: 500 }}>
      <video
        ref={videoRef}
        src={src}
        width={800}
        height={500}
        preload="metadata"
        muted
        loop
        playsInline
        style={{ borderRadius: 16, objectFit: "contain", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [showLongVideo, setShowLongVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // ロング動画中はスライド進行しない
    if (showLongVideo) return;
    
    let timer: NodeJS.Timeout;
    
    // ブラウザのvisibilityが変わるたびに処理を最適化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // タブが非表示のときはタイマーをクリアして無駄なリソース消費を防ぐ
        clearInterval(timer);
      } else {
        // タブが表示されたらタイマーを再開
        clearInterval(timer); // 念のため古いタイマーをクリア
        timer = setInterval(() => {
          setCurrent((prev) => {
            if (prev + 1 === exhibitionItems.length) {
              setShowLongVideo(true);
              return 0; // 一周したらリセット
            }
            return (prev + 1) % exhibitionItems.length;
          });
        }, 5000);
      }
    };

    // 初期設定
    timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev + 1 === exhibitionItems.length) {
          setShowLongVideo(true);
          return 0; // 一周したらリセット
        }
        return (prev + 1) % exhibitionItems.length;
      });
    }, 5000);

    // visibilityの変更を監視
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // クリーンアップ関数
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showLongVideo]);

  // ロング動画が終わったらスライドショーに戻す
  const handleLongVideoEnd = () => {
    setShowLongVideo(false);
    setCurrent(0);
  };

  const item = exhibitionItems[current];

  if (showLongVideo) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <video
          ref={videoRef}
          src="/exhibitionimage/media_art_long.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          onEnded={handleLongVideoEnd}
          onError={(e) => {
            console.error("動画の読み込みエラー:", e);
            // エラー発生時は5秒後にスライドショーに戻す
            setTimeout(handleLongVideoEnd, 5000);
          }}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            background: "black",
          }}
        />
      </div>
    );
  }

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
                  <CustomVideo src={item.file} />
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
            src="/QRcode.png?v2"
            alt="QRコード"
            width={220}
            height={220}
            className="mb-6 drop-shadow-lg"
          />
          <span className="text-base text-gray-500 dark:text-gray-400">
            精密工学科に投票をお願いします<br />
            投票にはLINEでのログインが必要です
          </span>
        </div>
      </div>
    </div>
  );
}
