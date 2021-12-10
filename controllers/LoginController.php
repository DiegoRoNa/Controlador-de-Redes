<?php 

namespace Controllers;

use Model\User;
use MVC\Router;

class LoginController{

    //  /
    public static function index(Router $router){
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user = new User($_POST);

            $alertas = $user->validateLogin();
        }

        $router->render('login/index', [
            'titulo' => 'Iniciar sesión',
            'alertas' => $alertas
        ]);
    }

    //  /forgot_password
    public static function forgot_password(Router $router){
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user = new User($_POST);

            $alertas = $user->validateEmail();
        }

        $router->render('login/forgot_password', [
            'titulo' => 'Olvidaste tu contraseña',
            'alertas' => $alertas
        ]);
    }
}
