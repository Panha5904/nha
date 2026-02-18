<?php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'weblearning';
    private $conn;

    public function __construct() {
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            throw $e;
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function query($sql) {
        try {
            $result = $this->conn->query($sql);
            if ($result === false) {
                throw new Exception("Query failed: " . $this->conn->error);
            }
            return $result;
        } catch (Exception $e) {
            error_log("Database Query Error: " . $e->getMessage());
            throw $e;
        }
    }

    public function escape($value) {
        return $this->conn->real_escape_string($value);
    }

    public function fetchAll($result) {
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function close() {
        $this->conn->close();
    }
}

// Example usage:
/*
try {
    $db = new Database();
    $result = $db->query("SELECT * FROM programming_languages");
    $languages = $db->fetchAll($result);
    $db->close();
} catch (Exception $e) {
    // Handle error
    echo "Error: " . $e->getMessage();
}
*/
?>
