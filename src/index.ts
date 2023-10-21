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
app.get("/users", (req: Request, res: Response): void => {
  try {
    const resultUsers: TUsers[] = users;

    res.status(200).send(resultUsers);
  } catch (error) {
    res.send(400);
  }
});

//returna produtos
app.get("/products", (req: Request, res: Response) => {
  try {
    const query: string | undefined = req.query.q as string | undefined;

    if (query === undefined) {
      return res.status(200).send(products);
    }

    if (query.length === 0) {
      res.statusCode = 404;
      throw new Error("Query deve possuir pelo menos um caractere");
    }

    const productsByName: TProducts[] | undefined = products.filter(
      (products) => products.name.toLowerCase() === query.toLowerCase()
    );

    if (!productsByName.length) {
      return res.status(200).send(products);
    }

    res.status(200).send(productsByName);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro: a query deve possuir pelo menos um caractere");
    }
  }
});

//create user
app.post("/users", (req: Request, res: Response): void => {
  try {
    const { id, name, email, password }: TUsers = req.body;

    const existAccountById: TUsers | undefined = users.find(
      (user) => user.id === id
    );
    const existAccountByEmail: TUsers | undefined = users.find(
      (user) => user.email === email
    );

    if (existAccountById) {
      res.statusCode = 400;
      throw new Error("Já existe um usuário com o mesmo ID");
    }

    if (existAccountByEmail) {
      res.statusCode = 400;
      throw new Error("Já existe um usuário com o mesmo e-mail.");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.post("/products", (req: Request, res: Response): void => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;

    const existProductById: TProducts | undefined = products.find(
      (product) => product.id === id
    );

    if (existProductById) {
      res.statusCode = 400;
      throw new Error("Já existe um produto com o mesmo ID.");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    products.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

//Deletar usuario por Id

app.delete("/users/:id", (req: Request, res: Response): void => {
  try {
    const id = req.params.id;
    const indexToDelete = users.findIndex((user) => user.id === id);

    if (indexToDelete >= 0) {
      users.splice(indexToDelete, 1);
      res.status(200).send("Usuário deletado com sucesso");
    } else {
      res.status(400).send("Usuário não encontrado, tente novamente!");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

//Deletar produto por Id

app.delete("/products/:id", (req: Request, res: Response): void => {
  try {
    const id = req.params.id;
    const indexToDelete = products.findIndex((product) => product.id === id);

    if (indexToDelete >= 0) {
      products.splice(indexToDelete, 1);
      res.status(200).send("Produto apagado com sucesso");
    } else {
      res.status(400).send("Produto não encontrado");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

//Editar produtos por Id
app.put("/products/:id", (req: Request, res: Response): void => {
  try {
    const id: string = req.params.id;

    const indexProduct: number = products.findIndex(
      (product) => product.id === id
    );

    if (indexProduct === -1) {
      res.status(404).send("Produto não encontrado");
    }
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
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});
