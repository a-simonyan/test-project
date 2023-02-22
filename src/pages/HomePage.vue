<template>
	<div class="home h-100 w-100 p-5 mx-auto">
		<search-filter v-model.trim="search" @update:model-value="searchResult" />
		<location-filter
			:selectedLocationsList="selectedlocations"
			:locations="locationsList"
			@update:selectedLocations="updateSelectedLocations"
		/>
	</div>
</template>

<script setup>
import searchFilter from "@/components/searchFilter.vue";
import locationFilter from "@/components/locationFilter.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const search = ref("");
const selectedlocations = ref([]);

const searchResult = () => {
	store.dispatch("filterListData", {
		search: search.value,
		locations: selectedlocations.value,
	});
};

const updateSelectedLocations = (location) => {
	if (selectedlocations.value.includes(location)) {
		selectedlocations.value = selectedlocations.value.filter(
			(item) => item !== location
		);
	} else {
		selectedlocations.value.push(location);
	}
	store.dispatch("filterListData", {
		search: search.value,
		locations: selectedlocations.value,
	});
};
const locationsList = computed(() => {
	return store.getters.locationsList;
});

onMounted(() => {
	store.dispatch("getListData");
});
</script>

<style lang="scss" scoped>
.home {
	max-width: 1200px;
}
</style>
