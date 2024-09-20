const wd = {};
wd.fetch = fetch;

const request = () => {
  return wd.fetch('https://jsonplaceholder.typicode.com/todos/1');
};

const r1 = () => {
  console.log('执行了');
  const data = request();
  return data;
};

const r2 = () => {
  return r1();
};

const mount = () => {
  const data = r2();
  console.log('data', data);
};

const sync = (fn) => {
  const oldFetch = wd.fetch;
  const cache = {
    status: 'pending',
    data: null,
  };
  wd.fetch = (...args) => {
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
        fn();
        wd.fetch = oldFetch;
      });
    }
  }
};

sync(mount);
