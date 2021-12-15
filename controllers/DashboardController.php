<?php 

namespace Controllers;

use MVC\Router;

class DashboardController{

    //  /controller
    public static function index(Router $router){
        $router->render('dashboard/index', [
            'titulo' => 'Controlador'
        ]);
    }

    //  /users
    public static function users(Router $router){
        $router->render('dashboard/users', [
            'titulo' => 'Usuarios'
        ]);
    }
}
