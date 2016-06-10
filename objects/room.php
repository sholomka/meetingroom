<?php
abstract class Room {
    /**
     * Получения списка комнат
     * 
     * @return mixed
     */
    abstract public function getList();

    /**
     * Поиск комнат
     * 
     * @return mixed
     */
    abstract public function find();

    /**
     * Создание комнаты
     * 
     * @return mixed
     */
    abstract public function createRoom();

    /**
     * Редактирование комнаты
     * 
     * @return mixed
     */
    abstract public function editRoom();
}