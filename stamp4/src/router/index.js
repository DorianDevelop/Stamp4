import { createRouter, createWebHistory } from 'vue-router';

import * as Views from '@/views';
import * as Admin from '@/views/AdminViews';
import * as Produit from '@/views/ProduitViews';
import * as Analyse from '@/views/AnalyseViews';

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
			{ path: 'cibles', name: 'Cibles', component: Admin.TargetPage },
			{ path: 'fonctions', name: 'Fonctions', component: Admin.FunctionPage },
			{ path: 'organs', name: 'Organs', component: Admin.OrganPage },
			{ path: 'actions', name: 'Actions', component: Admin.ActionPage },
		],
	},
	{
		path: '/produit',
		name: 'Produit',
		children: [
			{ path: '', name: 'Produit', component: Views.ProduitPage },
			{ path: 'gammes', name: 'Gammes', component: Produit.GammePage },
			{ path: 'uuts', name: 'UUT', component: Produit.UUTPage },
			{ path: 'specs', name: 'Spec', component: Produit.SpecPage },
			{ path: 'sequences', name: 'Sequences', component: Produit.SequencePage },
		],
	},
	{
		path: '/analyse',
		name: 'Analyse',
		children: [
			{ path: '', name: 'Analyse', component: Views.AnalysePage },
			{ path: 'analyses', name: 'Analyses', component: Analyse.AnalysePage },
			{ path: 'reports', name: 'Reports', component: Analyse.ReportPage },
		],
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
