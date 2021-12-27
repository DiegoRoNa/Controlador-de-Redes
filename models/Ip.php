<?php 

namespace Model;

class Ip extends ActiveRecord{
    //TABLA Y COLUMNAS DE LA BD
    protected static $tabla = 'ips';
    protected static $columnasDB = ['id', 'idNetwork', 'fi_octet', 's_octet', 't_octet', 'fo_octet', 'host', 'name', 'surnames', 'email', 'usingg'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->idNetwork = $args['idNetwork'] ?? '';
        $this->fi_octet = $args['fi_octet'] ?? 0;
        $this->s_octet = $args['s_octet'] ?? 0;
        $this->t_octet = $args['t_octet'] ?? 0;
        $this->fo_octet = $args['fo_octet'] ?? 0;
        $this->host = $args['host'] ?? '';
        $this->name = $args['name'] ?? '';
        $this->surnames = $args['surnames'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->usingg = $args['usingg'] ?? 0;
    }

}
