<?php 

/*ESTE ARCHIVO SE ENCARGA DE EJECUTAR INTERNAMENTE LOS CONTROLADORES, MODELOS Y VISTAS
A TRAVÉS DEL ROUTER QUE CONTIENE LAS RUTAS DE LA WEB */

//INCLUIR BD, AUTOLOAD, FUNCIONES Y HERLPERS
require_once __DIR__ . '/../includes/app.php';

use Controllers\LoginController;
use MVC\Router;
$router = new Router();

//RUTAS

//LOGIN
$router->get('/', [LoginController::class, 'index']);
$router->post('/', [LoginController::class, 'index']);
$router->get('/logout', [LoginController::class, 'logout']);

//OLVIDÉ CONTRASEÑA
$router->get('/forgot_password', [LoginController::class, 'forgot_password']);
$router->post('/forgot_password', [LoginController::class, 'forgot_password']);

//COLOCAR NUEVO PASSWORD
$router->get('/reestablish', [LoginController::class, 'reestablish']);
$router->post('/reestablish', [LoginController::class, 'reestablish']);

//NUEVO USUARIO (TEMPORAL)
$router->get('/register', [LoginController::class, 'register']);
$router->post('/register', [LoginController::class, 'register']);


//PRIVADA
//Zona de proyectos DASHBOARD


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();