Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `<ul>
          <li v-for="detail in details">
            {{ detail }}
          </li>
        </ul>`
})
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: `<div class="product">
      <div class="product-image">
        <img :src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <=10 && inventory>0">Almost Sold Out!</p>
        <p v-else>Sold Out!</p>
        <p :class="{outOfStock: !inStock}">Out of Stock!</p>
        <p>{{ sale }}</p>
        <p> Shipping: {{ shipping }}</p>
        <product-details :details="details"></product-details>
        <div v-for="(variant, index) in variants" :key="variant.variantId"
            class="color-box" :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>
        <h2>Sizes</h2>
        <ul>
          <li v-for="size in sizes">
            {{ size }}
          </li>
        </ul>
        <a :href="link" target="_blank">More Products like this</a>
        <div class="flex">
          <button @click="addToCart" :disabled="!inStock" class="button-app" :class="{disabledButton: !inStock}">Add to Cart</button>
          <button @click="removeFromCart" :disabled="cartEmpty" class="button-app" :class="{disabledButton: cartEmpty}">Remove from Cart</button>
        </div>
      </div>
    </div>`,
  data() {
    return {
      brand: "Nike",
      product: "Boots",
      description: "description",
      selectedVariant: 0,
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 11,
      onSale: true,
      details: ["70% cotton", "30% polyester", "Gender-neutral"],
      sizes: ["10", "12", "14", "16"],
      variants: [
        {
          variantId: 1,
          variantColor: "Green",
          variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          variantQuantity: 0
        },
        {
          variantId: 2,
          variantColor: "Blue",
          variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          variantQuantity: 8
        }
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if(this.premium) {
        return 'Free'
      } else {
        return 2.99
      }
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on Sale!'
      } else {
        return this.brand + ' ' + this.product + ' are not on Sale!'
      }
    },
    cartEmpty() {
      return this.cart.length === 0
    }
  }
})

var app = new Vue({
  data: {
    premium: false,
    cart: []
  },
  methods: {
    addToCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      this.cart.splice(this.cart.indexOf(id), 1)
    }
  },
  el: '#app'
})
