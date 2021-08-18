const request = require('supertest');

const mockListAllProducts = jest.fn();
const mockGetProductByName = jest.fn();


const db = {
    listAllProducts: mockListAllProducts,
    getProductByName: mockGetProductByName
};
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

    it('GET /products/orderId --> array of products for a given order', () => {

    });

    it('POST /products --> create product', () => {
        request(app)
        .post('/newproducts')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
    });

    it('POST /orders --> create an order containing multiple order_items (each one contains a product id)', () => {

    });

    it('POST /order_items -> add a product (item) to an order', () => {

    });

});
