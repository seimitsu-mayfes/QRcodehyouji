import { ExhibitionItem } from "./exhibition.types";

export const exhibitionItems: ExhibitionItem[] = [
  {
    file: "/exhibitionimage/switch.png",
    title: "精密スイッチ",
    description: "毎年恒例の精密スイッチが今年も登場！",
    type: "image",
  },
  {
    file: "/exhibitionimage/grider.mp4",
    title: "グライダー動画",
    description: "東京の街をグライダーで飛び回ろう！",
    type: "video",
  },
  {
    file: "/exhibitionimage/robosoccer.MP4",
    title: "ロボサッカー動画",
    description: "ロボットでサッカーしよう！",
    type: "video",
  },
  {
    file: "/exhibitionimage/arm5s.mp4",
    title: "ロボットアーム動画",
    description: "ロボットアームと会話しよう!",
    type: "video",
  },
  {
    file: "/exhibitionimage/vrserviver.mp4",
    title: "VRサバイバー動画",
    description: "VR世界で生き抜け!",
    type: "video",
  },
  {
    file: "/exhibitionimage/media_art.mp4",
    title: "メディアアート",
    description: "最新のデジタル技術を駆使したインタラクティブなメディアアート作品。映像と音が融合した新感覚体験をお楽しみください。",
    type: "video",
  },
  {
    file: "/exhibitionimage/vrescape_5s.mp4",
    title: "VRエスケープ",
    description: "仮想空間で走り回れ！VRならではの没入感でリアルな脱出体験を。",
    type: "video",
  },
  {
    file: "/exhibitionimage/stepping_stones.png",
    title: "Stepping Stone",
    description: "実際に体を動かして障害物を飛び越えよう！",
    type: "image",
  },
];

// キューブの6面に使う画像（5面は画像、1面はSVGの?マーク）
export const cubeImages: string[] = [
  "/exhibitionimage/switch.png",
  "/exhibitionimage/grider.png",
  "/exhibitionimage/robosoccer.png",
  "/exhibitionimage/robotarm.png",
  "/exhibitionimage/vrsurviver.png",
  "/QRcode.png?v2",
];

export default cubeImages; 