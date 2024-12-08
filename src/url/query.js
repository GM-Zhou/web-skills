/**
 * 获取url参数
 * @param {string} url
 * @returns
 */
export const getQuery = (url) => {
	const result = {};
	const search = url.split('?')[1];
	if (search) {
		search.split('&').forEach((ele) => {
			const [key, value] = ele.split('=');
			try {
				result[key] = decode(JSON.parse(value));
			} catch {
				result[key] = decode(value);
			}
		});
	}
	return result;
};

const decode = (param) => {
	if (typeof param !== 'object') return decodeURIComponent(param);
	if (Array.isArray(param)) return param.map(decode);
	const result = {};
	for (const key in param) {
		result[key] = decode(param[key]);
	}
	return result;
};

