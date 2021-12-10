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
        $this->password_actual = $args['password_actual'] ?? '';
        $this->password_nuevo = $args['password_nuevo'] ?? '';
        $this->role = $args['role'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirm = $args['confirm'] ?? 0;
    }


    //VALIDAR FORMULARIO DE LOGIN
    public function validateLogin() : array{
        if (!$this->email) {
            self::$alertas['error'][] = 'El correo es obligatorio';
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Correo no válido';
        }

        if (!$this->password) {
            self::$alertas['error'][] = 'La contraseña es obligatoria';
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
}
