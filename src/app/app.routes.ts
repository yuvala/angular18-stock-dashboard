import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TablesComponent } from './pages/tables/tables.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' }, // Default redirect
  { path: 'tables', component: TablesComponent },
  { path: '**', redirectTo: 'tables' } // Wildcard redirect for unknown routes
];

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)]
// });
