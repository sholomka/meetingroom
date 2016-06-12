<?php

class MeetingReserve extends Reserve {
    /**
     * Реализация метода резервирование переговорной комнаты
     * 
     * @param Room $room
     * @param array $params
     * @return bool
     */
    public function createReservation(Room $room, $params=[]) {
        $query = "DELETE FROM events WHERE m_id = '{$params[0]['m_id']}'";
        $res = Database::query($query);

        foreach ($params as $param) {
            $query = "INSERT INTO events
                      SET title = '{$param['title']}',
                          m_id = '{$param['m_id']}',
                          applicant = '{$param['applicant']}',
                          type = '{$param['type']}',
                          starts_at = '{$param['startsAt']}',
                          ends_at = '{$param['endsAt']}'
                          ";

            $res = Database::query($query);
            
            if (!$res) {
                return json_encode(['response' => 'Ошибка сохранения данных'], JSON_UNESCAPED_UNICODE);
            }
        }

        return json_encode(['response' => 'Данные успешно сохранены'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Реализация метода обновление информации об резервировании переговорной комнаты
     * 
     * @param Room $room
     * @param array $params
     * @return bool
     */
    public function updateReservation(Room $room, $params=[]) {
        $query = "UPDATE events
                    SET title = '{$params['title']}',
                        m_id = '{$params['m_id']}',
                        applicant = '{$params['applicant']}',
                        type = '{$params['type']}',
                        starts_at = '{$params['startsAt']}',
                        ends_at = '{$params['endsAt']}'
                   WHERE id = {$params['id']}   
                    ";
        $res = Database::query($query);

        if (!$res) {
            return false;
        }
    }

    /**
     * Реализация метода отмена резервирования переговорной комнаты
     * 
     * @param Room $room
     * @param array $params
     * @return bool
     */
    public function deleteReservation(Room $room, $params=[]) {
        $query = "DELETE FROM events WHERE id = {$params['id']}";
        $res = Database::query($query);

        if (!$res) {
            return false;
        }
    }
}