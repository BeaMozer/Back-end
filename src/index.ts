import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//retorna usuarios
app.get("/users", async (req: Request, res: Response) => {
  try {
    const resultUsers = await db.select("*").from("users");

    res.status(200).send(resultUsers);
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//returna produtos
app.get("/products", async (req: Request, res: Response) => {
  try {
    const resultProducts = await db.select("*").from("products");
    res.status(200).send(resultProducts);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro: a query deve possuir pelo menos um caractere");
    }
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const query: string = req.query.q as string;

    if (query.length === 0) {
      res.statusCode = 404;
      throw new Error("Query deve possuir pelo menos um caractere");
    }

    const productsByName = await db("products").where(
      "name",
      "like",
      `%${query}%`
    );

    if (productsByName.length === 0) {
      res.statusCode = 404;
      throw new Error(`Nenhum produto encontrado '${query}'`);
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
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id !== "string") {
      res.statusCode = 400;
      throw new Error("Id inválido.");
    }

    if (typeof name !== "string") {
      res.statusCode = 400;
      throw new Error("Name inválido.");
    }

    if (typeof email !== "string") {
      res.statusCode = 400;
      throw new Error("Email inválido.");
    }

    if (typeof password !== "string") {
      res.statusCode = 400;
      throw new Error("Password inválido.");
    }

    const [isId] = await db.raw(`SELECT id FROM users WHERE id = "${id}"`);

    if (isId) {
      res.status(400);
      throw new Error("id inválido");
    } else {
      await db.raw(`INSERT INTO users (id, name, email, password)
      VALUES("${id}", "${name}", "${email}", "${password}")`);

      res.status(201).send("Cadastro realizado com sucesso!");
    }
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;

    if (typeof id !== "string") {
      res.statusCode = 400;
      throw new Error("Id invalido.");
    }

    if (typeof name !== "string") {
      res.statusCode = 400;
      throw new Error("Name invalido.");
    }

    if (typeof price !== "number") {
      res.statusCode = 400;
      throw new Error("price invalido.");
    }

    if (typeof description !== "string") {
      res.statusCode = 400;
      throw new Error("description invalido.");
    }

    if (typeof imageUrl !== "string") {
      res.statusCode = 400;
      throw new Error("imageUrl invalido.");
    }

    const [isIdProduct] = await db.raw(
      `SELECT id FROM products WHERE id = "${id}"`
    );

    if (isIdProduct) {
      res.status(400);
      throw new Error("id inválido");
    } else {
      await db.raw(`INSERT INTO products (id, name, price, description, image_url)
      VALUES("${id}", "${name}", ${price}, "${description}", "${imageUrl}")`);

      res.status(201).send("Produto cadastrado com sucesso");
    }
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Deletar usuario por Id

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [user] = await db.select("*").from("users").where({ id: id });

    if (!user) {
      res.status(404).send(`Não existe uma conta com o id: ${id}`);
    }

    await db.delete().from("users").where({ id: id });

    res.status(200).send("O usuário foi deletado com sucesso!");
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Deletar produto por Id

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [product] = await db.select("*").from("products").where({ id: id });

    if (!product) {
      res.status(404).send(`Não existe um produto com o id: ${id}`);
    }

    await db.delete().from("products").where({ id: id });

    res.status(200).send("O produto foi deletado com sucesso!");
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Editar produtos por Id
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.image_url as string | undefined;

    const [product] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`);

    const [verifyId] = await db.raw(
      `SELECT id FROM products WHERE id ="${id}"`
    );
    if (!verifyId) {
      throw new Error("O produto não existe");
    }
    // Verificando se o newId é único:
    const [verifyNewId] = await db.raw(
      `SELECT id FROM products WHERE id ="${newId}"`
    );
    if (verifyNewId) {
      throw new Error("newId precisa ser único!");
    }
    await db.raw(`
        UPDATE products SET
        id = '${newId || product.id}', 
        name = '${newName || product.name}', 
        price = '${newPrice || product.price}', 
        description = '${newDescription || product.description}', 
        image_url = '${newImageUrl || product.image_url}'
        WHERE id = '${id}'
    `);
    res.status(200).send("Atualização realizada com sucesso");
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//pegar todos os purchases
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const purchases = await db.raw(`SELECT * FROM purchases`);
    res.status(200).send(purchases);
  } catch (error: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, total_price } = req.body;

    const [verifyId] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`);
    if (verifyId) {
      throw new Error("Já há esse id cadastrado");
    }

    const [verifyBuyer] = await db.raw(
      `SELECT id FROM users WHERE id ="${buyer}"`
    );
    if (!verifyBuyer) {
      throw new Error("O id do comprador não existe");
    }

    await db.raw(`INSERT INTO
      purchases (id, buyer, total_price)
      VALUES (
          "${id}",
          "${buyer}",
          "${total_price}"
      )`);

    res.status(201).send("Compra cadastrada com sucesso");
  } catch (error) {
    console.log(error);
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    if (!purchaseId) {
      res.statusCode = 404;
      throw new Error(`Pedido ${purchaseId} não encontrado`);
    }

    const [purchaseInfo] = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt"
      )
      .innerJoin("users", "purchases.buyer_id", "=", "users.id")
      .where({ "purchases.id": purchaseId });

    const resultProducts = await db("purchases_products")
      .select(
        "id as idProduct",
        "name as nameProduct",
        "price as priceProduct",
        "description as descriptionProduct",
        "image_url as imageUrlProducts",
        "quantity as qtnd"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where({ "purchases_products.purchase_id": purchaseId });

    const newResult = {
      ...purchaseInfo,
      products: resultProducts,
    };

    res.status(200).send(newResult);
  } catch (error) {
    console.log(error);
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [purchase] = await db("purchases").where({ id: idToDelete });

    if (!purchase) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
    await db("purchases").del().where({ id: idToDelete });

    res.status(200).send({ message: "Pedido  deletado com sucesso" });
  } catch (error) {
    console.log(error);
    if (req.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
