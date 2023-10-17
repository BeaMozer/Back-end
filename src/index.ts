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

//Deletar usuario por Id

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = users.findIndex((user) => user.id === id);

  if (indexToDelete >= 0) {
    users.splice(indexToDelete, 1);
  }

  res.status(200).send("User apagado com sucesso");
});

//Deletar produto por Id

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = products.findIndex((product) => product.id === id);

  if (indexToDelete >= 0) {
    products.splice(indexToDelete, 1);
  }

  res.status(200).send("Produto apagado com sucesso");
});

//Editar produtos por Id
app.put("/products/:id", (req: Request, res: Response) => {
  const newId = req.params.id;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const newProduct = products.find((item) => item.id === newId);

  if (newProduct) {
    newProduct.id = newId || newProduct.id;
    newProduct.name = newName || newProduct.name;
    newProduct.price = newPrice || newProduct.price;
    newProduct.imageUrl = newImageUrl || newProduct.imageUrl;
    newProduct.description = newDescription || newProduct.description;
  }

  res.status(200).send("Produto atualizado com sucesso");
});
