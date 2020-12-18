const fetch = require('node-fetch');
const cheerio = require('cheerio');
// const { getProductsByTerm } = require('./MercadoLivre');

const Magalu = {
    name: 'MagaLu',
    baseUrl: 'https://www.magazineluiza.com.br/busca',
    async getProductsByTerm(term) {
        try {
            const response = await fetch(`${this.baseUrl}/${term}`);
            const body = await response.text();
            const $ = cheerio.load(body);

            const listProducts = [];

            $('ul.productShowCase li.product').each((index, element) => {
                const priceHtml = $(element).find('span.productPrice span.price').text().trim();
                
                const product = {
                    title: $(element).find('h3.productTitle').text(),
                    price: priceHtml.replace('à vista', '').trimEnd(),
                    provider: this.name
                }

                listProducts.push(product);
            });

            return listProducts;
        } catch (err) {
            return {
                error: true,
                status: err.status,
                message: err.message
            };            
        }
    }
}

module.exports = Magalu;
