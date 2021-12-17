<?php 

namespace Controllers;

use Model\Network;
use Model\Ip;
use Model\Admin;

class ApiController{

    //  /api/networks
    public static function select_networks(){
        //CONSULTAR TODAS LAS REDES A LA BD
        $networks = Network::all();

        //PASAR EL OBJETO
        echo json_encode(['networks' => $networks]);
    }

    //  /api/network
    public static function create_networks(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            //INSTANCIAR OBJETO DE RED
            $network = new Network($_POST);

            //GENERAR LA URL UNICA
            $hash = md5( uniqid() );//32bits
            $network->url = $hash;

            $result = $network->guardar();

            $network = Network::where('id', $result['id']);

            if (!$result) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error al crear la Red'
                ];
            }

            $response = [
                'type' => 'exito',
                'message' => 'Red creada correctamente',
                'id' => $result['id'],
                'result' => $result['resultado'],
                'url' => $network->url
            ];
            echo json_encode($response);
        }
    }

    //  /api/network/update
    public static function update_networks(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE update';
        }
    }

    //  /api/network/delete
    public static function delete_networks(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE delete';
        }
    }




    //  /api/ips
    public static function select_ips(){
        echo 'DESDE select_ips';
    }

    //  /api/ip
    public static function create_ips(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE create';
        }
    }

    //  /api/ip/update
    public static function update_ips(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE update';
        }
    }

    //  /api/ip/delete
    public static function delete_ips(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE delete';
        }
    }




    //  /api/admins
    public static function select_admins(){
        echo 'DESDE select_admins';
    }

    //  /api/admin
    public static function create_admins(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE create';
        }
    }

    //  /api/admin/update
    public static function update_admins(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE update';
        }
    }

    //  /api/admin/delete
    public static function delete_admins(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo 'DESDE delete';
        }
    }

}
