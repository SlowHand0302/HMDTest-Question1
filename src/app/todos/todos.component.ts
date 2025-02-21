import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { todoList } from '../../mockups/todo.mockup';
import { Todo } from '../../models/Todo.model';
import { TodosService } from '../services/todos.service';

import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
@Component({
    selector: 'app-todos',
    standalone: true,
    imports: [MatTableModule, MatCardModule, MatButtonModule, MatCheckboxModule, TodoItemComponent],
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
    // todoService = inject(TodosService);
    readonly dialog = inject(MatDialog);
    todoItems = signal<Todo[]>([...todoList]);
    newTodo = signal<string>('');
    alertState = signal<boolean>(false);

    openAddDialog(): void {
        const dialogRef = this.dialog.open(TodoDialogComponent, {
            data: { type: 'Add' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.handleAddTodo(result.title, result.completed);
                console.log(result);
            }
        });
    }

    openEditDialog(todo: Todo): void {
        const dialogRef = this.dialog.open(TodoDialogComponent, {
            data: { type: 'Edit', todo },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.handleUpdateTodo(result)
            }
        });
    }

    handleAddTodo = (newTodo: string, completed: boolean) => {
        this.todoItems.update((prev) => [
            ...prev,
            { completed: completed, id: prev.length + 1, userId: 1, title: newTodo },
        ]);
        console.log(this.todoItems());
    };

    handleUpdateTodo = (todo: Todo) => {
        this.todoItems.update((prev) => prev.map((item) => (item.id === todo.id ? todo : item)));
    };

    handleDeleteTodo = (id: number) => {
        this.todoItems.update((prev) => prev.filter((item) => item.id !== id));
    };

    ngOnInit(): void {
        this.todoItems.set(todoList);
        console.log(this.todoItems());
    }
}
