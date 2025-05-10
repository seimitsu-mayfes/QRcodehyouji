import { ExhibitionItem } from "./exhibition.types";

export const exhibitionItems: ExhibitionItem[] = [
  {
    file: "/exhibitionimage/photo1.png",
    title: "展示A",
    description: "これは展示Aの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/photo2.png",
    title: "展示B",
    description: "これは展示Bの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/photo3.png",
    title: "展示C",
    description: "これは展示Cの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/photo4.png",
    title: "展示D",
    description: "これは展示Dの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/test1.png",
    title: "展示E",
    description: "これは展示Eの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/test3.png",
    title: "展示F",
    description: "これは展示Fの説明です。",
    type: "image",
  },
  {
    file: "/exhibitionimage/movie1.mp4",
    title: "展示G（動画）",
    description: "これは展示Gの動画説明です。",
    type: "video",
  },
  {
    file: "/exhibitionimage/movie2.mp4",
    title: "展示H（動画）",
    description: "これは展示Hの動画説明です。",
    type: "video",
  },
  {
    file: "/exhibitionimage/movie3.mp4",
    title: "展示I（動画）",
    description: "これは展示Iの動画説明です。",
    type: "video",
  },
];

// キューブの6面に使う画像（5面は画像、1面はSVGの?マーク）
export const cubeImages: string[] = [
  "/exhibitionimage/photo1.png",
  "/exhibitionimage/photo2.png",
  "/exhibitionimage/photo3.png",
  "/exhibitionimage/photo4.png",
  // 5面目: ?マークSVG
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><defs><radialGradient id='g' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%23fff'/><stop offset='100%' stop-color='%23b3b3b3'/></radialGradient></defs><rect width='512' height='512' rx='0' fill='url(%23g)'/><text x='50%' y='55%' text-anchor='middle' font-size='320' font-family='Arial Black,Arial,sans-serif' fill='%23444' stroke='%23fff' stroke-width='16' dy='.35em'>?</text></svg>",
  "/exhibitionimage/test3.png",
];

export default cubeImages; 