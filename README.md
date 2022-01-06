
# CONTROLADOR DE REDES

Hecho por Diego Rojas Nava. diegorn.10@hotmail.com

**Introducción**

Este proyecto consiste en un Dashboard para administrar las IPS que se están usando en una red, este proyecto no lee las IPS de manera real, ni las redes.

**Contiene**:
- Consume una API creada para hacer el CRUD de redes, ips y admins
- Sección de Login: Donde ingresas el email y la contraseña
- Sección de recuperar contraseña: El usuario ingresa tu correo, y se le envía el enlace para cambiar la contraseña
- Este Dashboard maneja 3 tipos de administradores:
    + **Super administrador**: Tiene privilegios para realizar el CRUD completo a las Redes (Consultarlas, Crearlas, Editarlas o Eliminarlas). En la sección de IPs de cada red puede Editarlas, y puede asignar una IP a un nuevo host, así como dejar de usar una IP que ya esté asignada. Este tipo de administrador es el único que tiene acceso a la sección de Administradores, donde puede realizar el CRUD completo a los admins (Consultarlos, Crearlos, Editarlos o Eliminarlos)
	
	Puedes usar estas credenciales para probar ser Super Administrador: 
	**Correo**: superadmin@superadmin.com
	**Contraseña**: 123456
    + **Administrador**: Tiene privilegios para realizar el CRUD completo a las Redes (Consultarlas, Crearlas, Editarlas o Eliminarlas). En la sección de IPs de cada red puede Editarlas, y puede asignar una IP a un nuevo host, así como dejar de usar una IP que ya esté asignada. Este tipo de administrador NO tiene acceso a la sección de Administradores
	
	Puedes usar estas credenciales para probar ser Administrador: 
	**Correo**: admin@admin.com
	**Contraseña**: 123456
    + **Invitado**: Este tipo de administrador, sólo tiene privilegios para consultar las Redes y las IPs de cada red. No puede Crear, Editar o Eliminar. Tampoco tiene acceso a la sección de Administradores
	
	Puedes usar estas credenciales para probar ser Invitado: 
	**Correo**: guest@guest.com
	**Contraseña**: 123456
- Usé el autoload de Composer
- Para envío de correos uso la librería PHPMailer
- Uso el preprocesador SASS
- Utilizó el gestor de tareas Gulp, para potenciar la herramienta SASS, y poder crear imágenes con distintas extensiones para la compatibilidad en navegadores. Todos los archivos sass, imágenes y archivos js, los mando a la carpeta **build** que está dentro de **public** ya que esos son los archivos que lee el proyecto
- El proyecto trabaja con MVC
- Se usan algunas herramientas y estilos de Bootstrap 5

### Para revisar la funcionabilidad de este proyecto sigue estos pasos:

#### Paso 1
Descargar el proyecto, colócalo en tu carpeta de tu servidor web local (xampp, wampp, laragon, etc)

#### Paso 2
Crea un host virtual en tu servidor web, ya que este proyecto está pensado para trabajar en producción y la URL se debe mantener lo más fiel posible a un proyecto en un hosting real.

Puedes usar este código para hacer tu host virtual, en tu archivo **httpd-vhosts.conf**, este es un ejemplo en xampp (Varía dependiendo del servidor local que estés usando).

< VirtualHost *:80>   
    DocumentRoot "C:/xampp/htdocs/ControladorRedes/public"
    ServerName controlador.com.devel
    ServerAlias www.controlador.com.devel
    < Directory "C:/xampp/htdocs/ControladorRedes/public">
        Options Indexes FollowSymLinks     
        AllowOverride All
        Order Deny,Allow
        Allow from all       
    < /Directory>
< /VirtualHost> 

#### Paso 3
**Para este paso debe tener instalado node.js y npm**

Desde la raíz del proyecto Instala gulp globalmente:

`$ npm install --global gulp-cli`

Se usó esta herramienta para magnificar el uso de **SASS** y crear imágenes que puedan ser compatibles en distintos navegadores

Posteiormente instala las dependencias de npm desde la terminal o cmd, con el comando:

`$ npm install`

#### Paso 4
Desde la raíz del proyecto Instala las dependencias de composer desde la terminal o cmd, con el comando:
(Recuerda tener instalado composer globalmente)

`$ composer update`

#### Paso 5
Si deseas editar archivos JS, agregar imágenes o estilos en SASS. Necesitas arrancar las tareas de gulp, usando cualquiera de estos comandos

`$ npm start` (recomendado)
`$ gulp`

#### Paso 6
Crea la base de datos con el nombre **controlador_redes**, e importa el archivo **controlador_redes.sql**

#### Paso 7
Cambia las credenciales de envío de correos, en la carpeta **classes**, en las funciones **enviarConfirmacion** y **enviarInstrucciones**


    //CONFIGURAR SMTP (protocolo de envio de emails)
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Host = ''; //Colocar el servidor
        $mail->Port = ; //Puerto
        $mail->Username = ''; //Usuario
        $mail->Password = ''; //Contraseña


#### Paso 8
Cambia las URL para consumir la API que contiene el proyecto, en los archivos JS en la carpeta **src**, en los archivos** redes.js**, **ips.js** y **admins.js**

Ejemplo:
```javascript
const hosting = 'http://controlador.com.devel';
```
Cambia **http://controlador.com.devel** por el que hayas colocado en tu host virtual

Cambia la super global creada en el archivo **globales.php** dentro de la carpeta **includes**, por el hosting virtual que creaste

        define('HOSTING', '');