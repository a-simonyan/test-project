import axios from "axios";
import _ from "lodash";

const state = () => ({
	listSuccessData: null,
	filterData: [],
	locationsList: null,
	listErrorData: null,
	listLoading: false,
	currentPage: 1,
	perPage: 15,
	paginateData: [],
});

const getters = {
	listSuccessData: (state) => state.listSuccessData,
	listErrorData: (state) => state.listErrorData,
	listLoading: (state) => state.listLoading,
	locationsList: (state) => state.locationsList,
	filterData: (state) => state.filterData,
	paginateData: (state) => state.paginateData,
};

const mutations = {
	GET_LIST_PROCESS: (state, response) => {
		state.listLoading = response;
	},
	GET_LIST_SUCCESS: (state, response) => {
		state.listSuccessData = response;
		state.listSuccessData = _.orderBy(
			state.listSuccessData,
			["Last name", "First name"],
			"asc"
		);
		state.filterData = state.listSuccessData;
	},
	GET_LOCATIONS: (state, response) => {
		if (!response) return;
		state.locationsList = [...new Set(response.map((item) => item.Location))];
	},
	GET_LIST_FAILURE: (state, response) => {
		state.listErrorData = null;
		state.listErrorData = response;
	},
	GET_PAGINATE_DATA: (state, payload) => {
		if (payload) {
			state.currentPage++;
		} else {
			state.currentPage = 1;
		}
		const pageData = state.filterData.slice(
			(state.currentPage - 1) * state.perPage,
			state.currentPage * state.perPage
		);
		if (payload) {
			state.paginateData = [...state.paginateData, ...pageData];
		} else {
			state.paginateData = pageData;
		}
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
    const fromDate = payload.date.from ? payload.date.from : new Date('1800-01-01');
    const toDate = payload.date.to ? payload.date.to : new Date();
		state.filterData = state.filterData.filter(
			(item) =>
				Number(new Date(item["Date of birth"])) >= Number(new Date(fromDate)) &&
				Number(new Date(item["Date of birth"])) <= Number(new Date(toDate))
		);
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
				commit("GET_PAGINATE_DATA", false);
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
		commit("GET_PAGINATE_DATA", false);
	},
	changePage({ commit }) {
		commit("GET_PAGINATE_DATA", true);
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
