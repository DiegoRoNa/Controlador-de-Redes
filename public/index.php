<?php 

/*ESTE ARCHIVO SE ENCARGA DE EJECUTAR INTERNAMENTE LOS CONTROLADORES, MODELOS Y VISTAS
A TRAVÉS DEL ROUTER QUE CONTIENE LAS RUTAS DE LA WEB */

//INCLUIR BD, AUTOLOAD, FUNCIONES Y HERLPERS
require_once __DIR__ . '/../includes/app.php';

use Controllers\ApiController;
use Controllers\DashboardController;
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

//CONFIRMAR CUENTA
$router->get('/confirm', [LoginController::class, 'confirm']);

//PRIVADA
//Zona de proyectos DASHBOARD
$router->get('/controller', [DashboardController::class, 'index']);
$router->get('/network', [DashboardController::class, 'network']);
$router->get('/admins', [DashboardController::class, 'admins']);

//RUTAS PARA LA API
$router->get('/api/networks', [ApiController::class, 'select_networks']);
$router->post('/api/network', [ApiController::class, 'create_networks']);
$router->post('/api/network/update', [ApiController::class, 'update_networks']);
$router->post('/api/network/delete', [ApiController::class, 'delete_networks']);

$router->get('/api/ips', [ApiController::class, 'select_ips']);
$router->post('/api/host', [ApiController::class, 'create_host']);

$router->get('/api/admins', [ApiController::class, 'select_admins']);
$router->post('/api/admin', [ApiController::class, 'create_admins']);
$router->post('/api/admin/update', [ApiController::class, 'update_admins']);
$router->post('/api/admin/delete', [ApiController::class, 'delete_admins']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();