import app from './script.js';

Vue.component('goods-list', {
  name: 'goods-list',
  props: ['goods'],
  template: `
   <main>
   <div class="goods-list goods-list-cart"><h3>Товары</h3>
    <p v-if="goods.length == 0">Нет данных</p>
      <div class="goods-item" v-for="good in goods" :key="good.id_product" >
        <h2>{{ good.product_name }}</h2>
        <p>{{ good.price }}</p>
        <button class="button goods-item-add" v-on:click="addProduct(good.product_name,good.price,good.id_product)">Купить</button>
      </div>
      </div>
   </main>
  `,
  methods: {
    addProduct: app.addProduct,
  }
});

Vue.component('goods-item', {
  name: 'goods-item',
  props: ['good'],
  template: `
  <section id="cart" class="goods-list-cart"><h3>Товары в корзине</h3>
  <div class="goods-list-cart-item">
  <p v-if= 'good.length == 0 '> Пусто </p>
    <div class="goods-item goods-list-cart" v-for="cartProductItem in good" :key="good.id_product">
      <h2>{{ cartProductItem.product_name }}</h2>
      <p>{{ cartProductItem.price }}</p>
      <button class="button del-button" type="button" v-on:click="delGood(cartProductItem)">Удалить</button>
    </div>
  </div>
</section>
  `,
  methods: {
    delGood: app.delGood,
  }
});

Vue.component('search-goods', {
  name: 'search-goods',
  props: ['value'],
  template: `
  <div class="wrap-serch">
    <div class="wrap-input100">
      <input id="serch" class="input100" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder="Serch">
      <span class="focus-input100 error-text"></span> 
    </div> 
    <button class="button search-button" v-if= 'value.length !== 0'  type="button" @click="$emit('filter-goods')">Искать</button>
  </div>
  `
});

Vue.component('resul-goods', {
  name: 'resul-goods',
  props: ['filteredgoods'],
  template: `
  <div class="searchRes goods-list-cart" id='searchRes'>
   <h3>Результат поиска</h3>
   <p v-if= 'filteredgoods.length == 0 '> Я ничего такого не знаю </p>
    <div class="goods-item searchRes-item" v-for="good in filteredgoods" :key="good.id_product">
     <h2>{{ good.product_name }}</h2>
     <p>{{ good.price }}</p>
     <button class="button goods-item-add" v-on:click="addProduct(good.product_name,good.price,good.id_product)">Купить</button>
    </div>
   <p class="count-searchRes-item">Найдено товаров: {{filteredgoods.length}}</p>
  </div>
  `,
  methods: {
    addProduct: app.addProduct,
  }
});