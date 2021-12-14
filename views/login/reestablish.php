<div class="contenedor login">

    <div class="title-login">
        <?php include_once __DIR__.'/../templates/title.php'; ?>
    </div>

    <div class="contenedor">
        <?php if($mostrar): ?>
            <form method="POST" class="formulario" novalidate>
                <h3 class="descripcion-pagina">Coloca tu nueva contraseña</h3>

                <?php include_once __DIR__.'/../templates/alertas.php'; ?>

                <div class="campo" id="campo-password">
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña">
                    <i class="validacion-estado fas fa-times-circle"></i>
                </div>
                <div class="campo" id="campo-password2">
                    <label for="password2">Confirmar Contraseña</label>
                    <input type="password" name="password2" id="password2" placeholder="Confirmar Contraseña">
                    <i class="validacion-estado fas fa-times-circle"></i>
                </div>

                <div class="boton">
                    <button type="submit" class="button">Guardar contraseña</button>
                </div>
                
            </form>
        <?php else: include_once __DIR__.'/../templates/alertas.php'; ?>
        <?php endif; ?>

    </div>
</div>

<?php 

$script = '
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <script src="build/js/validar-formulario.js"></script>
';

?>