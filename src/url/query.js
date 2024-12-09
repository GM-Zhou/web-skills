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

// const deepJSONParse = (obj) => {
// 	if (Array.isArray(obj)) return obj.map((item) => deepJSONParse(item));
// 	if (typeof obj === 'object') {
// 		Object.entries(obj).forEach(([key, value]) => {
// 			obj[key] = deepJSONParse(value);
// 		});
// 		return obj;
// 	}
// 	try {
// 		return JSON.parse(obj);
// 	} catch {
// 		return obj;
// 	}
// };
