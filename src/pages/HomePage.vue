<template>
	<div
		:class="{ 'd-flex justify-content-center align-items-center': dataLoading }"
		class="home h-100 w-100 p-5 mx-auto"
	>
		<div
			v-if="dataLoading"
			class="spinner-border home__loader"
			role="status"
		></div>
		<div v-else class="home__container w-100">
			<search-filter v-model.trim="search" @update:model-value="searchResult" />
			<location-filter
				:selectedLocationsList="selectedlocations"
				:locations="locationsList"
				@update:selectedLocations="updateSelectedLocations"
			/>
			<dateFilter @update:date-value="changeDate" />
			<div class="home__cards-list mt-5">
				<div v-if="dataList.length">
					<compact-card
						v-for="(item, i) in dataList"
						:cardData="item"
						:searchWord="search"
						:key="`${i}`"
					/>
				</div>
				<div v-else class="home__empty-box py-5">
					<i>No data to display</i>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import searchFilter from "@/components/searchFilter.vue";
import locationFilter from "@/components/locationFilter.vue";
import compactCard from "@/components/compactCard.vue";
import dateFilter from "@/components/dateFilter.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const search = ref("");
const selectedlocations = ref([]);
const dates = ref({
	from: "",
	to: "",
});

const searchResult = () => {
	store.dispatch("filterListData", {
		search: search.value,
		locations: selectedlocations.value,
		date: dates.value,
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
		date: dates.value,
	});
};

const changeDate = (val) => {
	dates.value = val;
	store.dispatch("filterListData", {
		search: search.value,
		locations: selectedlocations.value,
		date: dates.value,
	});
};

const infinityScroll = () => {
	const app = document.querySelector("#app");
	if (app.scrollTop >= app.scrollHeight - app.clientHeight) {
		store.dispatch("changePage");
	}
};

const dataList = computed(() => {
	return store.getters.paginateData;
});

const locationsList = computed(() => {
	return store.getters.locationsList;
});

const dataLoading = computed(() => {
	return store.getters.listLoading;
});

onMounted(() => {
	const app = document.querySelector("#app");
	app.addEventListener("scroll", infinityScroll);
	store.dispatch("getListData");
});
onUnmounted(() => {
	const app = document.querySelector("#app");
	app.removeEventListener("scroll", infinityScroll);
});
</script>

<style lang="scss" scoped>
.home {
	max-width: 1200px;
	&__loader {
		margin: 0 auto;
	}
	&__cards-list {
		border: 1px solid #c4c4c4;
		border-radius: 8px;
	}
	&__empty-box {
		width: 100%;
		text-align: center;
	}
}
</style>
