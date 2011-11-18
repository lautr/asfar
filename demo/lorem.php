<?php
require_once 'includes/_core.php';
core::start(__DIR__ . '/' . 'includes/_layout.html','Complete Request at ' . getmicrotime(2));
?>
<h2>Partial Request at <?php print getmicrotime(2); ?></h2>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
