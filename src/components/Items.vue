<template>
	<div class="container" v-loading="loading_items">
		<el-row type="flex" justify="center">
			<ItemCard v-for="item in items" :key="item.id" :item="item"/>
		</el-row>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import ItemCard from './ItemCard.vue';

export default Vue.extend({
	name: "Items",
	components: {
		ItemCard
	},
	computed: {
		...mapState(['items', 'loading_items'])
	},
	mounted () {
		this.$store.dispatch('loadItems');		
	},
})
</script>

<style scoped>
.container {
	min-height: 500px;
}
</style>