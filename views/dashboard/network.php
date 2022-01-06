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
            <table id="listado-ips" class="table table-dark table-borderless listado-ips"></table>
        </div><!--contenedor-m-->

<?php include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/ips.js"></script>
';
?>

