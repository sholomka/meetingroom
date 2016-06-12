<?php

abstract class Reserve {
    /**
     * Резервирование комнаты
     * 
     * @param Room $room
     * @return mixed
     */
    abstract function createReservation(Room $room);

    /**
     * Обновление информации об резервировании
     * 
     * @param Room $room
     * @return mixed
     */
    abstract function updateReservation(Room $room);

    /**
     * Отмена резервирования
     * 
     * @param Room $room
     * @return mixed
     */
    abstract function deleteReservation(Room $room);
}