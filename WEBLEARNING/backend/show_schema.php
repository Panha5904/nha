<?php
// show_schema.php — simple schema viewer for `programming_languages`
// Place this file in backend/ and open it in your browser (http://localhost/WEBLEARNING/backend/show_schema.php)

require_once 'Database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    $table = 'programming_languages';
    $sql = "SHOW COLUMNS FROM `" . $conn->real_escape_string($table) . "`";
    $result = $db->query($sql);
    $columns = $db->fetchAll($result);

} catch (Exception $e) {
    http_response_code(500);
    echo "<h2>Error connecting to database</h2>\n";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>\n";
    exit;
}

?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Schema: programming_languages</title>
    <style>
        body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:20px}
        table{border-collapse:collapse;width:100%;max-width:900px}
        th,td{border:1px solid #ddd;padding:8px;text-align:left}
        th{background:#f3f4f6}
    </style>
</head>
<body>
    <h1>Table schema: <?php echo htmlspecialchars($table); ?></h1>
    <p>This page runs <code>SHOW COLUMNS FROM <?php echo htmlspecialchars($table); ?></code> and displays the result.</p>

    <table>
        <thead>
            <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Null</th>
                <th>Key</th>
                <th>Default</th>
                <th>Extra</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($columns as $col): ?>
                <tr>
                    <td><?php echo htmlspecialchars($col['Field']); ?></td>
                    <td><?php echo htmlspecialchars($col['Type']); ?></td>
                    <td><?php echo htmlspecialchars($col['Null']); ?></td>
                    <td><?php echo htmlspecialchars($col['Key']); ?></td>
                    <td><?php echo htmlspecialchars($col['Default']); ?></td>
                    <td><?php echo htmlspecialchars($col['Extra']); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <p>Migration file: <code>backend/migration_add_fields.sql</code></p>
    <p>To apply the migration via PowerShell (MySQL client must be installed):</p>
    <pre><code>mysql -u root -p weblearning &lt; "d:\ProJect Development\Block Code Project\Web Project\WEBLEARNING\backend\migration_add_fields.sql"</code></pre>

    <p>If you use XAMPP, place the project under <code>htdocs</code> and import the SQL using phpMyAdmin or the command above. Make sure DB credentials in <code>backend/Database.php</code> match your MySQL user.</p>

</body>
</html>