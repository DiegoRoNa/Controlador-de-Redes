
(function(){

    const hosting = '';

    getNetworks();//MOSTRAR LAS REDES
    let networks = [];
    let admin = [];

    //EXPRESION REGULAR PARA LOS INPUT DE LOS OCTETOS DE LA IP
    const expresiones = {
        octet: /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,
        fioctet: /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,
        fooctet: /^[0]$/,
        network: /^[a-zA-Z0-9\_\-\s]{1,20}$/
    }

    //boton para mostrar el modal de agregar red
    const btnNewNetwork = document.querySelector('#agregar-red');
    btnNewNetwork.addEventListener('click', function(){
        showForm();
    });

    //FUNCION PARA CONSULTAR LAS REDES A LA API
    async function getNetworks(){
        
        try {
            
            const url = hosting+'/api/networks';
            const result = await fetch(url);

            const response = await result.json();
            
            networks = response.networks;
            admin = response.session;
            showNetworks();
            
        } catch (error) {
            console.log(error);
        }
    }


    //FUNCION PARA MOSTRAR LAS REDES
    function showNetworks(){

        cleanNetworks();

        //ARREGLO QUE CONTIENE EL VALOR DE networks
        const arrayNetworks = networks;

        //SI EL ARREGLO ESTÁ VACIO
        if (arrayNetworks.length === 0) {
            const containerPrincipal = document.querySelector('.contenedor');
            const noNets = document.createElement('DIV');
            noNets.classList.add('descripcion-pagina');
            const noNetsH2 = document.createElement('H2');
            noNetsH2.classList.add('fuente-roja');
            noNetsH2.textContent = 'No hay redes creadas';

            noNets.appendChild(noNetsH2);
            containerPrincipal.appendChild(noNets)
            return;
        }

        arrayNetworks.forEach(network => {
            
            //CREAR EL DIV DE CADA CARD
            const cardNetwork = document.createElement('DIV');
            cardNetwork.classList.add('card', 'card-contenido', 'card-'+giveColor(network.id));
            cardNetwork.dataset.networkId = network.id;

            //CREAR EL H2 DE LAS CARDS
            const cardH2 = document.createElement('H2');
            cardH2.classList.add('card-header', 'editar-red');
            cardH2.textContent = network.network;

            //VALIDAR QUE SOLO SUPER ADMIN Y ADMIN PUEDEN EDITAR LA RED
            if (admin.role === 's_admin' || admin.role === 'admin') {
                cardH2.addEventListener('click', function(){
                    showForm(true, {...network});
                });
            }

            //CREAR EL BODY DE LAS CARD
            const cardBody = document.createElement('DIV');
            cardBody.classList.add('card-body');
            const cardBodyH3 = document.createElement('H3');
            cardBodyH3.classList.add('card-text');
            cardBodyH3.textContent = network.fi_octet+'.'+network.s_octet+'.'+network.t_octet+'.'+network.fo_octet;

            //CONTENEDOR DE LOS BOTONES ENTRAR Y ELIMINAR
            const cardFooter = document.createElement('DIV');
            cardFooter.classList.add('card-footer', 'opcion');

            //BOTON ENTRAR
            const btnEntrar = document.createElement('A');
            btnEntrar.setAttribute('href', '/network?id='+network.url);
            btnEntrar.classList.add('btn-entrar');
            btnEntrar.textContent = 'Entrar';

            //BOTON ELIMINAR
            const btnDelete = document.createElement('BUTTON');
            btnDelete.classList.add('btn-eliminar');
            btnDelete.dataset.idNetwork = network.id;
            btnDelete.textContent = 'Eliminar';
            if (admin.role === 's_admin' || admin.role === 'admin') {
                btnDelete.onclick = function(){
                    confirmDeleteNetwork({...network});
                }
            }

            //AGREGAR EL BODY Y FOOTER A LA CARD
            cardBody.appendChild(cardBodyH3);
            cardFooter.appendChild(btnEntrar);

            //VALIDAR QUE SOLO SUPER ADMIN Y ADMIN PUEDEN BORRAR LA RED
            if (admin.role === 's_admin' || admin.role === 'admin') {
                cardFooter.appendChild(btnDelete);
            }

            //AGREGAR LOS ELEMENTOS DE LA CARD A LA CARD
            cardNetwork.appendChild(cardH2);
            cardNetwork.appendChild(cardBody);
            cardNetwork.appendChild(cardFooter);
            
            //AGREGAR LA CARD AL LISTADO
            const containerNetworks = document.querySelector('#listado-redes');
            containerNetworks.appendChild(cardNetwork);
            
        });
    }

    //FUNCION PARA MOSTRAR EL MODAL CON EL FORMULARIO
    function showForm(edit = false, network){
        const modal = document.createElement('DIV');
        modal.classList.add('modals');
        modal.innerHTML = `
            <form method="POST" class="formulario" novalidate>
                <h3 class="modal-title descripcion-pagina">${edit ? 'Editar Red' : 'Agregar Red'}</h3>

                <div class="campo" id="campo-network">
                    <label for="network">Nombre Red</label>
                    <input type="text" 
                           name="network" 
                           id="network"
                           value="${edit ? network.network : ''}"
                           placeholder="${edit ? 'Nuevo nombre' : 'Nombre Red'}">
                </div>

                ${edit ? '' : `
                    <div class="campo" id="campo-octet">
                        <label for="fioctet">IP Global</label>
                        <div class="octets">
                            <div class="campo" id="campo-fioctet">
                                <input type="number" class="octet" name="fioctet" id="fioctet">
                            </div>
                            <div class="campo" id="campo-soctet">
                                <input type="number" class="octet" name="soctet" id="soctet">
                            </div>
                            <div class="campo" id="campo-toctet">
                                <input type="number" class="octet" name="toctet" id="toctet">
                            </div>
                            <div class="campo" id="campo-fooctet">
                                <input type="number" class="octet" name="fooctet" id="fooctet">
                            </div>
                        </div>
                    </div>
                `}

                <div class="opciones">
                    <button type="submit" class="button btn-submit">${edit ? 'Guardar' : 'Agregar'}</button>
                    <button type="button" class="button btn-cerrar">Cerrar</button>
                </div>
            </form>
        `;

        setTimeout(() => {
            const form = document.querySelector('.formulario');
            form.classList.add('animar');
        }, 0);

        modal.addEventListener('click', function(e){
            e.preventDefault();

            //DENTRO DE TODO EL MODAL, SELECCIONAR EL BOTON CANCELAR
            if (e.target.classList.contains('btn-cerrar')) {

                const form = document.querySelector('.formulario');
                form.classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();    
                }, 500);
 
            }

            //DENTRO DE TODO EL MODAL, SELECCIONAR EL BOTON AÑADIR RED
            if (e.target.classList.contains('btn-submit')) {

                if (edit) {
                    const nameNetWork = document.querySelector('#network').value.trim();

                    //VALIDAR EL FORMULARIO
                    if (nameNetWork === '') {
                        showAlert('Coloca un nombre a la red', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expresiones.network.test(nameNetWork)) {
                        showAlert("El nombre debe contener menos de 20 caracteres y acepta '-' ó '_'", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    
                    network.network = nameNetWork;
                    editNetwork(network);                    
                }else{
                    
                    const nameNetWork = document.querySelector('#network').value.trim();
                    const fioctet = document.querySelector('#fioctet').value.trim();
                    const soctet = document.querySelector('#soctet').value.trim();
                    const toctet = document.querySelector('#toctet').value.trim();
                    const fooctet = document.querySelector('#fooctet').value.trim();

                    //VALIDAR EL FORMULARIO
                    if (nameNetWork === '' || fioctet === '' || soctet === '' || toctet === '' || fooctet === '') {
                        showAlert('Completa correctamente el formulario', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expresiones.network.test(nameNetWork)) {
                        showAlert("El nombre debe contener menos de 20 caracteres y acepta '- ó _'", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expresiones.fioctet.test(fioctet) || !expresiones.octet.test(fioctet) || !expresiones.octet.test(soctet) || !expresiones.octet.test(toctet) || !expresiones.octet.test(fooctet)) {
                        showAlert('Coloca un formato válido para la IP', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expresiones.fooctet.test(fooctet)) {
                        showAlert('El último octeto debe ser 0', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    
                    addNetwork(nameNetWork, fioctet, soctet, toctet, fooctet);
                } 
            }
         });
         
        //AÑADIR AL BODY
        document.querySelector('.dashboard').appendChild(modal);
    }

    //ALERTA DE VALORES VACIOS
    function showAlert(message, type, reference){

        //PREVENIR CREAR MUCHAS ALERTAS
        const priorAlert = document.querySelector('.alerta');
        if (priorAlert) {
            priorAlert.remove();
        }

        //CREAR Y LLENAR LA ALERTA
        const alert = document.createElement('DIV');
        alert.classList.add('alerta', type);
        alert.textContent = message;

        //INSERTAR LA ALERTA DESPUÉS DEL ELEMENTO
        reference.parentElement.insertBefore(alert, reference.nextElementSibling);

        //ELIMINAR LA ALERTA DESPUES DE 5 SEGUNDOS
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }


    //CONSULTAR API, PARA AÑADIR UNA NUEVA RED
    async function addNetwork(network, fioctet, soctet, toctet, fooctet){
        //QUITAR EL FORMULARIO
        const modal = document.querySelector('.modals');
        setTimeout(() => {
            modal.remove();
        }, 0);

        showWait();

        const data = new FormData();

        data.append('network', network);
        data.append('fi_octet', fioctet);
        data.append('s_octet', soctet);
        data.append('t_octet', toctet);
        data.append('fo_octet', fooctet);

        //CONECTAR A LA API
        try {
            
            const url = hosting+'/api/network';
            const result = await fetch(url, {
                method: 'POST',
                body: data
            });

            const response = await result.json();

            if (response.type === 'error') {
                Swal.fire('ERROR', response.message, 'error');

                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 0);
                return;
            }else {
                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 0);

                Swal.fire('Correcto', response.message, 'success');
            }
                
            const networkObj = {
                id: String(response.id),
                network: network,
                fi_octet: fioctet,
                s_octet: soctet,
                t_octet: toctet,
                fo_octet: fooctet,
                url: (response.url)
            }
 
            networks = [...networks, networkObj];
            showNetworks();

        } catch (error) {
            console.log(error);
        }   
    }

    //FUNCION PARA EDITAR UNA RED
    async function editNetwork(network){
        
        const { id, fi_octet, s_octet, t_octet, fo_octet, url } = network;

        const data = new FormData();
        data.append('id', id);
        data.append('network', network.network);
        data.append('fi_octet', fi_octet);
        data.append('s_octet', s_octet);
        data.append('t_octet', t_octet);
        data.append('fo_octet', fo_octet);
        data.append('url', url);

        //CONEXION A LA API
        try {
            const url = hosting+'/api/network/update';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (result.type === 'error') {
                //MOSTRAR MENSAJE DE ERROR
                Swal.fire('ERROR', response.message, 'error');
                //QUITAR EL FORMULARIO
                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 0);
                return;
            }else{
                Swal.fire(
                    'Actualizado',
                    result.message,
                    'success'
                )

                //QUITAR EL MODAL DEL FORMULARIO
                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 500);

                //ACTUALIZAR LA RED EN TIEMPO REAL DOM VIRTUAL
                networks = networks.map(memoryNetwork => {
                    //Evaluar si el id de la red es igual al que se le da click
                    if (memoryNetwork.id === id) {
                        //cambiar el nombre al valor nuevo del click
                        memoryNetwork.network = network.network;
                    }

                    //Retornar la tarea actualizada
                    return memoryNetwork;
                });

                //Mostrar las redes para generar de nuevo el html
                showNetworks();
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    //FUNCIONES PARA ELIMINAR RED
    function confirmDeleteNetwork(network){
        Swal.fire({
            title: '¿Eliminar red?', 
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            
            if (result.isConfirmed) {
                deletNetwork(network);
            }

        });
    }
    async function deletNetwork(network){
        
        const { id, fi_octet, s_octet, t_octet, fo_octet, url } = network;

        const data = new FormData();
        data.append('id', id);
        data.append('network', network.network);
        data.append('fi_octet', fi_octet);
        data.append('s_octet', s_octet);
        data.append('t_octet', t_octet);
        data.append('fo_octet', fo_octet);
        data.append('url', url);

        //CONECTAR CON LA API PARA ELIMINAR
        try {
            const url = hosting+'/api/network/delete';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            
            const result = await response.json();

            if (result.result) {
                //MOSTRAR MENSAJE DE EXITO
                Swal.fire('Eliminada', result.message, 'success');

                networks = networks.filter( memoryNetwork => memoryNetwork.id !== network.id );
                showNetworks();
            }else{
                //MOSTRAR MENSAJE DE ERROR
                Swal.fire('Hubo un error', result.message, 'error');
            }
            
        } catch (error) {
            Swal.fire('Hubo un error', 'No se pudo eliminar la red', 'error');
        }
    }


    //FUNCION DE MOSTRAR VENTANA DE ESPERA
    function showWait(){
        const modal = document.createElement('DIV');
        modal.classList.add('modals');
        modal.innerHTML = `
            <div class="wait-contenido">
                <div class="spinner-border text-light wait" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>            
        `;

        //AÑADIR AL BODY
        document.querySelector('.dashboard').appendChild(modal);
    }


    //LIMPIAR EL DOM DONDE SE MUESTRAN LAS REDES
    function cleanNetworks(){
        const networkList = document.querySelector('#listado-redes');

        while (networkList.firstChild) {
            networkList.removeChild(networkList.firstChild);
        }
    }

    //DAR CLASE A LAS CARDS DE LAS REDES
    function giveColor(id){
        const idNet = id;
        const digits = idNet.toString().split('');
        const realDigits = digits.map(Number);
        const lastDigit = realDigits[realDigits.length-1];

        return lastDigit;
    }
})();