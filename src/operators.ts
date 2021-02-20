import * as moment from "moment";

export default {

  // Logic Ops

  allOf(params) {
    if (!(params instanceof Array)) throw new Error(`${params} is not an array.`);
    return params.every(b=>{return b});
  },

  anyOf(params) {
    if (!(params instanceof Array)) throw new Error(`${params} is not an array.`);
    return params.some(b=>{return b});
  },

  not(param) {
    return Array.isArray(param)? !param[0] : !param;
  },

  // Comparative Ops

  between(value, param, attribute = null) {
    let start = param.split(" ")[0];
    let end   = param.split(" ")[1];
    switch (attribute) {
        case "time":
            // in case only time is specified
            value = moment(value, "HH:mm:ss");
            start = moment(start, "HH:mm:ss");
            end = moment(end, "HH:mm:ss");
            if (end < start) end.add(1, "d");
            break;
        case "date":
            // in case date is specified
            value = moment(value, "YYYY-MM-DD");
            start = moment(start, "YYYY-MM-DD");
            end = moment(end, "YYYY-MM-DD");
            break;
        case "weekday":
            // in case only weekday is specified
            value = moment(value, "dddd");
            start = moment(start, "dddd");
            end = moment(start, "dddd");
            break;
        default:
            value = parseInt(value);
            start = parseInt(start);
            end = parseInt(end);
            console.log(`${attribute} is not explicitly specified for between operation.`);
    }
    return (value > start && value < end);
  },

  equals(value, param, attribute = null) {
    return String(param)==='*' || String(param)===String(value);
  },

  moreThan(value, param, attribute = null) {
    return parseInt(value) > parseInt(param);
  },

  lessThan(value, param, attribute = null) {
    return parseInt(value) < parseInt(param);
  },

  contains(value, param, attribute = null){
    return value.includes(param);
  },

  like(value, param, attribute = null){
    if (value === undefined) return false;
    let keys = param.split("*");
    for (let i in keys){
        if (!(keys.hasOwnProperty(i))) continue;
        let key = keys[i], index = value.indexOf(key);
        if (index<0){
            return false;
        }
        value = value.slice(index+key.length);
    }
    return true;
  },

  in(value, param, attribute = null) {
    return param.includes(value);
  }
}
