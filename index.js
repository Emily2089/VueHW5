import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import userProductModal from './userProductModal.js';

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'), // 切換成中文版
  validateOnInput: true, // 修改驗證方式，調整為：輸入文字時，就立即進行驗證
});

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'emily-apitest';

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        addToCartLoading: '',
        cartQtyLoading: '',
      },
      carts: {},
    }
  },
  components: {
    userProductModal,
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
        .then(res => this.products = res.data.products)
        .catch(err => alert(err.response.data.message))
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(product_id, qty = 1) {
      const order = {
        product_id,
        qty,
      };
      this.status.addToCartLoading = product_id;
      axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, { data: order })
        .then(res => {
          console.log(res);
          this.getCart();
          this.status.addToCartLoading = '';
          this.$refs.userModal.close();
        })
        .catch(err => alert(err.response.data.message))
    },
    changeCartQty(item) {
      const order = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.status.cartQtyLoading = item.id;
      axios.put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, { data: order })
        .then(res => {
          console.log(res);
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch(err => alert(err.response.data.message))
    },
    removeCartItem(item) {
      let url = '';
      if(typeof item !== 'object') {
        url = `${apiUrl}/v2/api/${apiPath}/carts`;
      }else {
        url = `${apiUrl}/v2/api/${apiPath}/cart/${item.id}`;
      }
      this.status.cartQtyLoading = item;
      axios.delete(`${url}`)
        .then(res => {
          alert(res.data.message);
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch(err => alert(err.response.data.message))
    },
    getCart() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/cart`)
        .then(res => {
          console.log(res);
          this.carts = res.data.data;
        })
        .catch(err => alert(err.response.data.message))
    },
    createOrder() {
      console.log('hello');
    }
  },
  mounted() {
    this.getProducts();
    this.getCart();
    // console.log(VeeValidate);
  },
});

app.mount('#app');