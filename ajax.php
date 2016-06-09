<?php
include_once('config/database.php');
include_once('objects/meetingroom.php');

$params = json_decode(trim(file_get_contents('php://input')), true);
echo (new MeetingRoom())->$params['method']();





