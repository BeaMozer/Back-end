"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Beatriz",
        email: "beatriz@email.com",
        password: "bia123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Nicholas",
        email: "nicholas@email.com",
        password: "nich00",
        createdAt: new Date().toISOString(),
    },
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },
];
// Criar novo usuário
const createUser = (id, name, email, password) => {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
};
exports.createUser = createUser;
//retornar todos os usuarios
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
// Criar um novo produto
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto cadastrado com sucesso";
};
exports.createProduct = createProduct;
// Retornar todos os produtos da lista de produtos
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
//procurar por nome
const searchProductsByName = (name) => {
    const search = name.toLowerCase();
    const filteredProducts = exports.products.filter((product) => product.name.toLowerCase().includes(search));
    return filteredProducts;
};
exports.searchProductsByName = searchProductsByName;
