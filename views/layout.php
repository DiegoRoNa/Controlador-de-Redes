<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <!--TITLE PARA CADA PAGINA-->
    <title><?=$titulo ?? '';?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Teko&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="build/css/app.css">
</head>
<body>

    <main>
        <?php echo $contenido; ?>
        <!--VARIABLE PARA CARGAR JS EN ALGUNAS PAGINAS-->
        <?php echo $script ?? ''; ?>
    </main>
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <script src="build/js/validar-formulario.js"></script>
    <script src="build/js/jquery.js"></script>
    <script src="build/js/popper.js"></script>
    <script src="build/js/bootstrap.js"></script>
</body>
</html>