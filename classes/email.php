<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    protected $email;
    protected $nombre;
    protected $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    //CORREO DE CONFIRMACION DE CUENTA CREADA
    public function enviarConfirmacion(string $email){
        //INSTANCIAR OBJETO DE phpmailer
        $mail = new PHPMailer();

        //CONFIGURAR SMTP (protocolo de envio de emails)
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Host = 'smtp.live.com';
        $mail->Port = 25;
        $mail->Username = 'diegorn.10@hotmail.com';
        $mail->Password = 'bnbzthwwvbhzxcls';

        //CONFIGURAR EL CONTENIDO DEL EMAIL
        $mail->setFrom('diegorn.10@hotmail.com');//Quien envía el email
        $mail->addAddress($email, 'Controlador Redes');//A quien se envía el email
        $mail->Subject = 'Confirmar cuenta';//Mensaje que aparece en el email

        //HABILITAR HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        //DEFINIR EL CONTENIDO DEL EMAIL
        $contenido = "<!DOCTYPE html>
                    <html lang='es'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'>
                    
                        <style>
                            *, *:before, *:after {
                                box-sizing: inherit;
                            }
                            html {
                                font-size: 62.5%;
                                box-sizing: border-box;
                                height: 100%;
                            }
                            body {
                                font-size: 1.6rem;
                                min-height: 100%;
                            }
                            .contenedor {
                                width: 95%;
                                max-width: 1200px;
                                margin: 0 auto;
                            }
                            .title-login{
                                padding: .5rem;
                            }
                            .title{
                                color: #034780;
                                text-transform: uppercase;
                                font-size: 4.5rem;
                                text-align: center;
                                letter-spacing: 3px;
                                text-shadow: 0px 2px 2px #181818;
                            }
                            a {
                                text-decoration: none;
                            }
                            .contenido{
                                text-align: center;
                            }
                            h3{
                                font-family: 'Teko', sans-serif;
                                margin: 0 0 calc(5rem / 2) 0;
                                font-weight: 900;
                                font-size: 2.5rem;
                            }
                            .boton{
                                display: flex;
                                justify-content: center;
                            }
                            .button{
                                padding: 1rem 4rem;
                                font-size: 1.7rem;
                                font-weight: 700;
                                border: none;
                                display: block;
                                width: 100%;
                                margin-top: 1rem;
                                margin-bottom: 1rem;
                                text-decoration: none;
                                background-color: #2563EB;
                                color: #FFFFFF;
                                font-family: 'Teko', sans-serif;
                                transition-property: background-color;
                                transition-duration: .3s;
                            }
                            @media (min-width: 768px) {
                                .button{
                                    width: auto;
                                }
                            }
                            .button:hover {
                                background-color: #034780;
                                cursor: pointer;
                            }
                            p{
                                font-size: 1.5rem;
                                color: #6b7280;
                                line-height: 1.8;
                                font-family: 'Inconsolata', monospace;
                            }
                            .no{
                                color: red;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='contenedor'>
                            <div class='title-login'>
                                <h1 class='title'>Controlador de Redes</h1>
                            </div>
                            <div class='contenido'>";

                            $contenido .='<h3>Hola '. $this->nombre .', se ha creado tu cuenta en el Controlador de Redes</h3>';
                            $contenido .="<p>Presiona en el siguiente botón para confirmar la cuenta:</p>      
                                <div class='boton'>
                                    <a class='button' href='http://localhost:8000/confirm?token=" . $this->token . "'>Confirmar cuenta</a>
                                </div>
                                <p class='no'>Si tú no hiciste la solicitud, o ya tienes tu cuenta confirmada ignora este mensaje</p>
                            </div>
                        </div>
                    </body>
                    </html>";

        $mail->Body = $contenido;
        
        //ENVIAR EL EMAIL
        $mail->send();

    }


    // INSTRUCCIONES PARA CAMBIAR EL PASSWORD
    public function enviarInstrucciones(string $email){
        //INSTANCIAR OBJETO DE phpmailer
        $mail = new PHPMailer();

        //CONFIGURAR SMTP (protocolo de envio de emails)
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Host = 'smtp.live.com';
        $mail->Port = 25;
        $mail->Username = 'diegorn.10@hotmail.com';
        $mail->Password = 'bnbzthwwvbhzxcls';

        //CONFIGURAR EL CONTENIDO DEL EMAIL
        $mail->setFrom('diegorn.10@hotmail.com');//Quien envía el email
        $mail->addAddress($email, 'Controlador Redes');//A quien se envía el email
        $mail->Subject = 'Reestablece tu contraseña';//Mensaje que aparece en el email

        //HABILITAR HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        //DEFINIR EL CONTENIDO DEL EMAIL
        $contenido = "<!DOCTYPE html>
                    <html lang='es'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'>
                    
                        <style>
                            *, *:before, *:after {
                                box-sizing: inherit;
                            }
                            html {
                                font-size: 62.5%;
                                box-sizing: border-box;
                                height: 100%;
                            }
                            body {
                                font-size: 1.6rem;
                                min-height: 100%;
                            }
                            .contenedor {
                                width: 95%;
                                max-width: 1200px;
                                margin: 0 auto;
                            }
                            .title-login{
                                padding: .5rem;
                            }
                            .title{
                                color: #034780;
                                text-transform: uppercase;
                                font-size: 4.5rem;
                                text-align: center;
                                letter-spacing: 3px;
                                text-shadow: 0px 2px 2px #181818;
                            }
                            a {
                                text-decoration: none;
                            }
                            .contenido{
                                text-align: center;
                            }
                            h3{
                                font-family: 'Teko', sans-serif;
                                margin: 0 0 calc(5rem / 2) 0;
                                font-weight: 900;
                                font-size: 2.5rem;
                            }
                            .boton{
                                display: flex;
                                justify-content: center;
                            }
                            .button{
                                padding: 1rem 4rem;
                                font-size: 1.7rem;
                                font-weight: 700;
                                border: none;
                                display: block;
                                width: 100%;
                                margin-top: 1rem;
                                margin-bottom: 1rem;
                                text-decoration: none;
                                background-color: #2563EB;
                                color: #FFFFFF;
                                font-family: 'Teko', sans-serif;
                                transition-property: background-color;
                                transition-duration: .3s;
                            }
                            @media (min-width: 768px) {
                                .button{
                                    width: auto;
                                }
                            }
                            .button:hover {
                                background-color: #034780;
                                cursor: pointer;
                            }
                            p{
                                font-size: 1.5rem;
                                color: #6b7280;
                                line-height: 1.8;
                                font-family: 'Inconsolata', monospace;
                            }
                            .no{
                                color: red;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='contenedor'>
                            <div class='title-login'>
                                <h1 class='title'>Controlador de Redes</h1>
                            </div>
                            <div class='contenido'>";

                            $contenido .='<h3>Hola '. $this->nombre .', has solicitado cambiar tu contraseña</h3>';
                            $contenido .="<p>Presiona en el siguiente botón para continuar con el procedimiento:</p>      
                                <div class='boton'>
                                    <a class='button' href='http://localhost:8000/reestablish?token=" . $this->token . "'>Reestablecer contraseña</a>
                                </div>
                                <p class='no'>Si tú no hiciste la solicitud, ignora el mensaje</p>
                            </div>
                        </div>
                    </body>
                    </html>";

        $mail->Body = $contenido;
        
        //ENVIAR EL EMAIL
        $mail->send();
    }
}