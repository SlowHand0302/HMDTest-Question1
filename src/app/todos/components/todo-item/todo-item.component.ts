import { Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../../../../models/Todo.model';

@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [MatButtonModule, MatCheckboxModule],
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css', '../../todos.component.css'],
})
export class TodoItemComponent {
    todo = input.required<Todo>();
    onCheckboxClicked = output<Todo>();
    onDeleteButtonClicked = output<number>();
    onEditButtonClickedd = output<Todo>();
}
