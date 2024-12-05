// 测试 getQUery

import { getQuery } from './query';

test('getQuery', () => {
	const url = 'https://www.baidu.com/?a=1&b=2&c=3';
	const result = getQuery(url);
	expect(result).toEqual({ a: 1, b: 2, c: 3 });
});

// 更复杂的用例，参数包含中文、回跳 www.baidu.com 并带参数、特殊字符、空格、数字、bool 等
test('multiple', () => {
	const url = 'https://www.baidu.com/?a=1&b=2&c=%E6%B5%8B%E8%AF%95&d=%E7%9B%AE%E6%8E%A5&url=%2F';
	const result = getQuery(url);
	expect(result).toEqual({ a: 1, b: 2, c: '测试', d: '目接', url: '/' });
});
