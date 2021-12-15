<aside class="sidebar">
    <div class="contenedor-sidebar">
        <div class="title-login">
            <h1 class="title">Controlador de Redes</h1>
        </div>
        
        <div class="cerrar-menu">
            <img id="cerrar-menu" src="build/img/cerrar.svg" alt="imagen cerrar menu">
        </div>
    </div>
    
    <nav class="sidebar-nav">
        <a class="<?=($titulo === 'Controlador') ? 'activo' : '';?>" href="/controller">Redes</a>
        <a class="<?=($titulo === 'Usuarios') ? 'activo' : '';?>" href="/users">Usuarios</a>
    </nav>

    <div class="cerrar-sesion-mobile button">
        <a href="/logout" class="cerrar-sesion button">Cerrar sesión</a>
    </div>
</aside>