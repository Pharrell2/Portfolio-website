<?php
require("vendor\phpmailer\phpmailer\src\PHPMailer.php");
require("vendor\phpmailer\phpmailer\src\Exception.php");
require("vendor\phpmailer\phpmailer\src\SMTP.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require 'vendor/autoload.php'; // het pad naar het PHPMailer autoload.php-bestand
 
// Verkrijg de gebruikersgegevens uit het aanmeldingsformulier
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];

// Verstuur de verificatie-e-mail
$mail = new PHPMailer(true);

 
try {
    // Server-instellingen
    $mail->isSMTP();
    $mail->Host = 'ssl://smtp.gmail.com'; // SMTP-serveradres
    $mail->SMTPAuth = true;
    $mail->Username = 'phelstone32@gmail.com'; // SMTP gebruikersnaam
    $mail->Password = 'mvoj mxhc hrfe agnv'; // SMTP wachtwoord
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
 
    // E-mail instellingen
    $mail->setFrom('your@example.com', 'Your Name'); // Afzender e-mail en naam
    $mail->addAddress($email, $firstname . ' ' . $lastname); // Ontvanger e-mail en naam
    $mail->isHTML(true);
    $mail->Subject = 'Signup Confirmation';
    $mail->Body    = '<p>You have been signed up successfully!</p>';

     // Verzend de e-mail
     $mail->send();
     echo 'Confirmation email has been sent.';
 } catch (Exception $e) {
     echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
 }
?>