<div class="contenedor olvide">

    <div class="title-olvide">
        <?php include_once __DIR__.'/../templates/title.php'; ?>
    </div>

    <div class="contenedor">
            
        <form action="/forgot_password" method="POST" class="formulario" novalidate>
            <h3 class="descripcion-pagina">Recuperar acceso</h3>
            
            <?php include_once __DIR__.'/../templates/alertas.php'; ?>
            
            <div class="campo" id="campo-email">
                <label for="email">Correo</label>
                <input type="email" name="email" id="email" placeholder="Correo electrónico">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>

            <div class="boton">
                <button type="submit" class="button">Enviar instrucciones</button>
            </div>
            
        </form>

        <div class="acciones">
            <a href="/">¿Ya tienes una cuenta?, inicia sesión</a>
        </div>
    </div>
</div>

<?php 

$script = '
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <script src="build/js/validar-formulario.js"></script>
';

?>