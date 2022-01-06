<?php

function getPathInfo() {
    //SI EXISTE PATH INFO RETORNALO
    if (isset($_SERVER['PATH_INFO'])) {
        return $_SERVER['PATH_INFO'];
        exit;
    }  

    //ASIGNAMOS REQUEST_URI A PATH_INFO
    $script_uri = $_SERVER["REQUEST_URI"];
    $_SERVER["PATH_INFO"] = $script_uri;

    $pathinfo = $_SERVER["PATH_INFO"];

    //VALIDAR SI LA URL TRAE PARAMETROS GET O QUERY_STRING
    if (empty($_SERVER['QUERY_STRING'])) {
        return $pathinfo;
    }else{
        $put = explode("?", $pathinfo);//DIVIDIR PATH_INFO EN 2 ([0], [1])
        $pathinfo = $put[0];//TOMAR LA PRIMERA PARTE Y RETORNARLO COMO PATH_INFO
        return $pathinfo;
    }
}

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
//USAR EN DATOS QUE VIENEN DESDE LA URL
//USAR EN LOS VALORES DE UN INPUT AL MOMENTO DE EDITAR INFORMACION SOBRE UN FORMULARIO
function s($html) : string {
    $s = htmlspecialchars($html);//sanitiza el HTML
    return $s;
}

// Función que revisa que el usuario este autenticado
function isAuth() : void {
    if(!isset($_SESSION['login'])) {
        header('Location: /');
    }
}

//Funcion para mostrar el tipo de role del admin
function role($role){
    $admin = '';
    if ($role === 's_admin') {
        $admin = 'Super administrador';
    }elseif ($role === 'admin') {
        $admin = 'Administrador';
    }else{
        $admin = 'Invitado';
    }

    return $admin;
}
