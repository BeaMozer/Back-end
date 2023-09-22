// estamos dentro do arquivo src/types.ts tipando um vídeo do youtube

export type TUsers = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string; //(string no formato ano-mês-dia T hora:minuto:segundo:milésimo-de-segundos Z),
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};
