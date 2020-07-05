// 年-月-日
export const getDate = time => {
  var result;
  var d = new Date(time);
  var year = d.getFullYear();
  var mouth;
  var day;
  if (d.getMonth() + 1 < 10) {
    mouth = "0" + (d.getMonth() + 1);
  } else {
    mouth = d.getMonth() + 1;
  }
  if (d.getDate() < 10) {
    day = "0" + d.getDate();
  } else {
    day = d.getDate();
  }
  result = year + "-" + mouth + "-" + day;
  return result;
};

//年-月-日-时-分-秒
export const getDateTime = function(now) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let arr = [month, date, hour, minute, second];
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
};

// 时间格式化,获取时分秒
export const getBranch = time => {
  if (time == "") {
    return time;
  }
  var result;
  var d = new Date(time);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var second = d.getSeconds();
  result = hour + ":" + minutes + ":" + second;
  return result;
};


// 时间戳 转为 标准格式时间
export const parserDate = date => {
  var t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
};


