<?php
class Meeting extends Room {

    private $table_name = 'meeting';
    private $method = '';
    private $id = '';
    public $result = '';

    public function __construct($params)
    {
        foreach($params as $k => $param) {
            $this->$k = $param;
        }

        $this->result = $this->{$this->method}();
    }
    
    public function getList() {
        $query = "SELECT id, name, description, floor, seats_number, phone FROM {$this->table_name}";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }
        
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    public function getOne() {
        $query = "SELECT 
                    m.id, 
                    m.name, 
                    m.description, 
                    m.floor, 
                    m.seats_number, 
                    m.phone,
                    e.title,
                    e.starts_at,
                    e.ends_at,
                    et.title AS type
                  FROM {$this->table_name} m
                    INNER JOIN events e ON m.id = e.m_id
                    INNER JOIN events_type et ON e.type = et.id
                  WHERE m.id = {$this->id}";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }


    public function find() {
        
    }

    public function createRoom() {

    }

    public function editRoom() {

    }

}