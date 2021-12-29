<?php include_once __DIR__.'/header-dashboard.php'; ?>

            <div class="contenedor">

                <!-- Boton para apareer modal -->
                <?php if($_SESSION['role'] === 's_admin' || $_SESSION['role'] === 'admin'): ?>
                    <div class="contenedor-agregar">
                        <button type="button"
                                class="agregar-red agregar button" 
                                id="agregar-red"       
                        >&#43; Nueva Red</button>
                    </div>
                <?php endif; ?>
                <!--
<div id="listado-redes" class="listado-redes cards">
    <div class="card card-contenido" style="background-color: #25deeb;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: rgb(209, 189, 9);;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #034780;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #DB2777;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #F59E0B;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #7C3AED;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #f3f4f6;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #000;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>

    <div class="card card-contenido" style="background-color: #198754;">
        <h2 class="card-header editar-red">Red 1</h2>
            <div class="card-body">
                <h3 class="card-text">192.168.1.0</h3>
            </div>
            <div class="card-footer opcion-eliminar">
                <a href="/network" class=btn-entrar">Entrar</a>
                <button class="btn-eliminar">Eliminar</button>
            </div>
    </div>
</div>
                -->
                <!--LAS REDES SE MUESTRAN DESDE JS-->
                <table id="listado-redes" class="table table-dark table-borderless listado-redes">
                    <!--<thead>
                        <tr class="table-light">
                            <th class="fuente-roja">No hay redes creadas</th>
                        </tr>
                        <tr>
                            <th>Red</th>
                            <th>IP Global</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="editar-red">Red 1</td>
                            <td>192.168.1.0</td>
                            <td>
                                <div class="opcion-eliminar">
                                    <a href="/network" class="btn-entrar">Entrar</a>    
                                    <button class="btn-eliminar">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="editar-red">Red 2</td>
                            <td>192.168.0.0</td>
                            <td>
                                <div class="opcion-eliminar">
                                    <a href="/network" class="btn-entrar">Entrar</a>    
                                    <button class="btn-eliminar">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="editar-red">Red 3</td>
                            <td>8.0.0.0</td>
                            <td>
                                <div class="opcion-eliminar">
                                    <a href="/network" class="btn-entrar">Entrar</a>    
                                    <button class="btn-eliminar">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>-->
                </table>
            </div><!--contenedor-sm-->

<?php 
include_once __DIR__.'/footer-dashboard.php';

$script .= '
<script src="build/js/redes.js"></script>    
';
?>