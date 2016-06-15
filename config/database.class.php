<?php
class Database {
    private static $host = "localhost";
    private static $db_name = "meeting";
    private static $username = "root";
    private static $password = "";
    private static $connect;

    public static function getConnection(){
        if (empty(self::$connect)) {
            try {
                self::$connect = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db_name .';charset=utf8', self::$username, self::$password);
            } catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
        }
        
        return self::$connect;
    }


    static function query($sql, $vars = array())
    {
        $res = self::getConnection()->prepare($sql);

        if ($res->execute($vars)) {
            return $res;
        } else {
            return false;
        }
    }

    static function numRows(&$res)
    {
        return is_bool($res) ? 0 : $res->rowCount();
    }

    static function fetchAll(&$res)
    {
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>