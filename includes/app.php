<?php 
//ARCHIVO PRINCIPAL QUE MANDA LLAMAR FUNCIONES Y CLASES

require 'globales.php';
require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

use Model\ActiveRecord;
ActiveRecord::setDB($db);