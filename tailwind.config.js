import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import 'flowbite';
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./node_modules/flowbite/**/*.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            colors:{
                "primaryPurple": "#42307D",
                "buttonLogin" : "#7963D9AB",
                "borderCard" : "#C8C6C6",
                "skyBlueSchedule" : "#C2E8FF87",
                "orangeShipped" : "#FFECC287",
                "mintGreenDelivered" : "#C2FFCA87",
                "activeMenuSidebar" : "#D9D9D940",
            },
        },
    },

    plugins: [
        forms, 
        require('flowbite/plugin'),
    ],
        
};
