<template>
  <div class="item-card">
    <h2 class="item-name"> {{ item.name }} </h2>
    <div class="item-price"> ¥ {{ item.price }} </div>
    <el-button type="primary">Add to Cart</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ItemCard",
  props: ['item']
})
</script>
<style scoped>
.item-card {
  margin: 10px;
  padding: 10px;
}

.item-name {
  
}

.item-price {
  padding: 5px;
  font-size: 1.5em;
}
</style>