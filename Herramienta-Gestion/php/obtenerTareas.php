<?php

require_once('conexionBD.php');

header('Content-Type: application/json');

$conexion = openBD();
$id_proyecto = $_SESSION['id_proyecto_actual'];


$sentenciaText = "select* from tarea where id_proyecto = :idProyecto";

$sentencia = $conexion->prepare($sentenciaText);


$sentencia->bindParam(':idProyecto', $id_proyecto);

$sentencia->execute();

$resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>