<?php
include_once('config/database.php');
include_once('objects/room.php');
include_once('objects/meeting.php');
include_once('objects/reserve.php');
include_once('objects/meetingreserve.php');

$params = json_decode(trim(file_get_contents('php://input')), true);

echo (new Meeting($params['method'], $params['data'], new MeetingReserve()))->result;





