<?php
//ESTE ARCHIVO CONTIENE TODAS LAS RUTAS DE LA WEB

namespace MVC;

class Router
{
    //Necesitan ser arreglos para la funcion get o post
    public array $getRoutes = [];
    public array $postRoutes = [];

    //TODAS LAS URL QUE REACCIONAN AL MÉTODO GET
    public function get($url, $fn)//URL Y FUNCION ASICIADA A LA URL
    {
        $this->getRoutes[$url] = $fn;
    }

    //TODAS LAS URL QUE REACCIONAN AL MÉTODO POST
    public function post($url, $fn)//URL Y FUNCION ASICIADA A LA URL
    {
        $this->postRoutes[$url] = $fn;
    }
    
    //COMPROBACION SI EXISTEN LAS RUTAS/URL
    public function comprobarRutas()
    {

        // Iniciar sesion y Proteger Rutas...
        session_start();

        $currentUrl = $_SERVER['PATH_INFO'] ?? '/';//ruta actual de la URL
        $method = $_SERVER['REQUEST_METHOD'];//metodo
        
        //SI EL METODO ES GET
        if ($method === 'GET') {
            $fn = $this->getRoutes[$currentUrl] ?? null;//fn será la funcion de esta RUTA GET
        } else {
            $fn = $this->postRoutes[$currentUrl] ?? null;//fn será la funcion de esta RUTA POST
        }


        //si existe la funcion
        if ( $fn ) {
            //permite usar una funcion que no sabemos como se llamará
            // Call user fn va a llamar una función cuando no sabemos cual sera
            //recive la funcion callback a ejeutar y el objeto Router
            call_user_func($fn, $this); // This es para pasar argumentos
        } else {
            echo "Página No Encontrada o Ruta no válida";
        }
    }

    //MOSTRAR VISTAS
    public function render($view, $datos = [])//vista y variables para la vista
    {

        //Iterar el arreglo de datos que se pasarán a la vista correspondiente
        foreach ($datos as $key => $value) {
            $$key = $value;  // Doble signo de dolar significa: variable variable, básicamente nuestra variable sigue siendo la original, pero al asignarla a otra no la reescribe, mantiene su valor, de esta forma el nombre de la variable se asigna dinamicamente
        }

        //USAMOS LA VISTA MASTER layout.php PARA IR CAMBIANDO EL CONTENIDO DE LAS VISTAS
        //INICIAR UN ALMACENAMIENTO EN MEMORIA, MOMENTANEAMENTE LA VISTA SE ENCUENTRA EN MEMORIA
        ob_start(); // Almacenamiento en memoria durante un momento...

        //VISTA MASTER, $contenido, se pasa a esa vista
        // entonces incluimos la vista en el layout
        include_once __DIR__ . "/views/$view.php";

        //LIMPIAR MEMORIA, LA VISTA EN MEMORIA PASA A ESTA VARIABLE $contenido
        $contenido = ob_get_clean(); // Limpia el Buffer
        include_once __DIR__ . '/views/layout.php';
    }
}
