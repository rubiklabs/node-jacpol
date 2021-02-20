import moment from 'moment';

export default {

  time(startAt, endAt) {
      const now = moment();
      startAt = moment(startAt, 'HH:mm');
      endAt = moment(endAt, 'HH:mm');
      return now >= startAt && now <= endAt;
  },

  weekday(weekday){
      return moment().format('dddd').toLowerCase() == weekday.toLowerCase();
  }
};
