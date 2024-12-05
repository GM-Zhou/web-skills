/**
 * 获取url参数
 * @param {*} url
 * @returns
 */
export const getQuery = (url) => {
  const result = {};
  const search = url.split("?")[1];
  if (search) {
    search.split("&").forEach((ele) => {
      try {
        const [key, value] = ele.split("=");
        result[key] = JSON.parse(decodeURIComponent(value));
      } catch (error) {
        console.error(error);
      }
    });
  }
  return result;
};
