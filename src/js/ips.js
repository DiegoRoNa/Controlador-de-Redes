//IIFE

//TODO DENTRO DE ESTE CALLBACK, SE PROTEGE, ES DECIR:
//TOAS VARIABLES Y FUNCIONES DEFINIDAS EN ESTE ARCHIVO, NO PUEDEN SER EJECUTADAS DESDE OTRO
(function(){
    //MOSTRAR LAS IPS
    getIps();

    let ips = [];//DOM VIRTUAL: PASO 1
    let filtered = [];//arreglo para los filtros
    let admin = [];

    //EXPRESION REGULAR PARA LOS INPUT DE LOS FORMULARIOS
    const expressions = {
        host: /^[a-zA-Z0-9\_\-\s]{1,20}$/, // Letras, numeros, guion y guion_bajo
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        surnames: /^[a-zA-ZÀ-ÿ\s]{1,80}$/, // Letras y espacios, pueden llevar acentos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    //FILTROS DE BUSQUEDA
    const filters = document.querySelectorAll('#filtros input[type="radio"]');

    //Hiterar sobre los input para añadirles un evento
    filters.forEach( radio => {
        radio.addEventListener('input', filterIP);
    });
    function filterIP(e){
        //VALUE DE LOS INPUT
        const filter = e.target.value;
        
        //Si el filtro es direfente a TODAS
        if (filter !== '') {
            //FILTER: Hiteramos y creamos un nuevo arreglo con cada tarea por el estado 
            filtered = ips.filter( ip => ip.usingg === filter);
        }else{
            filtered = [];
        }

        showIps();
    }

    //FUNCION PARA CONSULTAR LAS IPS A LA API
    async function getIps(){
        //CONECTAR A LA API
        try {
            //OBTENER RED
            const id = getNetworkId();
            
            //PRIMER await: CONEXION A LA API
            const url = `http://localhost:8000/api/ips?id=${id}`;
            const result = await fetch(url);

            //OBTENER RESPUESTA DE LA API
            const response = await result.json();//OBJECT

            //DOM VIRTUAL: PASO 2
            //ASIGNAR LAS IPS EN EL ARREGLO DECLARADO AL INICIO
            ips = response.ips;
            admin = response.session;
            showIps();
            
        } catch (error) {
            console.log(error);
            
        }
    }

    function showIps(){
        //DOM VIRTUAL: PASO 5
        //Limipiar el html donde se muentran las IPS
        cleanIps();

        //CALCULAR IPS EN UNO Y SIN USAR
        totalUnused();
        totalUsing();

        //ASGINAMOS EL ARREGLO QUE CORRESPONDA AL FILTRO
        //SI filtered CONTIENE ALGO, arrayIps CONTIENE EL VALOR DE filtered
        //SI NO, CONTIENE EL VALOR DE ips
        const arrayIps = filtered.length ? filtered : ips;
        
        //ESTADO usingg PARA LAS ips
        const usinggs = {
            0: 'Sin-usar',
            1: 'Usando'
        }

        //SI EL ARREGLO TIENE IPS
        //CREAR Y LLENAR LA TABLA
        //CREAMOS EL THEAD
        const ipsTHEAD = document.createElement('THEAD');
        const trHead = document.createElement('TR');
        const thHeadIp = document.createElement('TH');
        thHeadIp.textContent = 'Ip';
        const thHeadHost = document.createElement('TH');
        thHeadHost.textContent = 'Host';
        const thHeadUser = document.createElement('TH');
        thHeadUser.textContent = 'Usuario';
        const thHeadEmail = document.createElement('TH');
        thHeadEmail.textContent = 'Correo usuario';
        const thHeadOption = document.createElement('TH');
        trHead.appendChild(thHeadIp);
        trHead.appendChild(thHeadHost);
        trHead.appendChild(thHeadUser);
        trHead.appendChild(thHeadEmail);
        trHead.appendChild(thHeadOption);
        ipsTHEAD.appendChild(trHead);
        const ipsTBODY = document.createElement('TBODY');
        

        //RECORRER EL OBJETO arrayIps Y MOSTRAR LA INFORMACION DE CADA ip
        arrayIps.forEach( ip => {
            
            //CREAR TR DEL BODY
            const trBody = document.createElement('TR');
            trBody.dataset.ipId = ip.id;

            //CREAR LOS TD
            const tdIp = document.createElement('TD');
            tdIp.textContent = ip.fi_octet+'.'+ip.s_octet+'.'+ip.t_octet+'.'+ip.fo_octet;
            tdIp.classList.add('editar-ip');

            //VALIDAR QUE SOLO SUPER ADMIN Y ADMIN PUEDEN EDITAR LA IP
            if (admin.role === 's_admin' || admin.role === 'admin') {
                //VALIDAR QUE LA IP ESTÉ EN USO
                if (ip.usingg === '1') {
                    tdIp.addEventListener('click', function(){
                        showForm(true, {...ip});
                    });
                }
            }

            const tdHost = document.createElement('TD');
            tdHost.textContent = ip.host;

            const tdUser = document.createElement('TD');
            tdUser.textContent = ip.name+' '+ip.surnames;

            const tdEmail = document.createElement('TD');
            tdEmail.textContent = ip.email;

            //CONTENEDOR DEL BOTON USAR O DEJAR DE USAR
            const tdButton = document.createElement('TD');
            const usinggOption = document.createElement('DIV');
            usinggOption.classList.add('opcion');

            //BOTON PARA MOSTRAR EL ESTADO USINGG DE LA IP
            const btnUsingg = document.createElement('BUTTON');
            btnUsingg.classList.add('btn-usingg');
            btnUsingg.classList.add(`${usinggs[ip.usingg].toLowerCase()}`);
            btnUsingg.textContent = usinggs[ip.usingg];
            btnUsingg.dataset.usinggIp = ip.usingg;

            //VALIDAR SI EL USINGG ES 0 O 1
            if (ip.usingg === '0') {
                btnUsingg.onclick = function (){
                    showForm(false, {...ip});
                }
            }else{
                btnUsingg.onclick = function (){
                    confirmStopUsing({...ip});
                }
            }
            
            

            //VALIDAR QUE SOLO SUPER ADMIN Y ADMIN PUEDEN CAMBIAR LA IP
            if (admin.role === 's_admin' || admin.role === 'admin') {
                usinggOption.appendChild(btnUsingg);
            }

            tdButton.appendChild(usinggOption);       

            //AGREGAR LOS TD AL TR
            trBody.appendChild(tdIp);
            trBody.appendChild(tdHost);
            trBody.appendChild(tdUser);
            trBody.appendChild(tdEmail);
            trBody.appendChild(tdButton);

            //AGREGAR AL BODY LOS TR
            ipsTBODY.appendChild(trBody);

            //AGREGAR EL THEAD Y TBODY AL TABLE
            const containerIps = document.querySelector('#listado-ips');//table
            containerIps.appendChild(ipsTHEAD);
            containerIps.appendChild(ipsTBODY);

        });
    }

    //FUNCIONES PARA CALCULAR TAREAS PENDIENTES Y COMPLETAS
    function totalUnused(){
        //filter(): Creará un arreglo nuevo con las ips que tienen ussing 0 diferente a 1
        const totalUnused = ips.filter( ip => ip.usingg === '0');
        const unusedRadio = document.querySelector('#sin-uso');//radio de sin usar

        //validar si hay elementos en el arreglo de totalUnused
        if (totalUnused.length === 0) {
            unusedRadio.disabled = true;
        }else{
            unusedRadio.disabled = false;
        }
    }
    function totalUsing(){
        //filter(): Creará un arreglo nuevo con las ips que tienen ussing 1 diferente a 0
        const totalUsing = ips.filter( ip => ip.usingg === '1');
        const usingRadio = document.querySelector('#usando');//radio de usando

        //validar si hay elementos en el arreglo de totalUsing
        if (totalUsing.length === 0) {
            usingRadio.disabled = true;
        }else{
            usingRadio.disabled = false;
        }
    }


    //FUNCION PARA MOSTRAR EL FORMULARIO
    function showForm(edit = false, ip){
        
        const modal = document.createElement('DIV');
        modal.classList.add('modals');
        modal.innerHTML = `
            <form method="POST" class="formulario" novalidate>
                <h3 class="modal-title descripcion-pagina">${edit ? 'Editar host' : 'Asigna a un host la IP '+ip.fi_octet+'.'+ip.s_octet+'.'+ip.t_octet+'.'+ip.fo_octet}</h3>

                <div class="campo" id="campo-host">
                    <label for="host">Nombre Equipo</label>
                    <input type="text" 
                           name="host" 
                           id="host"
                           value="${edit ? ip.host : ''}"
                           placeholder="${edit ? 'Nuevo host' : 'Nombre equipo'}">
                </div>

                <div class="campo" id="campo-name">
                    <label for="name">Nombre usuario</label>
                    <input type="text" 
                           name="name" 
                           id="name"
                           value="${edit ? ip.name : ''}"
                           placeholder="${edit ? 'Nuevo usuario' : 'Asigna usuario'}">
                </div>

                <div class="campo" id="campo-surnames">
                    <label for="surnames">Apellidos usuario</label>
                    <input type="text" 
                           name="surnames" 
                           id="surnames"
                           value="${edit ? ip.surnames : ''}"
                           placeholder="Apellidos usuario">
                </div>

                <div class="campo" id="campo-email">
                    <label for="email">Correo usuario</label>
                    <input type="text" 
                           name="email" 
                           id="email"
                           value="${edit ? ip.email : ''}"
                           placeholder="${edit ? 'Nuevo correo' : 'Correo usuario'}">
                </div>

                <div class="opciones">
                    <button type="submit" class="button btn-submit">${edit ? 'Guardar' : 'Asignar'}</button>
                    <button type="button" class="button btn-cerrar">Cerrar</button>
                </div>
            </form>
        `;

        setTimeout(() => {
            const form = document.querySelector('.formulario');
            form.classList.add('animar');
        }, 0);

        //CERRAR MODAL CON DELEGATION
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

            //DENTRO DE TODO EL MODAL, SELECCIONAR EL BOTON AÑADIR host
            if (e.target.classList.contains('btn-submit')) {
                const nameHost = document.querySelector('#host').value.trim();
                const nameUser = document.querySelector('#name').value.trim();
                const surnamesUser = document.querySelector('#surnames').value.trim();
                const emailUser = document.querySelector('#email').value.trim();

                //VALIDAR EL FORMULARIO
                if (nameHost === '' || nameUser === '' || surnamesUser === '' || emailUser === '') {
                    showAlert('Completa correctamente el formulario', 'error', document.querySelector('.modal-title'));
                    return;
                }
                if (!expressions.host.test(nameHost)) {
                    showAlert("Coloca un nombre de host más corto, puedes usar '-' ó '_'", 'error', document.querySelector('.modal-title'));
                    return;
                }
                if (!expressions.name.test(nameUser)) {
                    showAlert('Coloca un nombre para el usuario válido', 'error', document.querySelector('.modal-title'));
                    return;
                }
                if (!expressions.surnames.test(surnamesUser)) {
                    showAlert('Coloca apellidos para el usuario válidos', 'error', document.querySelector('.modal-title'));
                    return;
                }
                if (!expressions.email.test(emailUser)) {
                    showAlert('Coloca un correo válido', 'error', document.querySelector('.modal-title'));
                    return;
                }


                //EVALUAR SI SE ESTA EDITANDO O CREANDO NUEVO HOST
                if (edit) {
                    ip.host = nameHost;
                    ip.name = nameUser;
                    ip.surnames = surnamesUser;
                    ip.email = emailUser;
                    addHost(ip);
                }else{
                    ip.host = nameHost;
                    ip.name = nameUser;
                    ip.surnames = surnamesUser;
                    ip.email = emailUser;
                    changeUsingg(ip);
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


    
    //CONFIRMAR DEJAR DE USAR LA IP
    function confirmStopUsing(ip){
        Swal.fire({
            title: '¿Deseas dejar de usar esta IP? '+ip.fi_octet+'.'+ip.s_octet+'.'+ip.t_octet+'.'+ip.fo_octet,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                ip.host = '';
                ip.name = '';
                ip.surnames = '';
                ip.email = '';
                changeUsingg(ip);
            }
        });
    }


    //CAMBIAR EL ESTADO USINGG DE LA IP
    function changeUsingg(ip){
        //SI estado ES IGUAL A 1, PONLO EN 0, SI NO ES IGUAL A 1, PONLO EN 1
        const newUsingg = ip.usingg === "1" ? "0" : "1";
        ip.usingg = newUsingg;
        addHost(ip);
    }



    //FUNCION PARA AGREGAR EL HOST
    async function addHost(ip){

        const { id, idNetwork, fi_octet, s_octet, t_octet, fo_octet, host, name, surnames, email, usingg } = ip;
        
        //formdata siempre se usa para hacer peticiones
        const data = new FormData();

        //Agregar la informacion a formData para enviar al BACKEND
        data.append('id', id);
        data.append('idNetwork', idNetwork);
        data.append('fi_octet', fi_octet);
        data.append('s_octet', s_octet);
        data.append('t_octet', t_octet);
        data.append('fo_octet', fo_octet);
        data.append('host', host);
        data.append('name', name);
        data.append('surnames', surnames);
        data.append('email', email);
        data.append('usingg', usingg);
        data.append('url', getNetworkId());

        //SIEMPRE USAR TRY-CATCH PARA HACER CONEXIONES WEBSERVICE
        try {
            //PRIMER await: CONEXION A LA API
            const url = 'http://localhost:8000/api/host';
            const result = await fetch(url, {
                method: 'POST',
                body: data
            });

            //OBTENER LA RESPUESTA DEL BACKEND (API)
            const response = await result.json();

            if (response.type === 'exito') {
                Swal.fire({
                    icon: 'success',
                    title: response.title,
                    text: response.message
                });

                //QUITAR EL MODAL DEL FORMULARIO
                const modal = document.querySelector('.modals');
                if (modal) {
                    modal.remove();
                }

                //ACTUALIZAR LA IP EN TIEMPO REAL DOM VIRTUAL
                ips = ips.map(memoryIP => {//hiteramos el arreglo para crear uno nuevo
                    //Evaluar si el id de la ip es igual al que se le ha asignado
                    if(memoryIP.id === id) {
                        //ASIGNAR LOS NUEVOS VALORES
                        memoryIP.host = host;
                        memoryIP.name = name;
                        memoryIP.surnames = surnames;
                        memoryIP.email = email;
                        memoryIP.usingg = usingg;
                    } 

                    //Retornar la ip asignada
                    return memoryIP;
                });
                    
                //Mostrar las ips para generar de nuevo el html
                showIps();
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                })
                //QUITAR EL MODAL DEL FORMULARIO
                const modal = document.querySelector('.modals');
                if (modal) {
                    modal.remove();
                }
                return;
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    //FUNCION PARA TRAER LA URL DE LA RED
    function getNetworkId(){
        //LEER LA URL, PARA PASARLE id= AL BACKEND
        const NetworkParams = new URLSearchParams(window.location.search);//escribir en la consola window.location
        //fromEntries: Metodo que hitera en un objeto
        const network = Object.fromEntries(NetworkParams.entries());//entries(): trae el resultado del objeto
        return network.id;
    }

    //LIMPIAR EL DOM DONDE SE MUESTRAN LAS TAREAS
    function cleanIps(){
        const ipList = document.querySelector('#listado-ips');

        while (ipList.firstChild) {//mientras haya elementos
            ipList.removeChild(ipList.firstChild);//elimina el primer elemento
        }
    }

})();//este (), ejecuta esta funcion inmediatamente