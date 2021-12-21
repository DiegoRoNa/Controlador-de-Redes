<?php 

namespace Controllers;

use Classes\Email;
use Model\Admin;
use MVC\Router;

class LoginController{

    //  /
    public static function index(Router $router){

        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $admin = new Admin($_POST);

            $alertas = $admin->validateLogin();

            if (empty($alertas)) {
                //BUSCAR EL USUARIO EN LA BD CON EL CORREO
                $admin = Admin::where('email', $admin->email);

                //SI EL CORREO NO EXISTE
                if (!$admin || $admin->confirm === '0') {
                    Admin::setAlerta('error', 'No hay una cuena vinculada con este correo, o la cuenta no ha sido confirmada');
                }else{
                    //SI EXISTE EL CORREO
                    //VERIFICAR PASSWORD
                    if (!password_verify($_POST['password'], $admin->password)) {
                        //CONTRASEÑA INCORRECTA
                        Admin::setAlerta('error', 'La contraseña es incorrecta');
                    }else{
                        //INICIAR LA SESION DEL USUARIO
                        //YA EXISTE LA SESION INICIADA DESDE Router.php
                        $_SESSION['id'] = $admin->id;
                        $_SESSION['name'] = $admin->name;
                        $_SESSION['surnames'] = $admin->surnames;
                        $_SESSION['email'] = $admin->email;
                        $_SESSION['role'] = $admin->role;
                        $_SESSION['login'] = true;
  
                        //REDIRECCIONAR
                        header('Location: /controller');
                    }
                }                
            }
        }

        $alertas = Admin::getAlertas();

        $router->render('login/index', [
            'titulo' => 'Iniciar sesión',
            'alertas' => $alertas
        ]);
    }

    //  /logout
    public static function logout(){
        //VACIAR LA SESION
        $_SESSION = [];

        header('Location: /');
    }

    //  /forgot_password
    public static function forgot_password(Router $router){
        $_SESSION = [];
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $admin = new Admin($_POST);

            $alertas = $admin->validateEmail();

            if (empty($alertas)) {

                //BUSCAR AL USUARIO POR EL CORREO
                $admin = Admin::where('email', $admin->email);

                //VERIFICAR QUE EXISTE EL USUARIO Y QUE LA CUENTA ESTÁ CONFIRMADA
                if ($admin && $admin->confirm === '1') {
                    //GENERAR TOKEN
                    $admin->createToken();

                    //ELIMINAR PASSWORD2 DEL OBJETO
                    unset($admin->password2);

                    //ACTUALIZAR EN LA BD EL TOKEN
                    $admin->guardar();

                    //ENVIAR EMAIL
                    $email = new Email($admin->email, $admin->name, $admin->token);
                    $email->enviarInstrucciones();

                    //ENVIAR MENSAJE DE EXITO
                    Admin::setAlerta('exito', 'Hemos enviado las instrucciones al correo electrónico para confirmar la cuenta');

                }else{
                    Admin::setAlerta('error', 'Hubo un error, no hay una cuenta vinculada con este correo o la cuenta no ha sido confirmada');
                    
                }

            }
        }

        $alertas = Admin::getAlertas();

        $router->render('login/forgot_password', [
            'titulo' => 'Olvidaste tu contraseña',
            'alertas' => $alertas
        ]);
    }

    //  /reestablish
    public static function reestablish(Router $router){
        $_SESSION = [];
        $alertas = [];
        $mostrar = true;

        //VERIFICAR EL TOKEN
        $token = s($_GET['token']);
        if(!$token) header('Location: /');

        //VERIFICAR QUE EL TOKEN SEA EL DEL USUARIO
        $admin = Admin::where('token', $token);
        if (empty($admin)) {
            //si no existe el token
            Admin::setAlerta('error', 'Token no válido');
            $mostrar = false; //quitamos el formulario
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            //SINCRONIZAR EL OBJETO CON LA BD
            $admin->sincronizar($_POST);

            //VALIDAR EL FORMULARIO
            $alertas = $admin->validatePasswords();

            if (empty($alertas)) {
                //HASHEAR EL PASSWORD
                $admin->hashPassword();

                //ELIMINAR PASSWORD2 DEL OBJETO, YA QUE ACTIVE RECORD TRABAJA CON UN ESPEJO DE LA TABLA EN LA DB
                unset($admin->password2);

                //ELIMINAR EL TOKEN
                $admin->token = null;

                //GUARDAR EN LA BD
                $resultado = $admin->guardar();

                //REDIRECCIONAR
                if ($resultado) {
                    
                    header('Location: /');
                }
            }
        }

        $alertas = Admin::getAlertas();

        $router->render('login/reestablish', [
            'titulo' => 'Reestablecer contraseña',
            'alertas' => $alertas,
            'mostrar' => $mostrar
        ]);
    }

    //  /register
    public static function register(Router $router){
        $_SESSION = [];
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $admin = new Admin($_POST);

            if (empty($alertas)) {
                //COMPROBAR QUE EL CORREO NO EXISTE EN LA BD
                $adminExists = Admin::where('email', $admin->email);

                if ($adminExists) {
                    var_dump('Ya existe');
                    exit;
                }else{
                    //HASHEAR PASSWORD
                    $admin->hashPassword();

                    //ELIMINAR PASSWORD2 DEL OBJETO, YA QUE ACTIVE RECORD TRABAJA CON UN ESPEJO DE LA TABLA EN LA DB
                    unset($admin->password2);

                    //GENERAR EL TOKEN
                    //$admin->createToken();

                    //GUARDAR EN LA BD
                    $resultado = $admin->guardar();

                    //REDIRECCIONAR
                    if ($resultado) {
                        header('Location: /');
                    }

                }
            }
            
        }

        $router->render('login/register', [
            'titulo' => 'Registrar usuario',
            'alertas' => $alertas
        ]);
    }
}
