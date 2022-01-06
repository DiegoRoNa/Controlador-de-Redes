
(function(){

    const hosting = '';

    //MOSTRAR LAS IPS
    getIps();

    let ips = [];
    let filtered = [];
    let admin = [];

    //EXPRESION REGULAR PARA LOS INPUT DE LOS FORMULARIOS
    const expressions = {
        host: /^[a-zA-Z0-9\_\-\s]{1,20}$/,
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        surnames: /^[a-zA-ZÀ-ÿ\s]{1,80}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    //FILTROS DE BUSQUEDA
    const filters = document.querySelectorAll('#filtros input[type="radio"]');
    filters.forEach( radio => {
        radio.addEventListener('input', filterIP);
    });

    function filterIP(e){
        
        const filter = e.target.value;
        
        //Si el filtro es direfente a TODAS
        if (filter !== '') {
            filtered = ips.filter( ip => ip.usingg === filter);
        }else{
            filtered = [];
        }

        showIps();
    }

    //FUNCION PARA CONSULTAR LAS IPS A LA API
    async function getIps(){

        try {
            //OBTENER RED
            const id = getNetworkId();
            
            const url = hosting+`/api/ips?id=${id}`;
            const result = await fetch(url);

            const response = await result.json();

            ips = response.ips;
            admin = response.session;
            showIps();
            
        } catch (error) {
            console.log(error);
        }
    }

    function showIps(){

        cleanIps();

        //CALCULAR IPS EN UNO Y SIN USAR
        totalUnused();
        totalUsing();

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

    //FUNCIONES PARA CALCULAR IPS EN USO Y SIN USAR
    function totalUnused(){
        
        const totalUnused = ips.filter( ip => ip.usingg === '0');
        const unusedRadio = document.querySelector('#sin-uso');

        //validar si hay elementos en el arreglo de totalUnused
        if (totalUnused.length === 0) {
            unusedRadio.disabled = true;
        }else{
            unusedRadio.disabled = false;
        }
    }
    function totalUsing(){

        const totalUsing = ips.filter( ip => ip.usingg === '1');
        const usingRadio = document.querySelector('#usando');

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
        
        const newUsingg = ip.usingg === "1" ? "0" : "1";
        ip.usingg = newUsingg;
        addHost(ip);

    }

    //FUNCION PARA AGREGAR EL HOST
    async function addHost(ip){

        const { id, idNetwork, fi_octet, s_octet, t_octet, fo_octet, host, name, surnames, email, usingg } = ip;
        
        const data = new FormData();
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

        //CONECTAR A LA API
        try {

            const url = hosting+'/api/host';
            const result = await fetch(url, {
                method: 'POST',
                body: data
            });

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
                ips = ips.map(memoryIP => {
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
        const NetworkParams = new URLSearchParams(window.location.search);

        //fromEntries: Metodo que hitera en un objeto
        const network = Object.fromEntries(NetworkParams.entries());
        return network.id;
    }

    //LIMPIAR EL DOM DONDE SE MUESTRAN LAS IPS
    function cleanIps(){
        const ipList = document.querySelector('#listado-ips');

        while (ipList.firstChild) {
            ipList.removeChild(ipList.firstChild);
        }
    }

})();