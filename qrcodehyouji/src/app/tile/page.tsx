"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 3;
const TILE_SIZE = 80;
const ANIMATION_DURATION = 0.5;

function getInitialTiles() {
  // 3x3の2次元配列
  return Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => row * GRID_SIZE + col)
  );
}

export default function TilePage() {
  const [tiles, setTiles] = useState(getInitialTiles());
  const [animating, setAnimating] = useState(false);
  const [move, setMove] = useState<{ type: "row" | "col"; idx: number; dir: 1 | -1 } | null>(null);
  const [movingTiles, setMovingTiles] = useState<number[]>([]); // アニメーション中のタイル番号

  useEffect(() => {
    if (animating) return;
    const timer = setTimeout(() => {
      const type = Math.random() < 0.5 ? "row" : "col";
      const idx = Math.floor(Math.random() * GRID_SIZE);
      const dir = Math.random() < 0.5 ? 1 : -1;
      setMove({ type, idx, dir });
      setAnimating(true);
      // アニメーション中のタイル番号を記録
      setMovingTiles(
        type === "row"
          ? tiles[idx]
          : tiles.map((row) => row[idx])
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, [tiles, animating]);

  useEffect(() => {
    if (!move) return;
    const timer = setTimeout(() => {
      setTiles((prev) => {
        const next = prev.map((row) => [...row]);
        if (move.type === "row") {
          // 行スライド
          const row = next[move.idx];
          if (move.dir === 1) {
            row.unshift(row.pop()!);
          } else {
            row.push(row.shift()!);
          }
        } else {
          // 列スライド
          const col = next.map((row) => row[move.idx]);
          if (move.dir === 1) {
            col.unshift(col.pop()!);
          } else {
            col.push(col.shift()!);
          }
          for (let i = 0; i < GRID_SIZE; i++) {
            next[i][move.idx] = col[i];
          }
        }
        return next;
      });
      setAnimating(false);
      setMove(null);
      setMovingTiles([]);
    }, ANIMATION_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [move]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <div
        style={{
          width: GRID_SIZE * TILE_SIZE,
          height: GRID_SIZE * TILE_SIZE,
          position: "relative",
          background: "#222",
          borderRadius: 16,
          boxShadow: "0 4px 32px #000a",
        }}
      >
        {/* 通常タイル（アニメーション中は動かす行/列を非表示） */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
            gap: 6,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          {tiles.flat().map((num, flatIdx) => {
            const row = Math.floor(flatIdx / GRID_SIZE);
            const col = flatIdx % GRID_SIZE;
            // アニメーション中の行/列は非表示
            let hidden = false;
            if (move && animating && movingTiles.includes(num)) {
              if ((move.type === "row" && row === move.idx) || (move.type === "col" && col === move.idx)) {
                hidden = true;
              }
            }
            return (
              <div
                key={num}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  background: `hsl(${num * 40}, 70%, 60%)`,
                  color: "#fff",
                  fontSize: 32,
                  fontWeight: 700,
                  borderRadius: 12,
                  display: hidden ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px #0007",
                  userSelect: "none",
                  transition: "display 0.2s",
                }}
              >
                {num + 1}
              </div>
            );
          })}
        </div>
        {/* アニメーション中の行/列だけ絶対位置で重ねて動かす */}
        {move && animating && (
          move.type === "row"
            ? movingTiles.map((num, i) => (
                <motion.div
                  key={num}
                  initial={false}
                  animate={{ x: move.dir * TILE_SIZE }}
                  transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: move.idx * (TILE_SIZE + 6),
                    left: i * (TILE_SIZE + 6),
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    background: `hsl(${num * 40}, 70%, 60%)`,
                    color: "#fff",
                    fontSize: 32,
                    fontWeight: 700,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px #0007",
                    userSelect: "none",
                    zIndex: 2,
                  }}
                >
                  {num + 1}
                </motion.div>
              ))
            : movingTiles.map((num, i) => (
                <motion.div
                  key={num}
                  initial={false}
                  animate={{ y: move.dir * TILE_SIZE }}
                  transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: i * (TILE_SIZE + 6),
                    left: move.idx * (TILE_SIZE + 6),
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    background: `hsl(${num * 40}, 70%, 60%)`,
                    color: "#fff",
                    fontSize: 32,
                    fontWeight: 700,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px #0007",
                    userSelect: "none",
                    zIndex: 2,
                  }}
                >
                  {num + 1}
                </motion.div>
              ))
        )}
      </div>
      <div className="text-gray-400 mt-8 text-sm">行または列が自動でスライドします</div>
    </div>
  );
} 