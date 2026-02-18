<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'Database.php';

try {
    $db = new Database();

    function getLessons($db) {
        $sql = "SELECT * FROM programming_languages";
        $result = $db->query($sql);
        $languages = $db->fetchAll($result);
        return $languages;
    }

    function addLesson($db, $data) {
        $name = $db->escape($data['name']);
        $category = $db->escape($data['category']);
        $use_cases = $db->escape($data['use_cases']);
        $recommended_courses = $db->escape($data['recommended_courses']);
        $logo_url = isset($data['logo_url']) ? $db->escape($data['logo_url']) : '';

        $sql = "INSERT INTO programming_languages (name, category, use_cases, recommended_courses, logo_url)
                VALUES ('$name', '$category', '$use_cases', '$recommended_courses', '$logo_url')";

        try {
            $db->query($sql);
            return array("message" => "Lesson added successfully");
        } catch (Exception $e) {
            return array("error" => "Error: " . $e->getMessage());
        }
    }

    // Handle different HTTP methods
    $method = $_SERVER['REQUEST_METHOD'];
    $response = array();

    switch($method) {
        case 'GET':
            $response = getLessons($db);
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $response = addLesson($db, $data);
            break;
        default:
            $response = array("error" => "Method not allowed");
            break;
    }

    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database connection failed: " . $e->getMessage()));
} finally {
    if (isset($db)) {
        $db->close();
    }
}
?>
