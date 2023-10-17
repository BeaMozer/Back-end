import express, { Request, Response } from "express";
import cors from "cors";
import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";
import { TProducts, TUsers } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//retorna usuarios
app.get("/users", (req: Request, res: Response) => {
  const result: TUsers[] = users;

  res.status(200).send(result);
});

//returna produtos
app.get("/products", (req: Request, res: Response) => {
  const query: string | undefined = req.query.q as string | undefined;

  if (query === undefined) {
    return res.status(200).send(products);
  }

  const productsByName: TProducts[] | undefined = products.filter(
    (products) => products.name.toLowerCase() === query.toLowerCase()
  );

  if (!productsByName.length) {
    return res.status(200).send(products);
  }

  res.status(200).send(productsByName);
});

//create user
app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password }: TUsers = req.body;

  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso!");
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl }: TProducts = req.body;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);

  res.status(201).send("Produto cadastrado com sucesso!");
});

// console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));

// console.log(getAllUsers());

// console.log(
//   createProduct(
//     "prod003",
//     "SSD gamer",
//     349.99,
//     "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
//     "https://images.unsplash.com/photo"
//   )
// );

// console.log(getAllProducts());

// console.log(searchProductsByName("gamer"));
