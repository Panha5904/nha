<?php
require_once 'config.php';

// Test database connection
if ($conn) {
    echo "Database connection successful!<br>";

    // Test query
    $query = "SELECT * FROM programming_languages";
    $result = $conn->query($query);

    if ($result) {
        echo "Number of records: " . $result->num_rows . "<br>";
        echo "<br>Sample data:<br>";
        while ($row = $result->fetch_assoc()) {
            echo "Language: " . $row['name'] . "<br>";
        }
    } else {
        echo "Error executing query: " . $conn->error;
    }
} else {
    echo "Database connection failed!";
}
?>
