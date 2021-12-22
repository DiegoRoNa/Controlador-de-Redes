<?php include_once __DIR__.'/header-dashboard.php'; ?>

            <div class="contenedor-sm">

                <!-- Boton para apareer modal -->
                <?php if($_SESSION['role'] === 's_admin' || $_SESSION['role'] === 'admin'): ?>
                    <div class="contenedor-agregar">
                        <button type="button"
                                class="agregar-red agregar button" 
                                id="agregar-red"       
                        >&#43; Nueva Red</button>
                    </div>
                <?php endif; ?>
                
                <!-- Modal NUEVA RED 
            <div class="modal">
                    <form method="POST" class="formulario cerrar" novalidate>
                        <h3 class="modal-title descripcion-pagina">Agregar Red</h3>
                        
                        <div class="mb-3 campo" id="campo-network">
                            <label for="network" class="col-form-label">Nombre Red</label>
                            <input type="text" name="network" id="network" placeholder="Nombre Red">
                        </div>
                        <div class="mb-3 campo" id="campo-octet">
                            <label for="fioctet" class="col-form-label">IP Global</label>
                            <div class="mb-3 octets">
                                <div class="mb-3 campo" id="campo-fioctet">
                                    <input type="number" class="octet" name="fioctet" id="fioctet">
                                </div>
                                <div class="mb-3 campo" id="campo-soctet">
                                    <input type="number" class="octet" name="soctet" id="soctet">
                                </div>
                                <div class="mb-3 campo" id="campo-toctet">
                                    <input type="number" class="octet" name="toctet" id="toctet">
                                </div>
                                <div class="mb-3 campo" id="campo-fooctet">
                                    <input type="number" class="octet" name="fooctet" id="fooctet">
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer opciones">
                            <button type="submit" class="button btn-submit">Agregar</button>
                            <button type="button" class="button btn-cerrar">Cerrar</button>
                        </div>
                    </form>
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
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="build/js/redes.js"></script>
';
?>