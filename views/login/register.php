<div class="contenedor register">

    <div class="title-register">
        <?php include_once __DIR__.'/../templates/title.php'; ?>
    </div>

    <div class="contenedor">
            
        <form method="POST" class="formulario" novalidate>
            <h3 class="descripcion-pagina">Registrar nuevo usuario</h3>

            <?php include_once __DIR__.'/../templates/alertas.php'; ?>

            <div class="campo" id="campo-name">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" placeholder="Nombre">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>
            <div class="campo" id="campo-surnames">
                <label for="surnames">Apellidos</label>
                <input type="text" name="surnames" id="surnames" placeholder="Apellidos">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>
            <div class="campo" id="campo-email">
                <label for="email">Correo</label>
                <input type="email" name="email" id="email" placeholder="Correo electrónico">
                <i class="validacion-estado fas fa-times-circle"></i>
            </div>
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
            <div class="campo" id="campo-role">
                <label for="role">Seleccione un role</label>
                <select name="role" id="role">
                    <option value="">-- Seleccione un role --</option>
                    <option value="guest">Invitado</option>
                    <option value="admin">Admin</option>
                    <option value="s_admin">Super Admin</option>    
                </select>
            </div>

            <div class="boton">
                <button type="submit" class="button">Registrar</button>
            </div>
            
        </form>
    </div>
</div>

