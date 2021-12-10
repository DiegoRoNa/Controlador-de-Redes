<?php 
//ARCHIVO PRINCIPAL QUE MANDA LLAMAR FUNCIONES Y CLASES

require 'funciones.php';//Funciones
require 'database.php';//Conexion de la BD
require __DIR__ . '/../vendor/autoload.php';//Autoload de composer

// Conectarnos a la base de datos
//ACTIVE RECORD ES LA CLASE PADRE, HEREDARÁ A TODAS LAS CLASES HIJAS LA CONEXION A LA BD
use Model\ActiveRecord;
ActiveRecord::setDB($db);