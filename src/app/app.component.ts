import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatTableModule, MatButtonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}
