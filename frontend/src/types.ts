
export interface ITask {
	_id: string,
	title: string,
}

export interface ISubTask {
	_id: string,
	taskId: string,
	title: string,
}
