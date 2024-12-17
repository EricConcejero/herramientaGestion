<?php
session_start();

function openBD(){
    $servername = "localhost";
    $username = "admin";
    $pass = "admin";


    $conexion = new PDO("mysql:host=$servername;dbname=clexstask_db", $username, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->exec("SET NAMES 'utf8'");

return $conexion;
}


function closeBd($conexion) {
$conexion = null;


return $conexion;
}

function insertRegister($nombre, $email, $password) {
    $conexion = openBd();

    $password = password_hash($password, PASSWORD_DEFAULT);

    $sentenciaText = "insert into usuarios ( nombre_usuario, email, contrasena ) values ( :nombre, :email, :password)";
    
    $sentencia = $conexion->prepare($sentenciaText);

    $sentencia->bindParam(':nombre',$nombre);
    $sentencia->bindParam(':email',$email);
    $sentencia->bindParam(':password',$password);

    $sentencia->execute();
    
    $id_usuario = $conexion->lastInsertId();
    $_SESSION['id_usuario_actual'] = $id_usuario;

    $conexion = closeBd($conexion);
    
}

function loginUser($nombre, $password) {
    $conexion = openBD();

    $sentenciaText = "select id_usuario, contrasena from usuarios where nombre_usuario = :nombre";

    $sentencia = $conexion->prepare($sentenciaText);
    $sentencia->bindParam(':nombre', $nombre);

    $sentencia->execute();

    $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);

    if($resultado && password_verify($password, $resultado['contrasena'])){
        closeBd($conexion);
        $_SESSION['id_usuario_actual'] = $resultado['id_usuario'];
        return true;
    }else{
        closeBd($conexion);
        return false;
    }
}

function crearProyecto($nombre, $descripcion, $dataInicio, $dataFin) {
    try {
        $conexion = openBD();
        $conexion->beginTransaction();

        $sentenciaText = "insert into proyectos (nombre, descripcion, data_inicio, data_fin) values (:nombre, :descripcion, :data_inicio, :data_fin)";
        $sentencia = $conexion->prepare($sentenciaText);

        $sentencia->bindParam(':nombre', $nombre);
        $sentencia->bindParam(':descripcion', $descripcion);
        $sentencia->bindParam(':data_inicio', $dataInicio);
        $sentencia->bindParam(':data_fin', $dataFin);

        $sentencia->execute();

        $idProyecto = $conexion->lastInsertId();

        // guardar rol
        if (isset($_SESSION['id_usuario_actual'])) {
            $idUsuario = $_SESSION['id_usuario_actual'];

            $sentenciaText = "insert into usuario_proyecto_rol (id_usuario, id_proyecto, id_rol) values (:id_usuario, :id_proyecto, 1)";
            $sentencia = $conexion->prepare($sentenciaText);

            $sentencia->bindParam(':id_usuario', $idUsuario);
            $sentencia->bindParam(':id_proyecto', $idProyecto);

            $sentencia->execute();
        } else {
            throw new Exception("No se ha encontrado el ID del usuario.");
        }

        $conexion->commit();

    } catch (PDOException $e) {

        $conexion->rollback();

        echo "Error al crear proyecto: " . $e->getMessage();
    } finally {
        closeBd($conexion);
    }
}

function actualizarProyecto($nombre, $descripcion, $dataInicio, $dataFin, $idProyecto){
    try {
        $conexion = openBD();
        
        $sentenciaText = "update proyectos set nombre = :nombre, descripcion = :descripcion, data_inicio = :dataInicio, data_fin = :dataFin where id_proyecto = :idProyecto";
        $sentencia = $conexion->prepare($sentenciaText);
    
        $sentencia->bindParam(':nombre', $nombre);
        $sentencia->bindParam(':descripcion', $descripcion);
        $sentencia->bindParam(':dataInicio', $dataInicio);
        $sentencia->bindParam(':dataFin', $dataFin);
        $sentencia->bindParam(':idProyecto', $idProyecto);

        $sentencia->execute();
    
    } catch (PDOException $e) {
        echo "Error al actualizar proyecto: " . $e->getMessage();
    } finally {
        $conexion = closeBd($conexion);
    }
}
?>