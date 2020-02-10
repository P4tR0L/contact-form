<?php

$to_email = 'kaczmarek.patryk94@gmail.com';
$name = $_POST['name'];
$surname = $_POST['surname'];
$phone_number = $_POST['phone'];
$from_mail = $_POST['email'];
$subject = $_POST['subject'] . ' - ' . $name . "\r\n" . $surname . ' - ' . $phone_number;
$message = $_POST['message'];
$headers = 'From: "Contact form 1.0" <kontakt@webdev24.pl>' . "\r\n" .
      'Reply-To: ' . $from_mail . "\r\n" .
      'X-Mailer: PHP/' . phpversion();
mail($to_email,$subject,$message,$headers);

?>