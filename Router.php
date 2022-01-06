<?php
//ESTE ARCHIVO CONTIENE TODAS LAS RUTAS DE LA WEB

namespace MVC;

class Router
{
    public array $getRoutes = [];
    public array $postRoutes = [];

    public function get($url, $fn)
    {
        $this->getRoutes[$url] = $fn;
    }

    public function post($url, $fn)
    {
        $this->postRoutes[$url] = $fn;
    }
    
    //COMPROBACION SI EXISTEN LAS RUTAS/URL
    public function comprobarRutas()
    {
        
        // Iniciar sesion y Proteger Rutas...
        session_start();

        $currentUrl = getPathInfo() ?? '/';
        $method = $_SERVER['REQUEST_METHOD'];
        
        if ($method === 'GET') {
            $fn = $this->getRoutes[$currentUrl] ?? null;//fn será la funcion de esta RUTA GET
        } else {
            $fn = $this->postRoutes[$currentUrl] ?? null;//fn será la funcion de esta RUTA POST
        }

        //si existe la funcion
        if ( $fn ) {
            call_user_func($fn, $this);
        } else {
            echo "Página No Encontrada o Ruta no válida";
        }
    }

    //MOSTRAR VISTAS
    public function render($view, $datos = [])
    {
        foreach ($datos as $key => $value) {
            $$key = $value;
        }

        ob_start(); // Almacenamiento en memoria durante un momento...

        include_once __DIR__ . "/views/$view.php";
        $contenido = ob_get_clean(); // Limpia el Buffer
        include_once __DIR__ . '/views/layout.php';
    }
}
