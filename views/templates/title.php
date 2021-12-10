<h1 class="title">Controlador de Redes</h1>
<p class="tagline">Administra el uso de tus direcciones IP en tus redes</p>

<?php if($titulo === 'Iniciar sesión'): ?>  
    <p class="tagline">Como super administrador tienes el control total de la gestión del sistema, crea usuarios y asigna roles como <span>super administrador, administrador o invitado</span></p>
    <p class="tagline">El rol de administrador tiene acceso a generar, eliminar o editar las redes, <span>PERO NO PUEDE ASIGNAR ROLES DE USUARIO</span></p>
    <p class="tagline">Los usuarios invitados, únicamente pueden consultar la información en cada red, <span>NO PUEDEN GESTIONAR NINGUNA RED</span></p>
<?php elseif($titulo === 'Olvidaste tu contraseña'): ?>
    <p class="tagline">Coloca tu correo electrónico asignado para enviarte las instrucciones y reestablezcas tu contraseña</p>
<?php endif; ?>