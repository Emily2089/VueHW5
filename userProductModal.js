export default{
  props:['tempProduct', 'addToCart'],
  data() {
    return {
      productModal: null,
      qty: 1,
    }
  },
  template: /*template*/
  `<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="tempProduct.mainImg" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
              <p>遊戲簡介：{{ tempProduct.intro }}</p>
              <p>遊戲特色：</p>
              <ul>
                <li v-for="(feature, key) in tempProduct.features" :key="'feature' + key">{{ feature }}</li>
              </ul>
              <div class="h5" v-if="tempProduct.origin_price === tempProduct.price">{{ tempProduct.price }} 元</div>
              <div v-else>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5 text-danger">現在只要 {{ tempProduct.price }} 元</div>
              </div>
              <div>
                <div class="input-group">
                  <select name="" id="" class="form-select" v-model="qty">
                    <option :value="i" v-for="i in 20" :key="'qty' + i">{{ i }}</option>
                  </select>
                  <button type="button" class="btn btn-primary" @click="addToCart(tempProduct.id, qty)">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    open() {
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    }
  },
  watch: {
    tempProduct() {
      this.qty = 1;
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  }
};