import Vue from 'vue';
import './common.css';
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify';

import kusoge from './themes/kusoge';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa'
    },
    theme: {
        dark: true,
        themes: {
            light: kusoge
        }
    }
});