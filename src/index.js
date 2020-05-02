import { pantalla1 } from './compenentes/pantalla1.js';
function router(route){
    switch(route){
        default:
            pantalla1();
            break;
    }
}
router();
