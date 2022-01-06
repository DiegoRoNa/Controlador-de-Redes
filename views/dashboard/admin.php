<?php include_once __DIR__.'/header-dashboard.php';?>

        <div class="contenedor">
            <div class="contenedor-agregar">
                <button type="button" class="agregar-admin agregar button" id="agregar-admin">&#43; Agregar Admin</button>
            </div>
            <div class="contenedor-sm">
                <div id="filtros" class="filtros">
                    <div class="filtros-inputs">
                        <h2>Admins:</h2>
                        <div class="campo">
                            <label for="todos">Todos</label>
                            <input type="radio" name="filtro" id="todos" value="" checked>
                        </div>

                        <div class="campo">
                            <label for="s_admin">Super admins</label>
                            <input type="radio" name="filtro" id="s_admin" value="s_admin">
                        </div>

                        <div class="campo">
                            <label for="admin">Admins</label>
                            <input type="radio" name="filtro" id="admin" value="admin">
                        </div>

                        <div class="campo">
                            <label for="guest">Invitados</label>
                            <input type="radio" name="filtro" id="guest" value="guest">
                        </div>
                    </div>
                </div>
            </div>

            <!--LOS USUARIOS SE MUESTRAN DESDE JS-->
            <table id="listado-admins" class="table table-dark table-borderless listado-admins"></table>
        </div><!--contenedor-->

<?php 
include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/admins.js"></script>
';

?>   