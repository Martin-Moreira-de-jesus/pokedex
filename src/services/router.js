import {createRouter, createWebHistory} from "vue-router";
import AppPokedex from "@/views/AppPokedex";
import AppPokedexEntry from "@/views/AppPokedexEntry";

const DEFAULT_TITLE = 'Pokédex'

const routes = [
    {
        path: '/pokedex',
        name: 'pokedex',
        component: AppPokedex,
    },
    {
        path: '/pokedex/:id',
        name: 'pokedex-entry',
        component: AppPokedexEntry,
        meta: {
            title: '',
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
