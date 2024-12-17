window.addEventListener('load', () => {
    fetch('../php/obtenerTareas.php')
        .then(response => response.json())
        .then(tareas => {
            mostrarTareas(tareas);
        })
        .catch(error => {
            console.error('Hubo un error al cargar las tareas:', error);
        });
});

function mostrarTareas(tareas) {
    const containerTareas = document.getElementById('tareasLista');

    containerTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const divTarea = document.createElement('div');
        divTarea.classList.add('tareaItem');
        divTarea.setAttribute('data-id', tarea.id_tarea);

        const nombreTarea = document.createElement('h3');
        nombreTarea.textContent = tarea.nombre;

        const descripcionTarea = document.createElement('p');
        descripcionTarea.textContent = tarea.descripcion;

        divTarea.appendChild(nombreTarea);
        divTarea.appendChild(descripcionTarea);

        containerTareas.appendChild(divTarea);
    });
}