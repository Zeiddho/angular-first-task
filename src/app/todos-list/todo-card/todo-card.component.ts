import {Component, EventEmitter, Input, Output} from "@angular/core";
import {TodosListInterface} from "../../interfaces/todos-list.interface";
import {StringLengthTransformPipe} from "../../pipes/string-length-transform.pipe";

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  styleUrl: 'todo-card.component.scss',
  standalone: true,
  imports: [StringLengthTransformPipe]
})

export class TodoCardComponent {
  @Input()
  todo!: TodosListInterface;

  @Output()
  deleteTodo = new EventEmitter;

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId)
  }
}
