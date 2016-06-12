<?php
class Meeting extends Room {
    /**
     * Имя таблицы
     *
     * @var string
     */
    private $table_name = 'meeting';

    /**
     * ID переговорной комнаты
     *
     * @var
     */
    private $id;

    /**
     * Название переговорной комнаты
     *
     * @var
     */
    private $title;

    /**
     * Тип встречи
     *
     * @var
     */
    private $type;

    /**
     * Возвращаемые данные
     * 
     * @var
     */
        public $result;

    /**
     * Конструктор
     *
     * Meeting constructor.
     * @param Reserve $method
     * @param $params
     * @param Reserve $reserve
     */
    public function __construct($method, $params, Reserve $reserve)
    {
        parent::__construct($reserve);
        
        if ($method != 'createReservation' && !empty($params)) {
            foreach($params as $k => $param) {
                $this->$k = $param;
            }
        }
        
        $this->result = $this->{$method}($params);
    }

    /**
     * Гетер
     *
     * @param $name
     * @return mixed
     */
    public function __get($name) {
        return $this->$name;
    }

    /**
     * Реализация метода получения списка комнат
     *
     * @return string
     */
    public function getList() {
        $query = "SELECT id, name, description, floor, seats_number, phone FROM {$this->table_name}";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }
        
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Реализация метода получения одной комнаты
     *
     * @return string
     */
    public function getOne() {
        $query = "SELECT 
                    id, 
                    name, 
                    description, 
                    floor, 
                    seats_number, 
                    phone
                  FROM {$this->table_name} 
                  WHERE id = {$this->id}";
        
        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение списка событий
     *
     * @return string
     */
    public function getEventsList() {
        $query = "SELECT 
                    e.id, 
                    e.m_id, 
                    e.title,
                    e.applicant, 
                    e.starts_at, 
                    e.ends_at, 
                    et.type
                  FROM {$this->table_name} m
                    INNER JOIN events e ON m.id = e.m_id
                    INNER JOIN events_type et ON e.type = et.id
                  WHERE e.m_id = {$this->id}";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение списка типов событий
     *
     * @return string
     */
    public function getEventsTypeList() {
        $query = "SELECT 
                    id, 
                    type
                  FROM events_type";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }
        $arr = [];
        foreach ($result as $item) {
            $arr[$item['type']] = $item['id'];
        }
        
        return json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
}