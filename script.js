// 3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.

const API_URL = 'http://127.0.0.1:3000';

const app = new Vue({
  el: '#app',
  searchRes: '#searchRes',
  cart: '#cart',
  data: () => ({
    goods: [],
    filteredgoods: [],
    searchLine: '',
    good: [],
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData`, (goods) => {
      this.goods = JSON.parse(goods);
    });
    this.getCartData()
  },
  methods: {
    makeGETRequest(url, callback) {
      var xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },

    makePOSTRequest(url, data, callback) {
      let xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      xhr.send(data);
    },

    getCartData() { //чтение данных из корзины
      cart.style.display = "block";
      this.makeGETRequest(`${API_URL}/cartData`, (goods) => {
        this.good = JSON.parse(goods);
      });
    },
    addProduct(product_name, price, id_product,status = 'add',date = new Date()) { //добавление товаров в козину
      this.makePOSTRequest(`${API_URL}/addProduct`, JSON.stringify({ product_name: product_name, price: price, id_product: id_product}), () => {
      });
       this.stats(product_name,status,date)
    },
    delGood(good,status = 'del',date = new Date()  ) {
      this.makePOSTRequest(`${API_URL}/delGood`, JSON.stringify(good), () => {
        this.good.forEach(item => {
          if (item.product_name === good.product_name) {
            this.good.splice(this.good.indexOf(item), 1);
          }
        });
      });
      this.stats(good.product_name,status,date)
    },

    stats(product_name,status,date) {
      this.makePOSTRequest(`${API_URL}/status`, JSON.stringify({ product_name: product_name, status: status, date: date }), () => {
      });
    },

    FilterGoods() { //поиск
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredgoods = this.goods.filter(good => regexp.test(good.product_name));
      searchRes.style.display = "block";
      return this.filteredgoods
    },

    // addProduct(product_name, price, id_product) {
    //   let result = this.good.find(item => item.product_name === product_name);
    //   if (!result) {  
    //     this.good.push({ product_name: product_name, price: price, id_product: id_product });
    //   }else{
    //       result.price += price;
    //   }
    //   cart.style.display = "block";
    // },

    // delGood(obj){
    //   this.good.forEach(item => {
    //     if (item.product_name === obj) {
    //       this.good.splice(this.good.indexOf(item), 1);
    //     }
    //   });
    // },

    openCart() {
      if (cart.style.display == "block") {
        cart.style.display = "none";
      } else {
        cart.style.display = "block";
      }
    }
  }
});
export default app;

