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
                <div class="descripcion-pagina">
                    <h2 class="fuente-roja">No hay redes creadas</h2>
                </div>-->
                
                <div id="listado-redes" class="listado-redes cards">
                    <!--<div class="card card-contenido card-0">
                        <h2 class="card-header editar-red">Red 0</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-1">
                        <h2 class="card-header editar-red">Red 1</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-2">
                        <h2 class="card-header editar-red">Red 2</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-3">
                        <h2 class="card-header editar-red">Red 3</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-4">
                        <h2 class="card-header editar-red">Red 4</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-5">
                        <h2 class="card-header editar-red">Red 5</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-6">
                        <h2 class="card-header editar-red">Red 6</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-7">
                        <h2 class="card-header editar-red">Red 7</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-8">
                        <h2 class="card-header editar-red">Red 8</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>

                    <div class="card card-contenido card-9">
                        <h2 class="card-header editar-red">Red 9</h2>
                        <div class="card-body">
                            <h3 class="card-text">192.168.1.0</h3>
                        </div>
                        <div class="card-footer opcion">
                            <a href="/network" class="btn-entrar">Entrar</a>
                            <button class="btn-eliminar">Eliminar</button>
                        </div>
                    </div>-->
                </div><!--listado-redes-->
            </div><!--contenedor-sm-->

<?php 
include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/redes.js"></script>        
';
?>