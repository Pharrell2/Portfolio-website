<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // het pad naar het PHPMailer autoload.php-bestand

// Verkrijg de gebruikersgegevens uit het aanmeldingsformulier
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];

// Genereer een willekeurige verificatiecode
$verificationCode = substr(md5(uniqid(rand(), true)), 16, 16);

// Verstuur de verificatie-e-mail
$mail = new PHPMailer(true);

try {
    // Server-instellingen
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // SMTP-serveradres
    $mail->SMTPAuth = true;
    $mail->Username = 'your@example.com'; // SMTP gebruikersnaam
    $mail->Password = 'your_password'; // SMTP wachtwoord
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // E-mail instellingen
    $mail->setFrom('your@example.com', 'Your Name'); // Afzender e-mail en naam
    $mail->addAddress($email, $firstname . ' ' . $lastname); // Ontvanger e-mail en naam
    $mail->isHTML(true);
    $mail->Subject = 'Email Verification';
    $mail->Body    = 'Your verification code is: ' . $verificationCode;

    // Verzend de e-mail
    $mail->send();
    echo 'Verification email has been sent.';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>
