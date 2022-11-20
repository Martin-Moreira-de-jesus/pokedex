import {createRouter, createWebHistory} from "vue-router";
import AppPokedex from "@/views/AppPokedex";
import AppPokedexEntry from "@/views/AppPokedexEntry";
import AppNotFound from "@/views/AppNotFound";

const DEFAULT_TITLE = 'Pokédex'

const routes = [
    {
        path: '/',
        name: 'pokedex',
        component: AppPokedex,
    },
    {
        path: '/:id',
        name: 'pokedex-entry',
        component: AppPokedexEntry,
        meta: {
            title: '',
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: AppNotFound,
        meta: {
            title: 'Not Found',
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
