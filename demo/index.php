<?php
require_once 'includes/_core.php';
core::start(__DIR__ . '/' . 'includes/_layout.html','Complete Request at ' . getmicrotime(2));
?>
<h2>Partial Request at <?php print getmicrotime(2); ?></h2>
<p>Demo Start</p>
