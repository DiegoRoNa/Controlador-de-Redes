<?php 

namespace Model;

class Network extends ActiveRecord{
    //TABLA Y COLUMNAS DE LA BD
    protected static $tabla = 'networks';
    protected static $columnasDB = ['id', 'network', 'fi_octet', 's_octet', 't_octet', 'fo_octet', 'url'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->network = $args['network'] ?? '';
        $this->fi_octet = $args['fi_octet'] ?? '';
        $this->s_octet = $args['s_octet'] ?? '';
        $this->t_octet = $args['t_octet'] ?? '';
        $this->fo_octet = $args['fo_octet'] ?? '';
        $this->url = $args['url'] ?? '';
    } 

    //VALIDACION DE CREAR RED
    public function validateCreateNetwork() : array{

        $expressions = [
            'octet' => '/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/',
            'fioctet' => '/^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/',
            'fooctet' => '/^[0]$/',
            'network' => '/^[a-zA-Z0-9\_\-\s]{1,20}$/'
        ];

        if ($this->network == null || $this->fi_octet == null || $this->s_octet == null || $this->t_octet == null || $this->fo_octet == null) {
            self::$alertas['error'][] = 'Completa correctamente el formulario';
        }

        if (!preg_match($expressions['network'], $this->network)) {
            self::$alertas['error'][] = "El nombre debe contener menos de 20 caracteres y acepta '- ó _'";
        }

        if (!preg_match($expressions['octet'], $this->fi_octet) ||
            !preg_match($expressions['fioctet'], $this->fi_octet) ||
            !preg_match($expressions['octet'], $this->s_octet) ||
            !preg_match($expressions['octet'], $this->t_octet) ||
            !preg_match($expressions['octet'], $this->fo_octet) ||
            !preg_match($expressions['fooctet'], $this->fo_octet)) {
            self::$alertas['error'][] = 'Coloca una IP válida';
        }

        return self::$alertas;
    }

    //VALIDACION DE ACTUALIZAR RED
    public function validateUpdateNetwork() : array{

        $expressions = [
            'network' => '/^[a-zA-Z0-9\_\-\s]{1,20}$/'
        ];


        if (!preg_match($expressions['network'], $this->network)) {
            self::$alertas['error'][] = "El nombre debe contener menos de 20 caracteres y acepta '- ó _'";
        }

        return self::$alertas;
    }
}
