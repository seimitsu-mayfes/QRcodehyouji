export type ExhibitionItem = {
  file: string; // 画像や動画のファイル名
  title: string; // 展示名
  description: string; // 説明
  type: 'image' | 'video'; // 画像か動画か
};

export type CubeFaceImages = string[]; 