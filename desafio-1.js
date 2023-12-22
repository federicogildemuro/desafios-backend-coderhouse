class ProductManager {
    static idCounter = 1;

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (this.getProductByCode(product.code)) {
            return `Ya existe un producto con el código ${product.code}`;
        }
        product.id = ProductManager.idCounter;
        this.products.push(product);
        ProductManager.idCounter++;
        return `Producto agregado con éxito`;
    }

    getProductByCode(code) {
        return this.products.find(product => product.code === code);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return `No se encontró el producto con id ${id}`;
        }
        return product;
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const productManager = new ProductManager();
console.log('----------------------------------------------------------------------------------------------------');
console.log('Productos iniciales: ', productManager.getProducts());
console.log('----------------------------------------------------------------------------------------------------');

const product1 = new Product('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.addProduct(product1));
console.log('----------------------------------------------------------------------------------------------------');

console.log('Productos luego de agregar uno: ', productManager.getProducts());
console.log('----------------------------------------------------------------------------------------------------');

const product2 = new Product('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.addProduct(product2));
console.log('----------------------------------------------------------------------------------------------------');

console.log('Productos luego de intentar agregar uno con código repetido: ', productManager.getProducts());
console.log('----------------------------------------------------------------------------------------------------');

console.log('Producto buscado por id 1:', productManager.getProductById(1));
console.log('----------------------------------------------------------------------------------------------------');
console.log('Producto buscado por id 2:', productManager.getProductById(2));
console.log('----------------------------------------------------------------------------------------------------');