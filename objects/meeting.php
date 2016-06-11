<?php
class Meeting extends Room {

    private $table_name = 'meeting';
   
    private $reserve;
    private $id;
    private $title;
    private $type;
    public $result;

    public function __construct($method, $params, Reserve $reserve)
    {
        $this->reserve = $reserve;
        
        if ($method != 'createReservation' && !empty($params)) {
            foreach($params as $k => $param) {
                $this->$k = $param;
            }
        }
        
        $this->result = $this->{$method}($params);
    }


    public function __get($name) {
        return $this->$name;
    }

    public function createReservation($params) {
        return  $this->reserve->createReservation($this, $params);
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


    public function getEventsList() {
        $query = "SELECT 
                    e.id, 
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
        
//        echo "<pre>"; print_r($arr);

        return json_encode($arr, JSON_UNESCAPED_UNICODE);
    }


    public function find() {
        
    }

    public function createRoom() {

    }

    public function editRoom() {

    }

}