import {createRouter, createWebHistory} from "vue-router";
import AppPokedex from "@/views/AppPokedex";
import AppPokedexEntry from "@/views/AppPokedexEntry";

const routes = [
    {
        path: '/pokedex',
        name: 'pokedex',
        component: AppPokedex,
        meta: {
            title: 'Pokédex',
        }
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
})

export default router;