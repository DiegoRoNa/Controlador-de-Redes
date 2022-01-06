<?php
foreach($alertas as $key => $alerta): ?>
    <?php foreach($alerta as $mensaje): ?>
        <div class="alerta <?=$key;?>">
            <?php if($key === 'error'): ?>
                <i class="fas fa-exclamation-triangle"></i> <?=$mensaje;?>
            <?php else: ?>
                <i class="fas fa-check-circle"></i> <?=$mensaje;?>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
<?php endforeach; ?>

