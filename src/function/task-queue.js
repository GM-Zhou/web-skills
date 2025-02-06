/**
 * 可中断和恢复执行的任务队列
 */
class TaskQueue {
	constructor(tasks) {
		this.queue = tasks;
		this.results = [];
		this.isRunning = false;
		this.index = 0;
	}

	start = async () => {
		console.log('start');
		if (this.isRunning || !this.queue.length) return;
		this.isRunning = true;
		while (this.index < this.queue.length) {
			if (!this.isRunning) return this.results;
			console.log('this.index :>> ', this.index);
			const task = this.queue[this.index];
			const result = await task();
			this.results.push(result);
			this.index++;
		}
		this.isRunning = false;
		this.index = 0;
		return this.results;
	};

	pause = () => {
		console.log('pause');
		if (!this.isRunning || !this.queue.length) return;
		this.isRunning = false;
	};
}

const tasks = [];
for (let i = 0; i < 10; i++) {
	tasks.push(async () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`task ${i} done`);
			}, 500);
		});
	});
}
const queue = new TaskQueue(tasks);

setTimeout(() => {
	queue.pause();
	setTimeout(() => {
		queue.start().then((res) => console.log('res :>> ', res));
	}, 3000);
}, 2000);

queue.start().then((res) => console.log('res :>> ', res));
