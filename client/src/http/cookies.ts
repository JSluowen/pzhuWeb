const Cookies = {
  setCookies(data) {
    const { entries } = Object;
    const expdate = new Date();
    expdate.setTime(expdate.getTime() + 72 * 60 * 60 * 1000);

    for (const [key, values] of entries(data)) {
      document.cookie = `${key}=${values};expires=${expdate.toUTCString()};path='/'`;
    }
  },
  getCookies(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + '=');
      // 如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  },
};
export default Cookies;
