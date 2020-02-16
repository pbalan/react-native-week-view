import moment from 'moment';

export const getFormattedDate = (date, format) => {
  return moment(date).format(format);
};

export const setLocale = (locale) => {
  moment.locale(locale);
};

export const addLocale = (locale, obj) => {
  moment.locale(locale, obj);
};

export const getCurrentMonth = (date, format) => {
  return moment(date).format(format);
};
