<?php 

namespace Controllers;

use Model\Network;
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

        //VALIDAR LA URL DE LA RED
        $url = $_GET['id']; //url de la RED
        if(!$url) header('Location: /controller');

        //VALIDAR QUE LA URL ES DE LA RED
        $network = Network::where('url', $url);
        if(!$network) header('Location: /controller');

        $router->render('dashboard/network', [
            'titulo' => $network->network,
            'titulo_ip' => $network->fi_octet.'.'.$network->s_octet.'.'.$network->t_octet.'.'.$network->fo_octet
        ]);
    }

    //  /admins
    public static function admins(Router $router){
        //VERIFICAR QUE ESTE AUTENTICADO EL USUARIO
        isAuth();

        //VALIDAR QUE EL ROLE ES DE SUPER ADMINISTRADOR
        if($_SESSION['role'] !== 's_admin') header('Location: /');

        $router->render('dashboard/admin', [
            'titulo' => 'Administradores'
        ]);
    }
}
