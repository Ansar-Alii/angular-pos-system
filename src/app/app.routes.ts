import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { tenantGuard } from './core/guards/tenant.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent) },
  {
    path: 'tenant',
    canActivate: [authGuard, tenantGuard],
    children: [
      {
        path: ':tenantId',
        children: [
          { path: 'pos', loadComponent: () => import('./features/pos/pos.component').then(m => m.PosComponent), data: { title: 'POS Terminal' } },
          { path: 'inventory', loadComponent: () => import('./features/inventory/inventory.component').then(m => m.InventoryComponent), data: { title: 'Inventory' } },
          { path: 'customers', loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent), data: { title: 'Customers' } },
          { path: 'reports', loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent), data: { title: 'Reports' } },
          { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent), data: { title: 'Settings' } }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'auth' }
];
