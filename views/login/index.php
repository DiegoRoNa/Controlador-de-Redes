<div class="contenedor login">

    <div class="title-login">
        <?php include_once __DIR__.'/../templates/title.php'; ?>
    </div>

    <div class="contenedor">
            
        <form action="/" method="POST" class="formulario" novalidate>
            <h3 class="descripcion-pagina">Iniciar sesión</h3>

            <?php include_once __DIR__.'/../templates/alertas.php'; ?>

            <div class="campo" id="campo-email">
                <label for="email">Correo</label>
                <input type="email" name="email" id="email" placeholder="Correo electrónico">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>
            <div class="campo">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Contraseña">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>

            <div class="boton">
                <button type="submit" class="button">Iniciar sesión</button>
            </div>
            
        </form>

        <div class="acciones">
            <a href="/forgot_password">¿Olvidaste tu contraseña?</a>
        </div>
    </div>
</div>