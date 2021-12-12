import { writable } from 'svelte/store';
import type { Todo } from '$lib/types';
import { retrieveValueFromLocalStorage } from '$lib/Utils';

const INITIAL_STATE = retrieveValueFromLocalStorage('todoState') || [];

function CreateTodoStore() {
	const { subscribe, set, update } = writable(INITIAL_STATE);

	const updateLocalStorage = (data) => {
		localStorage.setItem('todoState', JSON.stringify(data));
	};
	const addToStore = (data) => {
		update((todos) => {
			const todoState = [...todos, data];
			updateLocalStorage(todoState);
			return todoState;
		});
	};
	const mutateStore = (data: Todo) => {
		update((todos) => {
			const todoState = todos.map((todo: Todo) => {
				return todo.id === data.id ? { ...data } : { ...todo };
			});
			updateLocalStorage(todoState);
			return todoState;
		});
	};
	const deleteFromStore = (data: Todo) => {
		update((todos) => {
			const todoState = todos.filter((todo: Todo) => {
				return todo.id !== data.id;
			});
			updateLocalStorage(todoState);
			return todoState;
		});
	};
	return {
		subscribe,
		addToStore,
		mutateStore,
		deleteFromStore
	};
}

export const todos = CreateTodoStore();
