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
		children: [
			{ path: '', name: 'ADMIN', component: Views.AdminPage },
			{ path: 'te', name: 'TEPage', component: Admin.TEPage },
			{ path: 'errors', name: 'ErrorsPage', component: Admin.ErrorsPage },
			{ path: 'values', name: 'ValuePage', component: Admin.ValuePage },
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
