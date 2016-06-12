<?php
spl_autoload_register(function ($class) {
    $classFileName = 'classes/' . $class . '.class.php';
    $dbFileName = 'config/' . $class . '.class.php';

    if (file_exists($dbFileName)) {
        include $dbFileName;
    }

    if (file_exists($classFileName)) {
        include $classFileName;
    }
});

$params = json_decode(trim(file_get_contents('php://input')), true);
echo (new Meeting($params['method'], $params['data'], new MeetingReserve()))->result;





