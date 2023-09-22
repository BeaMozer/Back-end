// estamos dentro do arquivo src/types.ts tipando um vídeo do youtube

export type TUsers = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};
