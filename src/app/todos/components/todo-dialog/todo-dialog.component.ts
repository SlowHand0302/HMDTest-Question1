import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { Todo } from '../../../../models/Todo.model';

export interface TodoDialogData {
    type: string;
    todo?: Todo;
}

@Component({
    selector: 'app-todo-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
    ],
    templateUrl: './todo-dialog.component.html',
    styleUrls: ['./todo-dialog.component.css', '../../todos.component.css'],
})
export class TodoDialogComponent {
    readonly dialogRef = inject(MatDialogRef<TodoDialogComponent>);
    readonly data = inject<TodoDialogData>(MAT_DIALOG_DATA);

    todoForm = new FormGroup({
        title: new FormControl(this.data.todo?.title, [Validators.required]),
        completed: new FormControl(this.data.todo?.completed || false),
    });

    onSubmit = () => {
        if (this.data) {
            this.dialogRef.close({
                ...this.data.todo,
                title: this.todoForm.value.title,
                completed: this.todoForm.value.completed,
            });
            return;
        }
        this.dialogRef.close(this.todoForm.value);
    };

    onNoClick(): void {
        console.log(this.todoForm.value);
        this.dialogRef.close();
    }
}
