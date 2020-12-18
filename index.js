const http = require('http');
const Magalu = require('./services/Magalu');
const MercadoLivre = require('./services/MercadoLivre');
const Cache = require('./utils/cache');

const app = http.createServer(async (req, res) => {
    const term = req.url.replace("/", "");

    if(term.length < 1) {
        res.writeHead(400, {"Content-Type": "application/json; charset=utf8"});
        res.write(JSON.stringify('O termo de busca não foi informado'));
        return res.end();
    }

    const products = await Magalu.getProductsByTerm(term);

    Cache.setCache(term, JSON.stringify(products));

    const cachedProducts = Cache.getCache(term);

    if(cachedProducts) {
        res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
        res.write(JSON.stringify(cachedProducts));
        return res.end();
    }

    if(products.error) {
        res.writeHead(503, {"Content-Type": "application/json; charset=utf8"});
        res.write(JSON.stringify(products.details));
        return res.end()
    }
    
    // console.log(products);

    res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
    res.write(JSON.stringify(products));
    res.end();
});

app.listen(3000);