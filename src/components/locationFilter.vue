<template>
	<div class="locations-box w-100 mt-5">
		<h5>Filter by Location</h5>
		<div class="locations-box__items d-flex mt-2">
			<button
				@click="changeSelectedLocations(location)"
				v-for="(location, i) in props.locations"
				:key="`location__${i}`"
				type="button"
				class="btn"
				:class="
					selectedLocationsList.includes(location)
						? 'btn-secondary'
						: 'btn-outline-secondary'
				"
			>
				{{ location }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emits = defineEmits(["update:selectedLocations"]);

const props = defineProps({
	locations: Array,
	selectedLocationsList: Array,
});

const changeSelectedLocations = (location) => {
	emits("update:selectedLocations", location);
};
</script>

<style lang="scss" scoped>
.locations-box {
	&__items {
		flex-wrap: wrap;
		gap: 8px 10px;
	}
}
</style>