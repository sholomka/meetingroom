<?php
spl_autoload_register(function ($class) {
    $classFileName = __DIR__ . '/classes/' . $class . '.class.php';
    $dbFileName = __DIR__ . '/config/' . $class . '.class.php';
    
    if (file_exists($dbFileName)) {
        include $dbFileName;
    }

    if (file_exists($classFileName)) {
        include $classFileName;
    }
});

$params = json_decode(trim(file_get_contents('php://input')), true);
echo (new Meeting($params['method'], !empty($params['data']) ? $params['data'] : [], new MeetingReserve()))->result;





