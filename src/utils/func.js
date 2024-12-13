export const throttle = (fn, wait = 300, immediate = true) => {
	let lock = false;
	const call = (...args) => {
		if (!lock) {
			lock = true;
			fn(...args);
			setTimeout(() => {
				lock = false;
			}, wait);
		}
	};
	if (immediate) return call;
	return (...args) => setTimeout(call, wait, ...args);
};

export const debounce = (fn, wait = 300, immediate = true) => {
	let timer;
	if (immediate) {
		let lock = false;
		return (...args) => {
			clearTimeout(timer);
			if (!lock) {
				lock = true;
				fn(...args);
			}
			timer = setTimeout(() => {
				lock = false;
			}, wait);
		};
	}
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(fn, wait, ...args);
	};
};

export const syncFetch = (fn) => {
	const oldFetch = window.fetch;
	const cache = {
		status: 'pending',
		data: null,
	};
	window.fetch = (...args) => {
		if (!cache.data) {
			const p = oldFetch(...args)
				.then((res) => res.json())
				.then((res) => {
					cache.status = 'fulfilled';
					cache.data = res;
					return cache;
				})
				.catch((e) => {
					cache.status = 'rejected';
					cache.data = e;
					return cache;
				});
			throw p;
		}
		return cache;
	};

	try {
		fn();
	} catch (error) {
		if (error instanceof Promise) {
			error.then(() => {
				const result = fn();
				window.fetch = oldFetch;
				return result;
			});
		}
	}
};
