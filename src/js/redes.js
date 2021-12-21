//IIFE

//TODO DENTRO DE ESTE CALLBACK, SE PROTEGE, ES DECIR:
//TOAS VARIABLES Y FUNCIONES DEFINIDAS EN ESTE ARCHIVO, NO PUEDEN SER EJECUTADAS DESDE OTRO
(function(){

    getNetworks();//MOSTRAR LAS REDES
    submitNewNetwork();
    let networks = [];//DOM VIRTUAL: PASO 1

    //EXPRESION REGULAR PARA LOS INPUT DE LOS OCTETOS DE LA IP
    const expresiones = {
        octet: /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,
        network: /^[a-zA-Z0-9\_\-\s]{1,20}$/
    }


    //FUNCION PARA CONSULTAR LAS REDES A LA API
    async function getNetworks(){
        //CONECTAR A LA API
        try {
            //PRIMER await: CONEXION A LA API
            const url = 'http://localhost:8000/api/networks';
            const result = await fetch(url);

            //OBTENER RESPUESTA DE LA API
            const response = await result.json();//OBJECT

            //DOM VIRTUAL: PASO 2
            //ASIGNAR LAS REDES EN EL ARREGLO DECLARADO AL INICIO
            networks = response.networks;
            showNetworks();
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //FUNCION PARA MOSTRAR LAS REDES
    function showNetworks(){
        //DOM VIRTUAL: PASO 5
        //Limipiar el html donde se muentran las redes
        cleanNetworks();

        //ARREGLO QUE CONTIENE EL VALOR DE networks
        const arrayNetworks = networks;

        //SI EL ARREGLO ESTÁ VACIO
        if (arrayNetworks.length === 0) {
            const containerNetworks = document.querySelector('#listado-redes');//table
            const noNetsTHEAD = document.createElement('THEAD');
            const noNetsTR = document.createElement('TR');
            noNetsTR.classList.add('table-light');
            const noNetsTH = document.createElement('TH');
            noNetsTH.classList.add('fuente-roja');
            noNetsTH.textContent = 'No hay redes creadas';

            noNetsTR.appendChild(noNetsTH);
            noNetsTHEAD.appendChild(noNetsTR)
            containerNetworks.appendChild(noNetsTHEAD);
            return;
        }

        //SI EL ARREGLO TIENE REDES
        //CREAR Y LLENAR LA TABLA
        //CREAMOS EL THEAD
        const netsTHEAD = document.createElement('THEAD');
        const trHead = document.createElement('TR');
        const thHeadNetwork = document.createElement('TH');
        thHeadNetwork.textContent = 'Red';
        const thHeadIP = document.createElement('TH');
        thHeadIP.textContent = 'IP Global';
        const thHeadDelete = document.createElement('TH');
        trHead.appendChild(thHeadNetwork);
        trHead.appendChild(thHeadIP);
        trHead.appendChild(thHeadDelete);
        netsTHEAD.appendChild(trHead);
        const netsTBODY = document.createElement('TBODY');

        //RECORRER EL OBJETO Y MOSTRAR LA INFORMACION DE CADA RED
        arrayNetworks.forEach(network => {
            //CREAR TR DEL BODY
            const trBody = document.createElement('TR');
            trBody.dataset.networkId = network.id;

            //CREAR LOS TD
            const tdNetwork = document.createElement('TD');
            tdNetwork.textContent = network.network;
            tdNetwork.classList.add('editar-red');
            tdNetwork.dataset.bsToggle = 'modal';
            tdNetwork.dataset.bsTarget = '#modalEditRed';
            
            tdNetwork.addEventListener('click', function(){
                submitEditNetwork({...network});
            })
    

            const tdIp = document.createElement('TD');
            tdIp.textContent = network.fi_octet+'.'+network.s_octet+'.'+network.t_octet+'.'+network.fo_octet;

            //CONTENEDOR DE LOS BOTONES ENTRAR Y ELIMINAR
            const tdButton = document.createElement('TD');
            const deleteOption = document.createElement('DIV');
            deleteOption.classList.add('opcion-eliminar');

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
            btnDelete.onclick = function(){
                confirmDeleteNetwork({...network});
            }

            //AGREGAR EL BUTTON AL DIV
            deleteOption.appendChild(btnEntrar);
            deleteOption.appendChild(btnDelete);
            tdButton.appendChild(deleteOption);

            //AGREGAR LOS TD AL TR
            trBody.appendChild(tdNetwork);
            trBody.appendChild(tdIp);
            trBody.appendChild(tdButton);

            //AGREGAR EL TR AL TBODY
            netsTBODY.appendChild(trBody);

            //AGREGAR EL THEAD Y TBODY AL TABLE
            const containerNetworks = document.querySelector('#listado-redes');//table
            containerNetworks.appendChild(netsTHEAD);
            containerNetworks.appendChild(netsTBODY);
        });
    }

    function submitNewNetwork(){
        const modalBody = document.querySelector('#modalNew');

        modalBody.addEventListener('click', function(e){
            e.preventDefault();
    
            if(e.target.classList.contains('btn-submit')){
                const nameNetWork = document.querySelector('#network').value.trim();
                const fioctet = document.querySelector('#fioctet').value.trim();
                const soctet = document.querySelector('#soctet').value.trim();
                const toctet = document.querySelector('#toctet').value.trim();
                const fooctet = document.querySelector('#fooctet').value.trim();
    
                //VALIDAR EL FORMULARIO
                if (nameNetWork === '' || fioctet === '' || soctet === '' || toctet === '' || fooctet === '') {
                    showAlert('Completa correctamente el formulario', 'error', document.querySelector('.modal-header'));
                    return;
                }
                if (!expresiones.network.test(nameNetWork)) {
                    showAlert("El nombre debe contener menos de 20 caracteres y acepta '- ó _'", 'error', document.querySelector('.modal-header'));
                    return;
                }
                if (!expresiones.octet.test(fioctet) || !expresiones.octet.test(soctet) || !expresiones.octet.test(toctet) || !expresiones.octet.test(fooctet)) {
                    showAlert('Coloca un formato válido para la IP', 'error', document.querySelector('.modal-header'));
                    return;
                }
                
                addNetwork(nameNetWork, fioctet, soctet, toctet, fooctet);
            }
        });
    }
    

    function submitEditNetwork(network){
        const inputNetWork = document.querySelector('#newNetwork');
        inputNetWork.setAttribute('value', network.network);

        const modalBody = document.querySelector('#modalEdit');

        modalBody.addEventListener('click', function(e){
            e.preventDefault();
            if(e.target.classList.contains('btn-submit')){
                const nameNetWork = inputNetWork.value.trim();

                //VALIDAR EL FORMULARIO
                if (nameNetWork === '') {
                    showAlert('Coloca un nombre a la red', 'error', document.querySelector('.modal-header'));
                    return;
                }
                if (!expresiones.network.test(nameNetWork)) {
                    showAlert("El nombre debe contener menos de 20 caracteres y acepta '- ó _'", 'error', document.querySelector('.modal-header'));
                    return;
                }


                network.network = nameNetWork;
                editNetwork(network);

            }
            
        });
        
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
        //formdata siempre se usa para hacer peticiones
        const data = new FormData();

        //Agregar la informacion a formData para enviar al BACKEND
        data.append('network', network);
        data.append('fi_octet', fioctet);
        data.append('s_octet', soctet);
        data.append('t_octet', toctet);
        data.append('fo_octet', fooctet);

        //SIEMPRE USAR TRY-CATCH PARA HACER CONEXIONES WEBSERVICE
        try {
            //PRIMER await: CONEXION A LA API
            const url = 'http://localhost:8000/api/network';
            const result = await fetch(url, {
                method: 'POST',
                body: data
            });

            //OBTENER LA RESPUESTA DEL BACKEND (API)
            const response = await result.json();

            //MOSTRAR ALERTA DE ERROR O EXITO
            showAlert(response.message, response.type, document.querySelector('.modal-header'));

            if (response.type === 'error') {
                return;
            }else {
                const btnCerrar = document.querySelector('.btn-cerrar');
                setTimeout(() => {
                    btnCerrar.click();
                }, 2000);
            }
                

            //DOM VIRTUAL: PASO 3
            //AGREGAR EL OBJETO DE NETWORK AL GLOBAL DE NETWORKS, IDENTICO AL DE LA BD
            const networkObj = {
                id: String(response.id),
                network: network,
                fi_octet: fioctet,
                s_octet: soctet,
                t_octet: toctet,
                fo_octet: fooctet,
                url: (response.url)
            }
            //DOM VIRTUAL: PASO 4
            //CREAR UNA COPIA DE networks AGREGANDO networkObj
            networks = [...networks, networkObj];
            showNetworks();


        } catch (error) {
            console.log(error);
        }
        
    }


    async function editNetwork(network){
        console.log(network);
        
    }


    //FUNCIONES PARA ELIMINAR RED
    function confirmDeleteNetwork(network){
        Swal.fire({
            title: '¿Eliminar red?', 
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deletNetwork(network);
            }
        });
    }
    async function deletNetwork(network){
        //CREAR EL FORMDATA() PARA MANDARLE LA INFORMACION NUEVA A LA API
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
            const url = 'http://localhost:8000/api/network/delete';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            //OBTENER LA RESPUESTA DEL BACKEND
            const result = await response.json();

            if (result.result) {
                //MOSTRAR MENSAJE DE EXITO
                Swal.fire('Eliminada', result.message, 'success');

                //DOM VIRTUAL PARA ELIMINACION DINAMICA
                //filter(): Creará un arreglo nuevo con las tareas que tienen ID diferente al que vamos a eliminar
                networks = networks.filter( memoryNetwork => memoryNetwork.id !== network.id );
                showNetworks();
            }else{
                //MOSTRAR MENSAJE DE ERROR
                Swal.fire('Hubo un error', result.message, 'error');
            }
            
        } catch (error) {
            //MOSTRAR MENSAJE DE ERROR
            Swal.fire('Hubo un error', 'No se pudo eliminar la red', 'error');
            
        }
    }



    //LIMPIAR EL DOM DONDE SE MUESTRAN LAS REDES
    function cleanNetworks(){
        const networkList = document.querySelector('#listado-redes');

        while (networkList.firstChild) {//mientras haya elementos
            networkList.removeChild(networkList.firstChild);//elimina el primer elemento
        }
    }
        
})();//este (), ejecuta esta funcion inmediatamente