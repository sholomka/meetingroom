<?php

class MeetingReserve extends Reserve {
    function createReservation(Room $room, $params=[]) {

        $query = "DELETE FROM events";
        $res = Database::query($query);

        foreach ($params as $param) {
            $query = "INSERT INTO events
                      SET title = '{$param['title']}',
                          m_id = '{$param['id']}',
                          applicant = '{$param['applicant']}',
                          type = '{$param['type']}',
                          starts_at = '{$param['startsAt']}',
                          ends_at = '{$param['endsAt']}'
                          ";

            $res = Database::query($query);

            if (!$res) {
                return false;
            }
        }
    }
}