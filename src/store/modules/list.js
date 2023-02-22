import axios from "axios";

const state = () => ({
	listSuccessData: null,
	locationsList: null,
	listErrorData: null,
	listLoading: false,
  filterData: [],
});

const getters = {
	listSuccessData: (state) => state.listSuccessData,
	listErrorData: (state) => state.listErrorData,
	listLoading: (state) => state.listLoading,
	locationsList: (state) => state.locationsList,
	filterData: (state) => state.filterData,
};

const mutations = {
	GET_LIST_PROCESS: (state, response) => {
		state.listLoading = response;
	},
	GET_LIST_SUCCESS: (state, response) => {
		state.listSuccessData = response;
		state.filterData = response;
	},
	GET_LOCATIONS: (state, response) => {
		if (!response) return;
		state.locationsList = [...new Set(response.map((item) => item.Location))];
	},
	GET_LIST_FAILURE: (state, response) => {
		state.listErrorData = null;
		state.listErrorData = response;
	},
	FILTER_LIST: (state, payload) => {
		state.filterData = state.listSuccessData;
		if (!state.filterData) return;
		if (payload.search) {
			state.filterData = state.listSuccessData.filter(
				(item) =>
					item["Location"]
						?.toLowerCase()
						.includes(payload.search.toLowerCase()) ||
					item["Job title"]
						?.toLowerCase()
						.includes(payload.search.toLowerCase()) ||
					item["Last name"]
						?.toLowerCase()
						.includes(payload.search.toLowerCase()) ||
					item["First name"]
						?.toLowerCase()
						.includes(payload.search.toLowerCase())
			);
		}
		if (payload.locations.length) {
			state.filterData = state.filterData.filter((item) =>
				payload.locations.includes(item["Location"])
			);
		}
	},
};

const actions = {
	getListData({ commit }) {
		commit("GET_LIST_PROCESS", true);
		axios
			.get("https://api.npoint.io/9eb6f59270213ecb188a")
			.then((response) => {
				commit("GET_LIST_SUCCESS", response.data);
				commit("GET_LOCATIONS", response.data);
			})
			.catch((e) => {
				commit("GET_LIST_FAILURE", e);
			})
			.finally(() => {
				commit("GET_LIST_PROCESS", false);
			});
	},
	filterListData({ commit }, payload) {
		commit("FILTER_LIST", payload);
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
