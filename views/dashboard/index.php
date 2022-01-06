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
    
                <div id="listado-redes" class="listado-redes cards"></div>
            </div><!--contenedor-->

<?php 
include_once __DIR__.'/footer-dashboard.php';

$script .= '
    <script src="build/js/redes.js"></script>        
';
?>