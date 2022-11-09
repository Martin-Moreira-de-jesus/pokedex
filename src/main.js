import {createApp} from "vue";
import App from "./App.vue";
import "@/assets/custom.css";
import "bootstrap/dist/js/bootstrap.js";
import router from '@/services/router';

createApp(App).use(router).mount("#app");
