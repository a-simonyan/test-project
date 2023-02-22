<template>
	<div class="card-box d-flex px-4 py-3">
		<div
			v-if="props.cardData.Image && checkImageUrl(props.cardData.Image)"
			class="card-box--left-side"
		>
			<img v-lazy="checkImageUrl(props.cardData.Image)" alt="image" />
		</div>
		<div class="card-box--right-side pt-2">
			<div class="card-box--right-side__name-box fs-4">
				<span v-if="props.cardData['Last name']">
					<b>
						<Highlighter
							highlightClassName="highlight"
							:searchWords="[props.searchWord]"
							:autoEscape="true"
							:textToHighlight="props.cardData['Last name']"
						/>,
					</b>
				</span>
				<span v-if="props.cardData['First name']">
					<Highlighter
						highlightClassName="highlight"
						:searchWords="[props.searchWord]"
						:autoEscape="true"
						:textToHighlight="props.cardData['First name']"
					/>
				</span>
			</div>
			<div class="card-box--right-side__info-box mt-1">
				<Highlighter
					highlightClassName="highlight"
					:searchWords="[props.searchWord]"
					:autoEscape="true"
					:textToHighlight="
						otherInfo(props.cardData.Location, props.cardData['Job title'])
					"
				/>
			</div>
			<div
				v-if="props.cardData['Date of birth']"
				class="card-box--right-side__date-box mt-1"
			>
				{{ formatDate(props.cardData["Date of birth"]) }}
			</div>
		</div>
	</div>
</template>

<script setup>
import Highlighter from "vue-highlight-words";
import { defineProps } from "vue";
import { formatDate } from "@/helpers/formatDate";

const props = defineProps({
	cardData: Object,
	searchWord: String,
});

const checkImageUrl = (image) => {
	if (image && typeof image === "string") {
		return image;
	} else if (image?.url && typeof image.url === "string") {
		return image.url;
	} else if (image.length) {
		return image[0];
	}
};
const otherInfo = (location, job) => {
	if (job && location) {
		return `${job} in ${location}`;
	} else if (location) {
		return location;
	} else if (job) {
		return job;
	}
};
</script>

<style lang="scss" scoped>
.card-box {
	border-bottom: 1px solid #c4c4c4;
	gap: 25px;
	align-items: flex-start;
	&--left-side {
		width: 120px;
		height: 120px;
		img {
			border-radius: 50%;
			width: 100%;
			height: 100%;
		}
	}
}
::v-deep {
	mark {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
}
</style>
