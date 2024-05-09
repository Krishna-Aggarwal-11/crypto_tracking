<?php

class DB
{
    public $db_host = "localhost";
    public $db_user = "root";
    public $db_password = "";
    public $db_databse = "crypto";

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_databse, $this->db_user, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error";
        }
    }
}
