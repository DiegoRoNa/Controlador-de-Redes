<?php 

namespace Controllers;

use MVC\Router;

class DashboardController{

    //  /controller
    public static function index(Router $router){

        //VERIFICAR QUE ESTE AUTENTICADO EL USUARIO
        isAuth();

        $router->render('dashboard/index', [
            'titulo' => 'Controlador'
        ]);
    }

    //  /users
    public static function users(Router $router){
        //VERIFICAR QUE ESTE AUTENTICADO EL USUARIO
        isAuth();
        
        $router->render('dashboard/users', [
            'titulo' => 'Usuarios'
        ]);
    }
}
