import { inject, Injectable } from '@angular/core';
import { Todo } from '../../models/Todo.model';
import { todoList } from '../../mockups/todo.mockup';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    http = inject(HttpClient);
    // todos: Todo[] = [...todoList];
    loadTodos = () => {
      return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    }
}
