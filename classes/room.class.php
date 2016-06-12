<?php
abstract class Room {
    /**
     * Объект резервирования комнаты
     *
     * @var Reserve
     */
    private $reserve;

    /**
     * Конструктор
     * 
     * Room constructor.
     * @param Reserve $reserve
     */
    public function __construct(Reserve $reserve)
    {
        $this->reserve = $reserve;
    }

    /**
     * Получения списка комнат
     * 
     * @return mixed
     */
    abstract public function getList();

    /**
     * Получения одной комнаты
     *
     * @return mixed
     */
    abstract public function getOne();

    /**
     * Резервирование комнаты
     *
     * @param $params
     * @return mixed
     */
    public function createReservation($params) {
        return  $this->reserve->createReservation($this, $params);
    }

    /**
     * Обновление информации о резервировании комнты
     *
     * @param $params
     * @return mixed
     */
    public function updateReservation($params) {
        return  $this->reserve->updateReservation($this, $params);
    }

    /**
     * Отмена резервирования комнаты
     *
     * @param $params
     * @return mixed
     */
    public function deleteReservation($params) {
        return  $this->reserve->deleteReservation($this, $params);
    }
}