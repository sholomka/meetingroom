<?php
class MeetingRoom {
    public function __construct()
    {
    }
    
    public function getList() {
        $query = "SELECT name, description, floor, seats_number, phone FROM meeting_room";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }
        
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

}