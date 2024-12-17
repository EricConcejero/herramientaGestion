<?php

require_once('conexionBD.php');

header('Content-Type: application/json');

$conexion = openBD();


$sentenciaText = "select p.* from proyectos as p join usuario_proyecto_rol as up on p.id_proyecto = up.id_proyecto where up.id_usuario = :usuarioActual";

$sentencia = $conexion->prepare($sentenciaText);


$sentencia->bindParam(':usuarioActual', $_SESSION['id_usuario_actual']);

$sentencia->execute();

$resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>