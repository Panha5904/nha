<?php
require_once '../backend/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>WEBLEARNING — Lessons</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../assets/style.css">
    <link rel="stylesheet" href="style.css">
    <script src="../assets/drawer.js" defer></script>
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
    <meta name="theme-color" content="#6366F1">
    <script src="../assets/auth.js" defer></script>
    <script defer src="script.js"></script>
    <style>
        .logo-container {
            width: 28px;
            height: 28px;
        }
        .logo-java {
            background-color: #00000010;
            border-radius: 4px;
            padding: 2px;
        }
    </style>
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <?php include '../includes/header.php'; ?>

    <main class="max-w-6xl mx-auto px-4 py-12">
        <h1 class="text-4xl font-extrabold mb-6 text-slate-800 border-b pb-2">Explore Programming Languages</h1>

        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 class="text-2xl font-bold mb-3 text-slate-700">Programming Languages</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full text-left divide-y divide-slate-200">
                    <thead>
                        <tr class="text-sm text-slate-500 uppercase tracking-wider">
                            <th class="py-3 pr-6">Language</th>
                            <th class="py-3 pr-6">Primary Use Cases</th>
                            <th class="py-3 pr-6">Recommended Starting Courses/Platforms</th>
                        </tr>
                    </thead>
                    <tbody id="languages-table">
                        <!-- Data will be loaded dynamically via JavaScript -->
                    </tbody>
                </table>
            </div>
        </section>

        <div class="flex gap-3">
            <button id="export-csv" class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md">Export to CSV</button>
            <button id="copy-sheets" class="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition">Copy for Sheets</button>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
</body>
</html>
