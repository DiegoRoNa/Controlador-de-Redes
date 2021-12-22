<?php

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