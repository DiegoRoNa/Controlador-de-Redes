<?php 

namespace Controllers;

use Model\Network;
use Model\Ip;
use Model\Admin;
use Model\Host;
use Model\Hostip;

class ApiController{

    //  /api/networks
    public static function select_networks(){
        //CONSULTAR TODAS LAS REDES A LA BD
        $networks = Network::all();

        //PASAMOS LA SESION
        $session = $_SESSION;

        //PASAR EL OBJETO
        echo json_encode([
            'networks' => $networks,
            'session' => $session
        ]);
    }

    //  /api/network
    public static function create_networks(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            //INSTANCIAR OBJETO DE RED
            $network = new Network($_POST);

            //VALIDAR QUE NO EXISTA LA IP EN LA BD
            $existsNetwork = Network::existsIP($_POST['fi_octet'], $_POST['s_octet'], $_POST['t_octet'], $_POST['fo_octet']);
            if ($existsNetwork) {
                $response = [
                    'type' => 'error',
                    'message' => 'Esta red ya existe'
                ];
                echo json_encode($response);
                return;
            }

            //VALIDAR QUE EL ULTIMO OCTETO ES 0
            if ($_POST['fo_octet'] !== 0) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error al crear la Red'
                ];
            }

            //GENERAR LA URL UNICA
            $hash = md5( uniqid() );//32bits
            $network->url = $hash;

            //GUARDAR LA RED
            $result = $network->guardar();

            //RED CREADA
            $network = Network::where('id', $result['id']);

            //INSERTAR LAS IP DE LA RED CREADA
            for ($fooctet=1; $fooctet <=255; $fooctet++) { 
                $resultIP = Ip::insertIP($network->id, $network->fi_octet, $network->s_octet, $network->t_octet, $fooctet);
            }
            
            if (!$result || !$resultIP) {
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

            //VALIDAR QUE LA RED EXISTE
            $network = Network::where('id', $_POST['id']);

            if (!$network) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hay un error, esta Red no existe. O fue eliminada desde otra cuenta'
                ];
                echo json_encode($response);
                return;
            }

            //INSTANCIAR NUEVO OBJETO
            $network = new Network($_POST);

            //GUARDARMOS EN LA BD
            $result = $network->guardar();

            //ENVIAMOS RESPUESTA AL FRONTEND
            if (!$result) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error al actualizar'
                ];
                echo json_encode($response);
                return;
            }else{
                $response = [
                    'type' => 'exito',
                    'message' => 'Red actualizada',
                    'id' => $network->id
                ];
                echo json_encode($response);
            }
            
        }
    }

    //  /api/network/delete
    public static function delete_networks(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            //VALIDAR QUE LA RED EXISTE EN LA BD
            $network = Network::where('id', $_POST['id']);
            if (!$network) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error en el servidor, esta red no existe o fue eliminada desde otra cuenta'
                ];

                echo json_encode($response);
                return;
            }

            //ELIMINAR LAS IPS DE LA RED
            $resultIPs = Ip::eliminarEspecifico('idNetwork', $network->id);

            //SI EXISTE, ELIMINARLA
            $network = new Network($_POST);
            $result = $network->eliminar();

            if (!$result || !$resultIPs) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error, no se pudo eliminar la red'
                ];
                echo json_encode($response);
                return;
            }else{
                $response = [
                    'type' => 'exito',
                    'message' => 'Red eliminada',
                    'result' => $result
                ];
            }

            echo json_encode($response);
        }
    }




    //  /api/ips
    public static function select_ips(){

        //OBTENER RED
        $url = $_GET['id'];
        if(!$url) header('Location: /controller');

        //CONSULTAR LA RED A LA BD POR LA URL
        $network = Network::where('url', $url);

        //VALIDAR QUE LA URL CORRESPONDE A UNA RED O QUE NO EXISTE LA RED
        if (!$network || $url !== $network->url) header('Location: /404');

        
        //CONSULTAR LAS IPS DE ESA RED
        $networkID = $network->id;
        $ips = Ip::belongsTo('idNetwork', $networkID);

        //PASAMOS LA SESION
        $session = $_SESSION;

        //RESPUESTA AL FRONTEND
        echo json_encode([
            'ips' => $ips,
            'session' => $session
        ]);
        
    }

    //  /api/host
    public static function create_host(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            //VALIDAR QUE LA IP CORRESPONDE A ESA RED
            $url = $_POST['url'];
            $network = Network::where('url', $url);

            if (!$network) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error, no se pudo asignar el host'
                ];
                echo json_encode($response);
                return;
            }

            //ELIMINAR DE POST LA URL
            unset($_POST['url']);

            //INSTANCIAR EL NUEVO HOST CON POST
            $ip = new Ip($_POST);

            //GUARDAR EN LA BD
            $result = $ip->guardar();

            if (!$result) {
                $response = [
                    'type' => 'error',
                    'message' => 'Hubo un error, no se pudo asignar el host'
                ];
                echo json_encode($response);
                return;
            }else{
                if ($ip->usingg === '1') {
                    $response = [
                        'type' => 'exito',
                        'title' => 'Asignado',
                        'message' => 'Se asignó el nuevo host',
                        'id' => $ip->id,
                        'idNetwork' => $network->id
                    ];
                    echo json_encode($response);
                }else{
                    $response = [
                        'type' => 'exito',
                        'title' => 'Hecho',
                        'message' => 'Dejaste de usar la IP',
                    ];
                    echo json_encode($response);
                }
                
            }
            
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
