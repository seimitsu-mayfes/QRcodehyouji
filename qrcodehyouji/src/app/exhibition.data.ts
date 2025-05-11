import { ExhibitionItem } from "./exhibition.types";

export const exhibitionItems: ExhibitionItem[] = [
  {
    file: "/exhibitionimage/switch.JPG",
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
];

// キューブの6面に使う画像（5面は画像、1面はSVGの?マーク）
export const cubeImages: string[] = [
  "/exhibitionimage/switch.png",
  "/exhibitionimage/grider.png",
  "/exhibitionimage/robosoccer.png",
  "/exhibitionimage/robotarm.png",
  "/exhibitionimage/vrsurviver.png",
  "/QRcode.png",
];

export default cubeImages; 