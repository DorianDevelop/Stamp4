import { createRouter, createWebHistory } from 'vue-router';

import * as Views from '@/views';
import * as Admin from '@/views/AdminViews';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Views.HomePage,
	},
	{
		path: '/admin',
		name: 'A.D.M.I.N',
		children: [
			{ path: '', name: 'A.D.M.I.N', component: Views.AdminPage },
			{ path: 'te', name: 'TE', component: Admin.TEPage },
			{ path: 'errors', name: 'Erreurs', component: Admin.ErrorsPage },
			{ path: 'values', name: 'Valeurs', component: Admin.ValuePage },
			{ path: 'targets', name: 'Targets', component: Admin.TargetPage },
			{ path: 'functions', name: 'Functions', component: Admin.FunctionPage },
		],
	},
	{
		path: '/produit',
		name: 'Produit',
		component: Views.ProduitPage,
	},
	{
		path: '/analyse',
		name: 'Analyse',
		component: Views.AnalysePage,
	},
	{
		path: '/station',
		name: 'Station',
		component: Views.StationPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
