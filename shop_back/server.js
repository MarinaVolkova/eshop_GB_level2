// !1. Привязать добавление товара в корзину к реальному API.
// !2. Добавить API для удаления товара из корзины.


const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('./database/catalog.json','utf8',(err, data) =>{
    res.send(data)
  })
})

app.get('/cartData', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.post('/addProduct', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => { //пробуем прочитать
    if (err) { //проверяем на ошибки
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;//тело запроса
      const hasItem = cart.find((good) => good.product_name === item.product_name);

      if (hasItem) {
        res.send('{"result": 1}');
        return;
      }
      cart.push(item);

      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/delGood', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      let cart = JSON.parse(data);
      const item = req.body;
      cart = cart.filter((good) => good.product_name !== item.product_name);
      
      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/status', (req, res) => {
  fs.readFile('./database/stats.json', 'utf8', (err, data) => { //пробуем прочитать
    if (err) { //проверяем на ошибки
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;//тело запрос
      cart.push(item);
      fs.writeFile('./database/stats.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});