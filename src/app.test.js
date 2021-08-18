const request = require('supertest');

const mockListAllProducts = jest.fn();
const mockGetProductByName = jest.fn();
const mockAddProduct = jest.fn();
const mockCreateOrder = jest.fn();
const mockGetProductByOrderId = jest.fn();
const mockAddItemToOrder = jest.fn()

const db = {
    listAllProducts: mockListAllProducts,
    getProductByName: mockGetProductByName,
    addProduct: mockAddProduct,
    createOrder: mockCreateOrder,
    getProductByOrderId: mockGetProductByOrderId,
    addItemToOrder: mockAddItemToOrder
};

// provide mock database to the application
var app = require('../src/app')(db);

describe('Products API', () => {
    test('GET /products --> array products', async () => {
        request(app)
            .get('/products')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
    });

    test('GET /products/name --> specific product by name', () => {
        request(app)
            .get('/products/Crawfish')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
    });

    test('GET /productsbyid --> array of products for a given order', () => {
        request(app)
        .get('/productsbyid')
        .expect('Content-Length', '1369')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
    });

    test('POST /addProduct --> create product', () => {
        request(app)
        .post('/addProduct')
        .expect('Content-Length', '2')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
    });

    test('POST /createOrder --> create an order containing multiple order_testems (each one contains a product id)', () => {
        request(app)
        .post('/createOrder')
        .expect('Content-Length', '2')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
    });

    test('POST /createorder/new -> add a product (item) to an order', () => {
        request(app)
        .post('/createorder/new')
        .expect('Content-Length', '2')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
    });

});
