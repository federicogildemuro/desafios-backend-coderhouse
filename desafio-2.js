class ProductManager {
    static idCounter = 1;

    constructor(path) {
        this.fs = require('fs');
        this.path = path;
        this.products = this.getProducts();
    }

    getProducts() {
        try {
            const data = this.fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(data);
            ProductManager.idCounter = products.length + 1;
            return products;
        } catch (error) {
            console.log('Error al leer el archivo');
            return [];
        }
    }

    addProduct(product) {
        if (this.getProductByCode(product.code)) {
            console.log(`Ya existe un producto con el código ${product.code}`);
            return;
        }

        try {
            product.id = ProductManager.idCounter;
            this.products.push(product);
            ProductManager.idCounter++;
            const products = JSON.stringify(this.products, null, '\t');
            this.fs.writeFileSync(this.path, products);
            console.log('Producto agregado con éxito');
        } catch (error) {
            console.log('Error al agregar el producto');
        }
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

    updateProductById(id, product) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return `No se encontró el producto con id ${id}`;
        }

        try {
            product.id = id;
            this.products[index] = product;
            const products = JSON.stringify(this.products, null, '\t');
            this.fs.writeFileSync(this.path, products);
            console.log('Producto actualizado con éxito');
            return product;
        } catch (error) {
            console.log('Error al actualizar el producto');
        }
    }

    deleteProductById(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return `No se encontró el producto con id ${id}`;
        }

        try {
            this.products.splice(index, 1);
            const products = JSON.stringify(this.products, null, '\t');
            this.fs.writeFileSync(this.path, products);
            return 'Producto eliminado con éxito';
        } catch (error) {
            console.log('Error al eliminar el producto');
        }
    }
}



//se crea una instancia de la clase ProductManager
const pm = new ProductManager('./productos.json');



//se muestran los productos iniciales que están guardados en el archivo
console.log('----------------------------------------------------------------------------------------------------');
console.log('Productos iniciales (guardados en el archivo):\n', pm.products);
console.log('----------------------------------------------------------------------------------------------------');



//se agrega un producto nuevo
pm.addProduct({
    "title": "Globo Terraqueo",
    "description": "Globo terraqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "code": "GLO-0001",
    "stock": 345
});
console.log('----------------------------------------------------------------------------------------------------');
console.log('Productos luego de agregar uno nuevo:\n', pm.products);
console.log('----------------------------------------------------------------------------------------------------');



//se intenta agregar un producto repetido
pm.addProduct({
    "title": "Escuadra",
    "description": "Escuadra de 20cm",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "code": "ESC-0001",
    "stock": 123
});
console.log('----------------------------------------------------------------------------------------------------');
console.log('Productos luego de intentar agregar uno repetido:\n', pm.products);
console.log('----------------------------------------------------------------------------------------------------');



//se busca un producto por id y se muestra
console.log('Búsqueda de producto por id 3: \n', pm.getProductById(3));
console.log('----------------------------------------------------------------------------------------------------');



//se busca un producto por id inexistente y se muestra error
console.log('Búsqueda de producto por id 4: \n', pm.getProductById(4));
console.log('----------------------------------------------------------------------------------------------------');



//se actualiza un producto por id y se muestra
console.log('Actualización de producto por id 3: \n', pm.updateProductById
    (3,
        {
            "title": "Regla",
            "description": "Regla de 30cm",
            "price": 456.78,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            "code": "REG-0001",
            "stock": 456
        }
    )
);
console.log('----------------------------------------------------------------------------------------------------');



//se actualiza un producto por id inexistente y se muestra error
console.log('Actualización de producto por id 4: \n', pm.updateProductById
    (4,
        {
            "title": "Regla",
            "description": "Regla de 30cm",
            "price": 456.78,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            "code": "REG-0001",
            "stock": 456
        }
    )
);
console.log('----------------------------------------------------------------------------------------------------');



//se elimina un producto por id y se muestra confirmación
console.log('Eliminación de producto por id 3: \n', pm.deleteProductById(3));
console.log('----------------------------------------------------------------------------------------------------');



//se elimina un producto por id inexistente y se muestra error
console.log('Eliminación de producto por id 4: \n', pm.deleteProductById(4));
console.log('----------------------------------------------------------------------------------------------------');