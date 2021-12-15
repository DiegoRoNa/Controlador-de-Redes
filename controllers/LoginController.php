<?php 

namespace Controllers;

use Classes\Email;
use Model\User;
use MVC\Router;

class LoginController{

    //  /
    public static function index(Router $router){
        $_SESSION = [];

        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $user = new User($_POST);

            $alertas = $user->validateLogin();

            if (empty($alertas)) {
                //BUSCAR EL USUARIO EN LA BD CON EL CORREO
                $user = User::where('email', $user->email);

                //SI EL CORREO NO EXISTE
                if (!$user || $user->confirm === '0') {
                    User::setAlerta('error', 'No hay una cuena vinculada con este correo, o la cuenta no ha sido confirmada');
                }else{
                    //SI EXISTE EL CORREO
                    //VERIFICAR PASSWORD
                    if (!password_verify($_POST['password'], $user->password)) {
                        //CONTRASEÑA INCORRECTA
                        User::setAlerta('error', 'La contraseña es incorrecta');
                    }else{
                        //INICIAR LA SESION DEL USUARIO
                        //YA EXISTE LA SESION INICIADA DESDE Router.php
                        $_SESSION['id'] = $user->id;
                        $_SESSION['name'] = $user->name;
                        $_SESSION['surnames'] = $user->surnames;
                        $_SESSION['email'] = $user->email;
                        $_SESSION['role'] = $user->role;
                        $_SESSION['login'] = true;
  
                        //REDIRECCIONAR
                        header('Location: /controller');
                    }
                }                
            }
        }

        $alertas = User::getAlertas();

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
            $user = new User($_POST);

            $alertas = $user->validateEmail();

            if (empty($alertas)) {

                //BUSCAR AL USUARIO POR EL CORREO
                $user = User::where('email', $user->email);

                //VERIFICAR QUE EXISTE EL USUARIO Y QUE LA CUENTA ESTÁ CONFIRMADA
                if ($user && $user->confirm === '1') {
                    //GENERAR TOKEN
                    $user->createToken();

                    //ELIMINAR PASSWORD2 DEL OBJETO
                    unset($user->password2);

                    //ACTUALIZAR EN LA BD EL TOKEN
                    $user->guardar();

                    //ENVIAR EMAIL
                    $email = new Email($user->email, $user->name, $user->token);
                    $email->enviarInstrucciones();

                    //ENVIAR MENSAJE DE EXITO
                    User::setAlerta('exito', 'Hemos enviado las instrucciones al correo electrónico para confirmar la cuenta');

                }else{
                    User::setAlerta('error', 'Hubo un error, no hay una cuenta vinculada con este correo o la cuenta no ha sido confirmada');
                    
                }

            }
        }

        $alertas = User::getAlertas();

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
        $user = User::where('token', $token);
        if (empty($user)) {
            //si no existe el token
            User::setAlerta('error', 'Token no válido');
            $mostrar = false; //quitamos el formulario
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            //SINCRONIZAR EL OBJETO CON LA BD
            $user->sincronizar($_POST);

            //VALIDAR EL FORMULARIO
            $alertas = $user->validatePasswords();

            if (empty($alertas)) {
                //HASHEAR EL PASSWORD
                $user->hashPassword();

                //ELIMINAR PASSWORD2 DEL OBJETO, YA QUE ACTIVE RECORD TRABAJA CON UN ESPEJO DE LA TABLA EN LA DB
                unset($user->password2);

                //ELIMINAR EL TOKEN
                $user->token = null;

                //GUARDAR EN LA BD
                $resultado = $user->guardar();

                //REDIRECCIONAR
                if ($resultado) {
                    
                    header('Location: /');
                }
            }
        }

        $alertas = User::getAlertas();

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

            $user = new User($_POST);

            if (empty($alertas)) {
                //COMPROBAR QUE EL CORREO NO EXISTE EN LA BD
                $userExists = User::where('email', $user->email);

                if ($userExists) {
                    var_dump('Ya existe');
                    exit;
                }else{
                    //HASHEAR PASSWORD
                    $user->hashPassword();

                    //ELIMINAR PASSWORD2 DEL OBJETO, YA QUE ACTIVE RECORD TRABAJA CON UN ESPEJO DE LA TABLA EN LA DB
                    unset($user->password2);

                    //GENERAR EL TOKEN
                    //$user->createToken();

                    //GUARDAR EN LA BD
                    $resultado = $user->guardar();

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
