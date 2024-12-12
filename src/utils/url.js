import qs from 'qs';

/**
 * 获取url参数
 * @param {string} url
 * @returns
 */
export const getQuery = (url) => {
	const search = url.split('?')[1];
	const result = qs.parse(search);
	Object.keys(result).forEach((key) => {
		if (typeof result[key] === 'string') {
			try {
				result[key] = JSON.parse(result[key]);
			} catch {
				// do nothing
			}
		}
	});
	return result;
};
