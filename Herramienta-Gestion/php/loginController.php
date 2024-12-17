<?php

    require_once('conexionBD.php');

    if(isset($_POST['login'])){
        if (loginUser($_POST['nombre'], $_POST['password'])) {
            header('Location: ../htdocs/clexstask.html');
            exit();
        }else{
            echo "datos incorrectos";
        }
    }

?>
