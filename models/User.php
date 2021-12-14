<?php 

namespace Model;

class User extends ActiveRecord{
    //TABLA Y COLUMNAS DE LA BD
    protected static $tabla = 'users';
    protected static $columnasDB = ['id', 'name', 'surnames', 'email', 'password', 'role', 'token', 'confirm'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->surnames = $args['surnames'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        //$this->password_actual = $args['password_actual'] ?? '';
        //$this->password_nuevo = $args['password_nuevo'] ?? '';
        $this->role = $args['role'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirm = $args['confirm'] ?? 1;
    }


    //VALIDAR FORMULARIO DE LOGIN
    public function validateLogin() : array{
        if (!$this->email || !$this->password) {
            self::$alertas['error'][] = 'Llena correctamente el formulario';
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Correo no válido';
        }

        return self::$alertas;
    }


    //VALIDAR FORMULARIO DE OLVIDE PASSWORD
    public function validateEmail() : array{
        if (!$this->email) {
            self::$alertas['error'][] = 'Coloca tu correo';
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Correo no válido';
        }

        return self::$alertas;
    }


    //VALIDAR FORMULARIO DE REESTABLECER CONTRASEÑA
    public function validatePasswords() : array{

        if (!$this->password || !$this->password2) {
            self::$alertas['error'][] = 'Completa correctamente el formulario';
        }

        if (strlen($this->password) < 6 || strlen($this->password) > 10) {
            self::$alertas['error'][] = 'La contraseña debe contener mínimo 6 caracteres y máximo 10 catacteres';
        }

        if ($this->password !== $this->password2) {
            self::$alertas['error'][] = 'Las contraseñas no son iguales, asegúrate de colocarlas igual';
        }

        return self::$alertas;
    }


    //HASHEAR PASSWORD
    public function hashPassword() : void{
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    //GENERAR UN TOKEN
    public function createToken() : void{
        $this->token = uniqid();
    }
}
