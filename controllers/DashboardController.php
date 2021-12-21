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

    //  /network
    public static function network(Router $router){

        //VERIFICAR QUE ESTE AUTENTICADO EL USUARIO
        isAuth();

        $router->render('dashboard/network', [
            'titulo' => 'Controlador - Red'
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
