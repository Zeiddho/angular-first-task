import {Component, EventEmitter, Input, Output} from "@angular/core";
import {TodosListInterface} from "../todos-list.interface";

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  styleUrl: 'todo-card.component.scss',
  standalone: true,
})

export class TodoCardComponent {
  @Input()
  todo!: TodosListInterface;

  @Output()
  deleteTodo = new EventEmitter;/*repeatrepeatrepeatrepeat*/

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId)
  }
}
