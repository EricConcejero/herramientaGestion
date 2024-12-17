<?php

include('conexionBD.php');


if (isset($_POST['proyectoId'])) {
    $_SESSION['id_proyecto_actual'] = $_POST['proyectoId'];
    header('Location: ../htdocs/proyecto.html');
}

if (isset($_POST['insert'])) {
    insertRegister($_POST['nombre'], $_POST['email'], $_POST['password']);
    
    header('Location: ../htdocs/clexstask.html');
    exit();
}

if (isset($_POST['crearProyecto'])) {
    crearProyecto($_POST['nombre'], $_POST['descripcion'], $_POST['fechaInicio'], $_POST['fechaFin']);
    
    header('Location: ../htdocs/clexstask.html');
    exit();
}

if (isset($_POST['actualizarProyecto'])) {
    actualizarProyecto($_POST['nombre'], $_POST['descripcion'], $_POST['fechaInicio'], $_POST['fechaFin'], $_POST['idProyecto']);
    
    header('Location: ../htdocs/clexstask.html');
    exit();
}

?>