import moment from 'moment';


export const currentDate = () => moment().format('YYYY-MM-DD');

export const getDate = date => moment(date).format('YYYY-MM-DD');

export const getPrevDate = date => moment(date).subtract(1, "day").format("YYYY-MM-DD");

export const getNextDate = date => moment(date).add(1, "day").format("YYYY-MM-DD");

export const isOjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

export const compareNextDate = date => {
    const today = currentDate();
    const formattedDate = getDate(date);
    return formattedDate < today;
}