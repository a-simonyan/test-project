import moment from 'moment'
export const formatDate = (date) => {
  let userLang = navigator.language || navigator.userLanguage;
	moment.locale(userLang);
  return moment(date).format('L');
}