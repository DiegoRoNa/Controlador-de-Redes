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
                            <input type="radio" name="filtro" id="s_admin" value="2">
                        </div>

                        <div class="campo">
                            <label for="admin">Admins</label>
                            <input type="radio" name="filtro" id="admin" value="1">
                        </div>

                        <div class="campo">
                            <label for="guest">Invitados</label>
                            <input type="radio" name="filtro" id="guest" value="0">
                        </div>
                    </div>
                </div>
            </div>

            <!--LOS USUARIOS SE MUESTRAN DESDE JS-->
            <table id="listado-admins" class="table table-dark table-borderless listado-admins">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="s_admin">
                        <td class="editar-admin">Diego Rojas Nava</td>
                        <td>diegorn.10@hotmail.com</td>
                        <td>Super Administrador</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="admin">
                        <td class="editar-admin">Neila Castelán Silva</td>
                        <td>neila@neila.com</td>
                        <td>Administrador</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="guest">
                        <td class="editar-admin">Javier Rojas Nava</td>
                        <td>javier@javier.com</td>
                        <td>Invitado</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><!--contenedor-->

<?php 
include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/admins.js"></script>
';

?>   