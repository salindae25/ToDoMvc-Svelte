import type { Todo } from '$lib/types';

export function uuid(): string {
	let i, random;
	let uuid = '';

	for (i = 0; i < 32; i++) {
		random = (Math.random() * 16) | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
	}

	return uuid;
}

export function pluralize(count: number, word: string): string {
	return count === 1 ? word : word + 's';
}

export const TODO_STATES = {
	ALL_TODOS: 'all',
	ACTIVE_TODOS: 'active',
	COMPLETED_TODOS: 'completed'
};

export function classNames(classObj = {}): string {
	const cssClasses = Object.keys(classObj);
	if (cssClasses.length === 0) return '';
	const activeClasses = cssClasses.map((classItem) => {
		if (classObj[classItem]) return classItem;
		return '';
	});
	return activeClasses.join(' ');
}

export function findActiveState(location): string {
	console.log(location.hash);
	switch (location.hash) {
		case '#':
			return TODO_STATES.ALL_TODOS;
		case '#active':
			return TODO_STATES.ACTIVE_TODOS;
		case '#completed':
			return TODO_STATES.COMPLETED_TODOS;

		default:
			return TODO_STATES.ALL_TODOS;
	}
	return TODO_STATES.COMPLETED_TODOS;
}

export function filterTodo(todos: Todo[], type = 'all'): Todo[] {
	switch (type) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter((todo) => !todo.completed);
		case 'completed':
			return todos.filter((todo) => todo.completed);
		default:
			return todos;
	}
	return todos;
}

export function retrieveValueFromLocalStorage(namespace: string): any {
	const store = localStorage.getItem(namespace);
	return (store && JSON.parse(store)) || [];
}
