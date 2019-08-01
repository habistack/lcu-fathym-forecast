import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { BuilderPage } from './pages/builder/builder.page';
import { SolutionsRoutes, SolutionsRoutingComponents } from './pages/solutions/solutions.router';

const routes: Routes = [
  // {
  //   path: "solutions",
  //   loadChildren: "./pages/solutions/solutions.module#SolutionsModule"
  // },
  ...SolutionsRoutes,
	{
		path: '**',
		component: BuilderPage,
		runGuardsAndResolvers: 'always'
	},
];

export var RoutingComponents: any[] = [
  BuilderPage,
  ...SolutionsRoutingComponents
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class AppRouterModule {
}
