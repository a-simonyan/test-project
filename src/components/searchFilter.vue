<template>
  <div class="search-box">
    <input @input="$event => searchResult($event.target.value)" type="text" class="form-control" placeholder="Type to search...">
	</div>
</template>

<script setup>
import _ from 'lodash'
import { defineEmits } from 'vue';

const emits = defineEmits(["update:modelValue"])

const searchResult = _.debounce((e) => {
  emits("update:modelValue", e)
}, 500)
</script>