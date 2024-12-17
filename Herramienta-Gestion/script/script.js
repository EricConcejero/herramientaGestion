// funcion de toggle para el menu sirve para abrir y cerrar el menu
function toggleMenu() {
  document.body.classList.toggle('menu-abierto');
}

// cerrar formulario de crea proyecto
function cerrarFormulario() {
  const formularioProyecto = document.getElementById('formularioProyecto');
  formularioProyecto.style.display = 'none';
}

// form de crear proyecto
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.boton-menu');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }

  const crearProyectoBtn = document.getElementById('crearProyectoBtn');
  if (crearProyectoBtn) {
    crearProyectoBtn.addEventListener('click', () => {
      const formularioProyecto = document.getElementById('formularioProyecto');
      formularioProyecto.style.display = 'block';
    });
  }

  // boton cerrar formulario en el form de editar proyecto
  const btnCerrarFormulario = document.querySelector('.btn-cerrar');
  if (btnCerrarFormulario) {
    btnCerrarFormulario.addEventListener('click', cerrarFormulario);
  }
});
