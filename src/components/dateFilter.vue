<template>
	<div class="date-filter-box mt-5">
		<h5>Filter by Birthday</h5>
		<div
			class="date-filter-box__input-container d-flex justify-content-between align-items-center"
		>
			<input
        v-model="fromDate"
				@input="($event) => updateDate($event.target.value, 'start')"
				class="form-control"
				type="date"
				name="startDate"
				:max="maxDate"
			/>
			<span>to</span>
			<input
        v-model="toDate"
        @input="($event) => updateDate($event.target.value, 'end')"
				class="form-control"
				type="date"
				name="endDate"
				:min="minDate"
				:max="maxDate"
			/>
		</div>
	</div>
</template>

<script setup>
import moment from "moment";
import { ref, defineEmits } from 'vue'

const maxDate = moment(new Date()).format("YYYY-MM-DD");
const minDate = ref("")
const fromDate = ref("")
const toDate = ref("")

const emits = defineEmits(["update:dateValue"])

const updateDate = (e, type) => {
  if(type === 'start') {
    minDate.value = e
  }
	emits("update:dateValue", { from: fromDate.value, to: toDate.value })
};
</script>

<style lang="scss" scoped>
.date-filter-box {
	&__input-container {
		gap: 40px;
	}
}
</style>
