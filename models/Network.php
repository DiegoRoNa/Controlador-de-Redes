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
        $this->fi_octet = $args['fi_octet'] ?? 0;
        $this->s_octet = $args['s_octet'] ?? 0;
        $this->t_octet = $args['t_octet'] ?? 0;
        $this->fo_octet = $args['fo_octet'] ?? 0;
        $this->url = $args['url'] ?? '';
    }
}
