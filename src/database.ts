// import { TProducts, TUsers } from "./types";

// export const users: TUsers[] = [
//   {
//     id: "u001",
//     name: "Beatriz",
//     email: "beatriz@email.com",
//     password: "bia123",
//     createdAt: new Date().toISOString(),
//   },

//   {
//     id: "u002",
//     name: "Nicholas",
//     email: "nicholas@email.com",
//     password: "nich00",
//     createdAt: new Date().toISOString(),
//   },
// ];

// export const products: TProducts[] = [
//   {
//     id: "prod001",
//     name: "Mouse gamer",
//     price: 250,
//     description: "Melhor mouse do mercado!",
//     imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
//   },
//   {
//     id: "prod002",
//     name: "Monitor",
//     price: 900,
//     description: "Monitor LED Full HD 24 polegadas",
//     imageUrl: "https://picsum.photos/seed/Monitor/400",
//   },
// ];

// // Criar novo usuário

// export const createUser = (
//   id: string,
//   name: string,
//   email: string,
//   password: string
// ): string => {
//   const createdAt: string = new Date().toISOString();
//   const newUser: TUsers = { id, name, email, password, createdAt };
//   users.push(newUser);

//   return "Cadastro realizado com sucesso";
// };

// //retornar todos os usuarios

// export function getAllUsers(): TUsers[] {
//   return users;
// }

// // Criar um novo produto
// export const createProduct = (
//   id: string,
//   name: string,
//   price: number,
//   description: string,
//   imageUrl: string
// ): string => {
//   const newProduct: TProducts = { id, name, price, description, imageUrl };
//   products.push(newProduct);
//   return "Produto cadastrado com sucesso";
// };

// // Retornar todos os produtos da lista de produtos
// export function getAllProducts(): TProducts[] {
//   return products;
// }

// //procurar por nome
// export const searchProductsByName = (name: string): TProducts[] => {
//   const search = name.toLowerCase();
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search)
//   );
//   return filteredProducts;
// };
