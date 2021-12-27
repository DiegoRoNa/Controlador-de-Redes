<?php include_once __DIR__.'/header-dashboard.php'; ?>

        <div class="contenedor">
            <div class="contenedor-sm">
                <div id="filtros" class="filtros">
                    <div class="filtros-inputs">
                        <h2>IP's:</h2>
                        <div class="campo">
                            <label for="todas">Todas</label>
                            <input type="radio" name="filtro" id="todas" value="" checked>
                        </div>

                        <div class="campo">
                            <label for="usando">Usando</label>
                            <input type="radio" name="filtro" id="usando" value="1">
                        </div>

                        <div class="campo">
                            <label for="sin-uso">Sin usar</label>
                            <input type="radio" name="filtro" id="sin-uso" value="0">
                        </div>
                    </div>
                </div>
            </div>

            
            <!--LAS IP SE MUESTRAN DESDE JS-->
            <table id="listado-ips" class="table table-dark table-borderless listado-ips">
                <!--<thead>
                    <tr>
                        <th>IP</th>
                        <th>Host</th>
                        <th>Usuario</th>
                        <th>Correo usuario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="editar-ip">192.168.1.1</td>
                        <td>Laptop Acer</td>
                        <td>Diego Rojas Nava</td>
                        <td>diego@diego.com</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-sin-uso">Sin usar</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="editar-ip">192.168.1.2</td>
                        <td>Laptop HP</td>
                        <td>Neila Alejandra Castelán Silva</td>
                        <td>neila@neila.com</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-sin-uso">Sin usar</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="editar-ip">192.168.1.3</td>
                        <td>Macbook PRO</td>
                        <td>Javier Rojas Nava</td>
                        <td>javier@javier.com</td>
                        <td>
                            <div class="opcion">
                                <button class="btn-sin-uso">Sin usar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>-->  
            </table>
        </div><!--contenedor-m-->

<?php include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/ips.js"></script>
';
?>

