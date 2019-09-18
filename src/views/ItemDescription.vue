<template>
	<div class="container">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-image :src="item.imageURL" fit="cover" class="image-slot">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"/>
                    </div>
                </el-image>
            </el-col>
            <el-col :span="8">
                <h1> {{ item.name }} </h1>
                <div class="item-details">
                    <div class="item-price">
                        ¥ {{ item.price }} 
                    </div>
                    <div v-if="item.points" class="item-points">
                        {{ item.points }} pts.
                    </div>
                </div>
                <el-button class="item-button" type="primary" size="mini" @click="addToCart">Add to Cart</el-button>
            </el-col>
        </el-row>
        <p class="item-description"> {{ item.description }} </p>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "ItemDescription",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('addToCart', { ...this.item, amount: 1});
        }
    },
    mounted () {

    }
})
</script>

<style scoped>
.container {
	min-height: 640px;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
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
  min-width: 100px;
  min-height: 250px;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}

.item-price {
  display: inline-block;
  font-size: 28px;
  margin: 0px 5px;
  font-weight: 700;
  text-align: left;
  width: 48%;
}

.item-points {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color:  #888888;
  width: 45%;
}

.item-button {
  width: 100%;
  margin: 10px;
  height: 64px;
  line-height: 1.3;
  font-weight: 700;
  font-size: 16px;
}

.item-description {
    text-align: left
}
</style>