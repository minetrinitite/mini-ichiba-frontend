<template>
	<div class="container" v-loading="loading_items">
		<el-row type="flex" class="item-row">
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
	display: flex;
	min-height: 640px;
	/* border: 2px solid black; */
}

.item-row {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	max-height: 210px;
}
</style>