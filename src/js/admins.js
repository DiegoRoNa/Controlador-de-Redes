//IIFE

//TODO DENTRO DE ESTE CALLBACK, SE PROTEGE, ES DECIR:
//TOAS VARIABLES Y FUNCIONES DEFINIDAS EN ESTE ARCHIVO, NO PUEDEN SER EJECUTADAS DESDE OTRO
(function(){

    //MOSTRAR ADMINS
    getAdmins();
    let admins = []; //DOM VIRTUAL: PASO 1
    let filtered = [];//arreglo para los filtros
    let adminSession = [];

    //EXPRESION REGULAR PARA LOS INPUT DE LOS FORMULARIOS
    const expressions = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        surnames: /^[a-zA-ZÀ-ÿ\s]{1,80}$/, // Letras y espacios, pueden llevar acentos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{6,10}$/, // 6 a 10 digitos.
        role: /^[a-z_]{1,7}$/
    }

    //ROLE DE LOS ADMINS
    const roles = {
        'guest': 'Invitado',
        'admin': 'Administrador',
        's_admin': 'Super-Administrador'
    }

    //boton para mostrar el modal de agregar red
    const btnNewAdmin = document.querySelector('#agregar-admin');
    btnNewAdmin.addEventListener('click', function(){
        showForm();
    });


    //FILTROS DE BUSQUEDA
    const filters = document.querySelectorAll('#filtros input[type="radio"]');

    //Hiterar sobre los input para añadirles un evento
    filters.forEach( radio => {
        radio.addEventListener('input', filterAdmin);
    });
    function filterAdmin(e){
        //VALUE DE LOS INPUT
        const filter = e.target.value;
        
        //Si el filtro es direfente a TODAS
        if (filter !== '') {
            //FILTER: Hiteramos y creamos un nuevo arreglo con cada tarea por el estado 
            filtered = admins.filter( admin => admin.role === filter);
        }else{
            filtered = [];
        }

        showAdmins();
    }




    //FUNCION PARA CONSULTAR LOS ADMINS A LA API
    async function getAdmins(){
        try {
            //PRIMER await: CONEXION A LA API
            const url = 'http://diegorona.com.devel/api/admins';
            const result = await fetch(url);

            //RESPUESTA DE LA API
            const response = await result.json();

            //DOM VIRTUAL: PASO 2
            //ASIGNAR LOS ADMINS EN EL ARREGLO DECLARADO AL INICIO
            admins = response.admins;
            adminSession = response.session;
            showAdmins();

        } catch (error) {
            console.log(error);
        }
    }


    //FUNCION PARA MOSTRAR LOS ADMINS
    function showAdmins(){
        //DOM VIRTUAL: PASO 5
        //Limipiar el html donde se muentran los ADMINS
        cleanAdmins();

        //VERIFICACION DE LOS ROLES DE LOS ADMINS
        totalSuperAdmin();
        totalAdmin();
        totalGuest();

        //ASGINAMOS EL ARREGLO QUE CORRESPONDA AL FILTRO
        //SI filtered CONTIENE ALGO, arrayAdmins CONTIENE EL VALOR DE filtered
        //SI NO, CONTIENE EL VALOR DE admins
        const arrayAdmins = filtered.length ? filtered : admins;
 
        //SI EL ARREGLO arrayAdmins ESTÁ VACIO
        if (arrayAdmins.length === 0) {
            const containerAdmins = document.querySelector('#listado-admins');//table
            const noAdminsTHEAD = document.createElement('THEAD');
            const noAdminsTR = document.createElement('TR');
            noAdminsTR.classList.add('table-light');
            const noAdminsTH = document.createElement('TH');
            noAdminsTH.classList.add('fuente-roja');
            noAdminsTH.textContent = 'No tienes administradores';

            noAdminsTR.appendChild(noAdminsTH);
            noAdminsTHEAD.appendChild(noAdminsTR)
            containerAdmins.appendChild(noAdminsTHEAD);
            return;
        }


        //SI EL ARREGLO TIENE ADMINS
        //CREAR Y LLENAR LA TABLA
        //CREAMOS EL THEAD
        const adminsTHEAD = document.createElement('THEAD');
        const trHead = document.createElement('TR');
        const thHeadAdmin = document.createElement('TH');
        thHeadAdmin.textContent = 'Nombre';
        const thHeadEmail = document.createElement('TH');
        thHeadEmail.textContent = 'Correo';
        const thHeadRol = document.createElement('TH');
        thHeadRol.textContent = 'Rol';
        const thHeadOption = document.createElement('TH');
        trHead.appendChild(thHeadAdmin);
        trHead.appendChild(thHeadEmail);
        trHead.appendChild(thHeadRol);
        trHead.appendChild(thHeadOption);
        adminsTHEAD.appendChild(trHead);
        const adminsTBODY = document.createElement('TBODY');

        arrayAdmins.forEach( admin => {
            
            //CREAR TR DEL BODY
            const trBody = document.createElement('TR');
            trBody.classList.add(admin.role);
            if (admin.token !== '') {
                trBody.classList.add('sin-confirmar');    
            }
            trBody.dataset.adminId = admin.id;

            //CREAR LOS TD
            const tdAdmin = document.createElement('TD');
            tdAdmin.classList.add('editar-admin');
            tdAdmin.textContent = admin.name+' '+admin.surnames;
            
            
            //VALIDAR QUE SOLO SUPER ADMIN PUEDE EDITAR LOS ADMINS
            if (adminSession.role === 's_admin') {
                tdAdmin.addEventListener('click', function(){
                    showForm(true, {...admin});
                });
            }

            const tdEmail = document.createElement('TD');
            tdEmail.textContent = admin.email;
            
            const tdRole = document.createElement('TD');
            tdRole.textContent = roles[admin.role];

            //CONTENEDOR DE LOS BOTONES ENTRAR Y ELIMINAR
            const tdButton = document.createElement('TD');
            const deleteOption = document.createElement('DIV');
            deleteOption.classList.add('opcion');

            //BOTON ELIMINAR
            const btnDelete = document.createElement('BUTTON');
            btnDelete.classList.add('btn-eliminar');
            btnDelete.dataset.idAdmin = admin.id;
            btnDelete.textContent = 'Eliminar';

            //VALIDAR QUE SOLO SUPER ADMIN PUEDE EDITAR LOS ADMINS
            if (adminSession.role === 's_admin') {
                btnDelete.onclick = function(){
                    confirmDeleteAdmin({...admin});
                }
            }

            if (adminSession.role === 's_admin') {
                deleteOption.appendChild(btnDelete);
            }


            //AGREGAR EL BOTON AL DIV DEL BOTON
            tdButton.appendChild(deleteOption);

            //AGREGAR LOS TD AL TR
            trBody.appendChild(tdAdmin);
            trBody.appendChild(tdEmail);
            trBody.appendChild(tdRole);
            trBody.appendChild(tdButton);
            
            //AGREGAR AL BODY LOS TR
            adminsTBODY.appendChild(trBody);

            //AGREGAR EL THEAD Y TBODY AL TABLE
            const containerAdmins = document.querySelector('#listado-admins');//table
            containerAdmins.appendChild(adminsTHEAD);
            containerAdmins.appendChild(adminsTBODY);
        });

    }


    //FUNCIONES DEL MODAL FORMULARIO
    function showForm(edit = false, admin){
        const modal = document.createElement('DIV');
        modal.classList.add('modals');
        modal.innerHTML = `
            <form method="POST" class="formulario" novalidate>
                <h3 class="modal-title descripcion-pagina">${edit ? 'Editar Admin' : 'Agregar Admin'}</h3>

                <div class="campo" id="campo-name">
                    <label for="name">Nombre Admin</label>
                    <input type="text" 
                        name="name" 
                        id="name"
                        value="${edit ? admin.name : ''}"
                        placeholder="${edit ? 'Nuevo nombre' : 'Nombre Admin'}">
                </div>

                <div class="campo" id="campo-surnames">
                    <label for="surnames">Apellidos</label>
                    <input type="text" 
                        name="surnames" 
                        id="surnames"
                        value="${edit ? admin.surnames : ''}"
                        placeholder="Apellidos">
                </div>

                <div class="campo" id="campo-email">
                    <label for="email">Correo</label>
                    <input type="email" 
                        name="email" 
                        id="email"
                        value="${edit ? admin.email : ''}"
                        placeholder="${edit ? 'Nuevo correo' : 'Correo'}">
                </div>

                ${edit ? '' : `
                    <div class="campo" id="campo-password">
                        <label for="password">Contraseña</label>
                        <input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Contraseña">
                    </div>

                    <div class="campo" id="campo-password2">
                        <label for="password2">Confirmar Contraseña</label>
                        <input type="password" 
                            name="password2" 
                            id="password2" 
                            placeholder="Confirmar Contraseña">
                    </div>
                `}

                <div class="campo" id="campo-role">
                    <label for="role">Seleccione un role</label>
                    <select name="role" id="role">
                        <option value="">-- Seleccione un role --</option>
                        <option value="guest" ${edit && admin.role === 'guest' ? 'selected' : ''}>Invitado</option>
                        <option value="admin" ${edit && admin.role === 'admin' ? 'selected' : ''}>Admin</option>
                        <option value="s_admin" ${edit && admin.role === 's_admin' ? 'selected' : ''}>Super Admin</option>    
                    </select>
                </div>

                <div class="opciones">
                    <button type="submit" class="button btn-submit">${edit ? 'Guardar' : 'Crear Admin'}</button>
                    <button type="button" class="button btn-cerrar">Cerrar</button>
                </div>
            </form>
        `;

        setTimeout(() => {
            const form = document.querySelector('.formulario');
            form.classList.add('animarA');
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

            //DENTRO DE TODO EL MODAL, SELECCIONAR EL BOTON AÑADIR ADMIN
            if (e.target.classList.contains('btn-submit')) {
                if (edit) {
                    
                    const nameAdmin = document.querySelector('#name').value.trim();
                    const surnamesAdmin = document.querySelector('#surnames').value.trim();
                    const emailAdmin = document.querySelector('#email').value.trim();
                    const roleAdmin = document.querySelector('#role').value.trim();

                    //VALIDAR FORMULARIO
                    if (nameAdmin === '' || surnamesAdmin === '' || emailAdmin === '' || roleAdmin === '') {
                        showAlert('Completa correctamente el formulario', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.name.test(nameAdmin)) {
                        showAlert("El nombre debe contener menos de 40 caracteres y sin números", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.surnames.test(surnamesAdmin)) {
                        showAlert("Los apellidos deben contener menos de 80 caracteres y sin números", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.email.test(emailAdmin)) {
                        showAlert("Coloca un correo válido", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.role.test(roleAdmin)) {
                        showAlert("Coloca un rol válido", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    
                    admin.name = nameAdmin;
                    admin.surnames = surnamesAdmin;
                    admin.email = emailAdmin;
                    admin.role = roleAdmin;
                    editAdmin(admin);
                    
                }else{

                    const nameAdmin = document.querySelector('#name').value.trim();
                    const surnamesAdmin = document.querySelector('#surnames').value.trim();
                    const emailAdmin = document.querySelector('#email').value.trim();
                    const passwordAdmin = document.querySelector('#password').value.trim();
                    const password2Admin = document.querySelector('#password2').value.trim();
                    const roleAdmin = document.querySelector('#role').value.trim();

                    //VALIDAR FORMULARIO
                    if (nameAdmin === '' || surnamesAdmin === '' || emailAdmin === '' || passwordAdmin === '' || password2Admin === '' || roleAdmin === '') {
                        showAlert('Completa correctamente el formulario', 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.name.test(nameAdmin)) {
                        showAlert("El nombre debe contener menos de 40 caracteres y sin números", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.surnames.test(surnamesAdmin)) {
                        showAlert("Los apellidos deben contener menos de 80 caracteres y sin números", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.email.test(emailAdmin)) {
                        showAlert("Coloca un correo válido", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.password.test(passwordAdmin)) {
                        showAlert("La contraseña debe ser mínimo de 6 caracteres y máximo de 10", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (passwordAdmin !== password2Admin) {
                        showAlert("Las contraseñas son diferentes", 'error', document.querySelector('.modal-title'));
                        return;
                    }
                    if (!expressions.role.test(roleAdmin)) {
                        showAlert("Coloca un rol válido", 'error', document.querySelector('.modal-title'));
                        return;
                    }

                    addAdmin(nameAdmin, surnamesAdmin, emailAdmin, passwordAdmin, password2Admin, roleAdmin);

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


    //FUNCION PARA AGREGAR ADMIN
    async function addAdmin(name, surnames, email, password, password2, role){
        //formdata siempre se usa para hacer peticiones
        const data = new FormData();

        //Agregar la informacion a formData para enviar al BACKEND
        data.append('name', name);
        data.append('surnames', surnames);
        data.append('email', email);
        data.append('password', password);
        data.append('password2', password2);
        data.append('role', role);

        //SIEMPRE USAR TRY-CATCH PARA HACER CONEXIONES WEBSERVICE
        try {
            //PRIMER await: CONEXION A LA API
            const url = 'http://diegorona.com.devel/api/admin';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            //OBTENER LA RESPUESTA DEL BACKEND
            const result = await response.json();
            
            if (result.type === 'exito') {
                Swal.fire({
                    icon: 'success',
                    title: result.title,
                    text: result.message
                });

                //QUITAR EL MODAL DEL FORMULARIO
                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 500);

                //DOM VIRTUAL: PASO 3
                //AGREGAR EL OBJETO DE ADMIN AL GLOBAL DE ADMINS, IDENTICO AL DE LA BD
                const adminObj = {
                    id: String(result.id),
                    name: name,
                    surnames: surnames,
                    email: email,
                    role: role,
                    token: result.token,
                    confirm: result.confirm
                }
                
                //DOM VIRTUAL: PASO 4
                //CREAR UNA COPIA DE admins AGREGANDO adminObj
                admins = [...admins, adminObj];
                showAdmins();
            }else{
                Swal.fire({
                    icon: 'error',
                    title: response.title,
                    text: response.message
                });

                //QUITAR EL MODAL DEL FORMULARIO
                const modal = document.querySelector('.modals');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            }
            
        }catch (error){
            console.log(error);
            
        }
    }


    //FUNCION PARA EDITAR ADMINS
    async function editAdmin(admin){
        //CREAR EL FORMDATA() PARA MANDARLE LA INFORMACION NUEVA A LA API
        const { id, name, surnames, email, role, confirm } = admin;

        const data = new FormData();
        data.append('id', id);
        data.append('name', name);
        data.append('surnames', surnames);
        data.append('email', email);
        data.append('role', role);
        data.append('confirm', confirm);

        /**PARA PODER VISUALIZAR LOS DATOS QUE SE ENVIARÁN AL BACKEND
         * for( let valor of datos.values()){
            console.log(valor);
        }
         */

        try {
            const url = 'http://diegorona.com.devel/api/admin/update';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            //OBTENER LA RESPUESTA DEL BACKEND
            const result = await response.json();

            if (result.type === 'exito') {
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
                admins = admins.map(memoryAdmin => {//hiteramos el arreglo para crear uno nuevo
                    //Evaluar si el id de la red es igual al que se le da click
                    if (memoryAdmin.id === id) {
                        //cambiar el nombre al valor nuevo del click
                        memoryAdmin.name = name;
                        memoryAdmin.surnames = surnames;
                        memoryAdmin.email = email;
                        memoryAdmin.role = role;
                        memoryAdmin.confirm = confirm;

                    }

                    //Retornar la tarea actualizada
                    return memoryAdmin;
                });

                //Mostrar las redes para generar de nuevo el html
                showAdmins();
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    //FUNCION PARA CONFIRMAR ELIMINAR ADMIN
    function confirmDeleteAdmin(admin){
        Swal.fire({
            title: '¿Eliminar admin?', 
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            //Read more about isConfirmed, isDenied below
            if (result.isConfirmed) {
                deleteAdmin(admin);
            }
        });
    }
    async function deleteAdmin(admin){
        //CREAR EL FORMDATA() PARA MANDARLE LA INFORMACION NUEVA A LA API
        const { id, name, surnames, email, role, confirm } = admin;

        const data = new FormData();
        data.append('id', id);
        data.append('name', name);
        data.append('surnames', surnames);
        data.append('email', email);
        data.append('role', role);
        data.append('confirm', confirm);

        //CONECTAR CON LA API PARA ELIMINAR
        try {
            const url = 'http://diegorona.com.devel/api/admin/delete';
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
                admins = admins.filter( memoryAdmin => memoryAdmin.id !== admin.id );
                showAdmins();
            }else{
                //MOSTRAR MENSAJE DE ERROR
                Swal.fire('Hubo un error', result.message, 'error');
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //FUNCIONES PARA CALCULAR LOS ROLES DE LOS ADMINS
    function totalSuperAdmin(){
        //filter(): Creará un arreglo nuevo con los admins que tienen role s_admin
        const totalSuperAdmin = admins.filter( admin => admin.role === 's_admin');
        const sAdminRadio = document.querySelector('#s_admin');//radio s_admin

        //validar si hay elementos en el arreglo de totalSuperAdmin
        if (totalSuperAdmin.length === 0) {
            sAdminRadio.disabled = true;
        }else{
            sAdminRadio.disabled = false;
        }
    }

    function totalAdmin(){
        //filter(): Creará un arreglo nuevo con los admins que tienen role admin
        const totalAdmin = admins.filter( admin => admin.role === 'admin');
        const adminRadio = document.querySelector('#admin');//radio admin

        //validar si hay elementos en el arreglo de totalAdmin
        if (totalAdmin.length === 0) {
            adminRadio.disabled = true;
        }else{
            adminRadio.disabled = false;
        }
    }

    function totalGuest(){
        //filter(): Creará un arreglo nuevo con los admins que tienen role admin
        const totalGuest = admins.filter( admin => admin.role === 'guest');
        const guestRadio = document.querySelector('#guest');//radio guest

        //validar si hay elementos en el arreglo de totalGuest
        if (totalGuest.length === 0) {
            guestRadio.disabled = true;
        }else{
            guestRadio.disabled = false;
        }
    }


    //LIMPIAR EL DOM DONDE SE MUESTRAN LOS ADMINS
    function cleanAdmins(){
        const adminList = document.querySelector('#listado-admins');

        while (adminList.firstChild) {//mientras haya elementos
            adminList.removeChild(adminList.firstChild);//elimina el primer elemento
        }
    }

})();//este (), ejecuta esta funcion inmediatamente