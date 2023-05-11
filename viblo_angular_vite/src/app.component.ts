import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import angular from 'angular';

var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'dndLists']);

app.controller('kanBanCtrl', kanBanCtrl);

function kanBanCtrl() {
  const ctrl = this;
  ctrl.taskList = [
    {
      tasks: [
        { name: 'Task 1', selected: false },
        { name: 'Task 2', selected: false },
        { name: 'Task 3', selected: false },
      ],
      label: 'TO DO',
      class: 'info',
      dragging: false,
    },
    {
      tasks: [
        { name: 'Task 4', selected: false },
        { name: 'Task 5', selected: false },
        { name: 'Task 6', selected: false },
      ],
      label: 'DOING',
      class: 'primary',
      dragging: false,
    },
    {
      tasks: [
        { name: 'Task 7', selected: false },
        { name: 'Task 8', selected: false },
        { name: 'Task 9', selected: false },
      ],
      label: 'PENDING',
      class: 'warning',
      dragging: false,
    },
    {
      tasks: [
        { name: 'Task 10', selected: false },
        { name: 'Task 13', selected: false },
        { name: 'Task 12', selected: false },
      ],
      label: 'DONE',
      class: 'success',
      dragging: false,
    },
  ];
  console.log('Hello World!');

  // Hàm này sẽ xử lý việc gán trường *selected* của phần tử đang được dragged bằng true, và lấy các phần tử khác đang được select (selected = true) để thực hiện drop.
  ctrl.getSelectedTasksIncluding = function (list, task) {
    task.selected = true;
    return _.filter(list.tasks, ['selected', true]);
  };

  // Hàm này sẽ gán trường *dragging* của list có phần tử đang được dragged bằng true.
  ctrl.onDragstart = function (list, event) {
    list.dragging = true;
  };

  // Hàm này sẽ gán trường *selected* của tất cả các phần tử trong mảng thành false
  // Thường thì khi chúng ta drag, các phần tử được dragged sẽ có trường *selected* bằng true, vì thế sau khi drop, chúng ta phải gán lại trường *selected* của các phần tử đó bằng false.
  // Sau đó chúng ta sẽ thực hiện việc thêm các phần tử được dragged đó vào list mới.
  // Ở đây index chính là vị trí mà chúng ta drop vào trong mảng, vì vậy để chèn các phần tử đó vào chúng ta sẽ thực hiện như bên dưới.
  ctrl.onDrop = function (list, tasks, index) {
    _.forEach(tasks, function (task) {
      task.selected = false;
    });
    list.tasks = list.tasks.slice(0, index).concat(tasks).concat(list.tasks.slice(index));
    return true;
  };

  // Như mình đã giải thích ở trên, hàm này sẽ có tác dụng loại bỏ phần tử đang được dragged, bằng cách loại bỏ những phần tử có trường *selected* bằng true.
  ctrl.onMoved = function (list) {
    list.tasks = _.filter(list.tasks, ['selected', false]);
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="main-page">
      <p>hello, this is angular, avite</p>
      <a routerLink="/" href="#" class="text-xl font-bold no-underline hover:underline ...">
        Home |
      </a>
      <a routerLink="/about" href="#" class="text-xl font-bold no-underline hover:underline ...">
        About us
      </a>
      <hr />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
