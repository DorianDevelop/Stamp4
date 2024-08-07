import { createRouter, createWebHistory } from "vue-router";

import * as Views from "@/views";
import * as Admin from "@/views/AdminViews";
import * as Produit from "@/views/ProduitViews";
import * as Analyse from "@/views/AnalyseViews";
import * as Station from "@/views/StationViews";

import { getIfAdmin } from "@/helpers/utilities.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Views.HomePage,
  },
  {
    path: "/refused",
    name: "Refused",
    component: Admin.RefusedPage,
  },
  {
    path: "/personal",
    name: "Perso",
    component: Views.PersonalPage,
  },
  {
    path: "/admin",
    name: "A.D.M.I.N",
    children: [
      { path: "", name: "A.D.M.I.N", component: Views.AdminPage },
      { path: "te", name: "TE", component: Admin.TEPage },
      { path: "errors", name: "Erreurs", component: Admin.ErrorsPage },
      { path: "values", name: "Valeurs", component: Admin.ValuePage },
      { path: "cibles", name: "Cibles", component: Admin.TargetPage },
      { path: "fonctions", name: "Fonctions", component: Admin.FunctionPage },
      { path: "organs", name: "Organs", component: Admin.OrganPage },
      { path: "actions", name: "Actions", component: Admin.ActionPage },
    ],
    beforeEnter: async (to, from, next) => {
      const isAdmin = await getIfAdmin();
      if (!isAdmin) {
        next({ path: "/refused" });
      } else {
        next();
      }
    },
  },
  {
    path: "/produit",
    name: "Produit",
    children: [
      { path: "", name: "Produit", component: Views.ProduitPage },
      { path: "gammes", name: "Gammes", component: Produit.GammePage },
      { path: "uuts", name: "UUT", component: Produit.UUTPage },
      { path: "specs", name: "Spec", component: Produit.SpecPage },
      { path: "sequences", name: "Sequences", component: Produit.SequencePage },
    ],
  },
  {
    path: "/analyse",
    name: "Analyse",
    children: [
      { path: "", name: "Analyse", component: Views.AnalysePage },
      { path: "rapports", name: "Rapports", component: Analyse.RapportPage },
    ],
  },
  {
    path: "/station",
    name: "Station",
    children: [
      { path: "", name: "Station", component: Views.StationPage },
      { path: "plugins", name: "Plugins", component: Station.PluginPage },
      { path: "operateurs", name: "Opérateurs", component: Station.OpPage },
      { path: "ates", name: "Testeurs", component: Station.ATEPage },
      { path: "protocoles", name: "Protocoles", component: Station.ProtocolPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/stamp4"),
  routes,
});

export default router;
