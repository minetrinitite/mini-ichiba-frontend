<template>
    <el-card shadow="hover" class="item-card">
      <div class="image-block">
        <router-link to="">
          <el-image fit="cover" class="image-slot">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </router-link>
      </div>
      <div class="item-card__title">
        <router-link to="">
          {{ item.name }} 
        </router-link>
      </div>
      <div class="item-card__details">
        <div class="item-card__price">
          ¥ {{ item.price }} 
        </div>
        <div v-if="item.points" class="item-card__points">
          {{ item.points }} pts.
        </div>
      </div>
      <el-button class="item-card__cart-button" type="primary" size="mini" @click="addToCart">Add to Cart</el-button>
    </el-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created() {
    this.item ? this.item.points=( Math.floor(this.item.price as number / 50) ) : null;
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', { ...this.item, amount: 1});
    }
  }
})
</script>

<style scoped>
a {
  text-decoration-line: none !important;
}

.item-card {
  display: flex;
  margin: 4px;
  justify-content: center;
  width: 200px;
  height: 310px;
}

.image-block {
  width: 170px;
  height: 180px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}

.item-card__title {
  line-height: 15px;
  font-size: 14px;
  margin: 5px 5px 0px;
  height: 30px;
  text-align: left;
}

.item-card__details {
  display: block;
}

.item-card__price {
  display: inline-block;
  font-size: 14px;
  margin: 0px 5px;
  font-weight: 700;
  text-align: left;
  width: 48%;
}

.item-card__points {
  display: inline-block;
  text-align: right;
  font-size: 12px;
  font-weight: 600;
  color:  #888888;
  width: 45%;
}

.item-card__cart-button {
  width: 75%;
  margin: 10px;
}
</style>