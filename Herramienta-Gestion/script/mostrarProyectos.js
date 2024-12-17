window.addEventListener('load', () => {
    fetch('../php/obtenerProyecto.php')
        .then(response => response.json())
        .then(projectes => {
            mostrarProjectes(projectes);
        })
        .catch(error => {
            console.error('Hubo un error al cargar los proyectos:', error);
        });
});

function mostrarProjectes(projectes) {
    const containerProjectes = document.getElementById('proyectosLista');

    containerProjectes.innerHTML = '';

    projectes.forEach(projecte => {
        const divProjecte = document.createElement('div');
        divProjecte.classList.add('proyectoItem');
        divProjecte.setAttribute('data-id', projecte.id_proyecto);

        divProjecte.addEventListener('click', () => {
            const proyectoIdInput = document.getElementById('proyectoId');
            proyectoIdInput.value = projecte.id_proyecto;
            document.getElementById('proyectoForm').submit();
        });

        const nomProjecte = document.createElement('h3');
        nomProjecte.textContent = projecte.nombre;

        const descripcioProjecte = document.createElement('p');
        descripcioProjecte.textContent = projecte.descripcion;

        const editarBoto = document.createElement('button');
        editarBoto.type = 'button';
        editarBoto.textContent = 'Editar Proyecto';
        editarBoto.classList.add('btn-editar');

        editarBoto.addEventListener('click', (event) => {
            event.stopPropagation(); // esto evita que el evento se propague al div y asi poder clicar en el div sin que se abra el otro formulario
            mostrarFormulario(projecte.nombre, projecte.descripcion, projecte.data_inicio, projecte.data_fin, projecte.id_proyecto);
        });

        divProjecte.appendChild(nomProjecte);
        divProjecte.appendChild(descripcioProjecte);
        divProjecte.appendChild(editarBoto);

        containerProjectes.appendChild(divProjecte);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const crearProyectoBtn = document.getElementById("crearProyectoBtn");
  
    crearProyectoBtn.addEventListener("click", () => mostrarFormulario());
});
  
function mostrarFormulario(nombre = '', descripcion = '', data_inicio = '', data_fin = '', id_proyecto = '') {
    const existingForm = document.getElementById('formCrearProyecto');
    if (existingForm) {
        existingForm.remove();
    }

    const form = document.createElement('form');
    form.action = "../php/controller.php";
    form.method = "POST";
    form.id = "formCrearProyecto";
    form.classList.add('form-container');

    // Botón cerrar
    const botonCerrar = document.createElement('button');
    botonCerrar.type = 'button';
    botonCerrar.textContent = 'x';
    botonCerrar.classList.add('btn-cerrar');
    botonCerrar.addEventListener('click', () => cerrarFormulario());

    // Nombre
    const labelNombre = document.createElement('label');
    labelNombre.textContent = 'Nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'nombreProyecto';
    inputNombre.name = 'nombre';
    inputNombre.required = true;
    inputNombre.value = nombre;

    // descripción
    const labelDescripcion = document.createElement('label');
    labelDescripcion.textContent = 'Descripción:';
    const inputDescripcion = document.createElement('input');
    inputDescripcion.type = 'text';
    inputDescripcion.id = 'descripcionProyecto';
    inputDescripcion.name = 'descripcion';
    inputDescripcion.required = true;
    inputDescripcion.value = descripcion;

    // fecha inicio
    const labelFechaInicio = document.createElement('label');
    labelFechaInicio.textContent = 'Fecha Inicio:';
    const inputFechaInicio = document.createElement('input');
    inputFechaInicio.type = 'date';
    inputFechaInicio.id = 'fechaInicioProyecto';
    inputFechaInicio.name = 'fechaInicio';
    inputFechaInicio.required = true;
    inputFechaInicio.value = data_inicio;

    // fecha fin
    const labelFechaFin = document.createElement('label');
    labelFechaFin.textContent = 'Fecha Final:';
    const inputFechaFin = document.createElement('input');
    inputFechaFin.type = 'date';
    inputFechaFin.id = 'fechaFinProyecto';
    inputFechaFin.name = 'fechaFin';
    inputFechaFin.required = true;
    inputFechaFin.value = data_fin;

    // id proyecto
    if (id_proyecto) {
        const idProyectoInput = document.createElement('input');
        idProyectoInput.type = 'hidden';
        idProyectoInput.name = 'idProyecto';
        idProyectoInput.value = id_proyecto;
        
        form.appendChild(idProyectoInput);
    }

    // boton submit
    const button = document.createElement('button');
    button.type = 'submit';
    button.name = id_proyecto ? 'actualizarProyecto' : 'crearProyecto';
    button.textContent = id_proyecto ? 'Actualizar Proyecto' : 'Crear Proyecto';

    // elements formulari
    form.appendChild(botonCerrar);
    form.appendChild(labelNombre);
    form.appendChild(inputNombre);
    form.appendChild(labelDescripcion);
    form.appendChild(inputDescripcion);
    form.appendChild(labelFechaInicio);
    form.appendChild(inputFechaInicio);
    form.appendChild(labelFechaFin);
    form.appendChild(inputFechaFin);
    form.appendChild(button);

    // añadir formulari al doc
    document.body.appendChild(form);
}

function cerrarFormulario() {
    const form = document.getElementById('formCrearProyecto');
    if (form) {
        form.remove();
    }
}
