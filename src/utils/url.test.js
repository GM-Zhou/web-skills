import { getQuery } from './query';

describe('getQuery', () => {
	it('should return empty object when url is empty', () => {
		expect(getQuery('')).toEqual({});
	});
	it('should return empty object when url is not include ?', () => {
		expect(getQuery('https://www.baidu.com')).toEqual({});
	});
	it('should return empty object when url is not include ? and string is empty', () => {
		expect(getQuery('https://www.baidu.com?')).toEqual({});
	});
	it('should return empty object when url is not include ? and string is not string', () => {
		expect(getQuery('https://www.baidu.com?=' + JSON.stringify({}))).toEqual({});
	});
	it('should return object when url is include ?', () => {
		expect(getQuery('https://www.baidu.com?name=zgm&age=18')).toEqual({
			name: 'zgm',
			age: 18,
		});
	});
	it('should return object when url is include ? and string is object', () => {
		expect(getQuery(`https://www.baidu.com?name=zgm&age=${JSON.stringify({ age: 18 })}`)).toEqual({
			name: 'zgm',
			age: { age: 18 },
		});
	});
	it('should return object when url is include ? and string is array', () => {
		expect(
			getQuery(
				'https://www.baidu.com?name=zgm&age=' +
					JSON.stringify([1, 2, 3, JSON.stringify({ age: 18 })]),
			),
		).toEqual({
			name: 'zgm',
			age: [1, 2, 3, '{"age":18}'],
		});
	});
	test('multiple', () => {
		const target =
			'https://zhidao.baidu.com/question/504901145736526124.html?qbl=relate_question_0&word=%E9%98%BF%E6%96%AF%E8%92%82%E8%8A%AC';
		const url = `https://www.baidu.com/s?wd=%E9%98%BF%E6%96%AF%E8%92%82%E8%8A%AC&rsv_spt=1&url=${encodeURIComponent(target)}&rsv_iqid=0xabcf402e01cd47a9&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=0&rsv_btype=i&rsv_dl=ib&inputT=1113`;
		const result = getQuery(url);
		expect(result.url).toEqual(target);
		expect(result.rsv_iqid).toEqual('0xabcf402e01cd47a9');
	});
});
