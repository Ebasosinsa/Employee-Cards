import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersComponent } from './components/pages/workers/workers.component';
import { SelectionComponent } from './components/pages/selection/selection.component';
import { ToolkitComponent } from './components/pages/toolkit/toolkit.component';
import { WorkerProfileComponent } from './components/pages/workers/worker-profile/worker-profile.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  /* Главная страница картотеки */
  {
    path: '',
    component: WorkersComponent,
  },
  /* Страница с выборками из картотеки */
  {
    path: 'selection',
    component: SelectionComponent,
  },
  /* Страница инструментария компании */
  {
    path: 'toolkit',
    component: ToolkitComponent,
  },
  /* Страница профиля сотрудника */
  {
    path: 'profile/:id',
    component: WorkerProfileComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
