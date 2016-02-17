<?php

// Allowed hostname
define ('HOSTNAME', 'https://trial.simtricity.com/');

define ('SIMTRICITY_TOKEN_FILENAME', 'simtricity_token.txt');
define ('DEBUG', FALSE);

//returns the headers as an array
function getHeaders()
{
    $headers = array();
    foreach ($_SERVER as $k => $v)
    {
        if (substr($k, 0, 5) == "HTTP_")
        {
            $k = str_replace('_', ' ', substr($k, 5));
            $k = str_replace(' ', '-', ucwords(strtolower($k)));
            $headers[$k] = $v;
        }
    }
    return $headers;
}


// Stores/retrieves the Simtricity access token
$simtricity_token = NULL;
/**
 * Retrieves the Simtricity API token for accessing the API from the given file.
 * The file format is simply a text file containing the token (although we
 * ignore lines that don't look like tokens too).
 * Die on failure.
 * @param string $filename Name of file to retrieve token from (optional if it has already been read from the file)
 * @return string Token as a string
 */
function getAccessToken($filename = NULL)
{
    global $simtricity_token;

    if ($simtricity_token)
    {
        return $simtricity_token;
    }
    if ($filename === NULL)
    {
        echo "Error: No stored token, and no filename to read it from given\n";
        exit;
    }
    if (!file_exists($filename))
    {
        echo "Error: File not found trying to read Simtricity access token - $filename\n";
        exit;
    }
    $inFile = fopen($filename, 'r');
    $token = NULL;
    while ($line = fgets($inFile))
    {
        // Check the line is long enough and contains two or more '-'s
        if (strlen($line) > 30 && substr_count($line, '-') >= 2)
        {
            if (1 != preg_match('([0-9a-fA-F\-]+)', $line, $matches))
            {
                continue;
            }
            if (strlen($matches[0]) > 30)
            {
                $token = $matches[0];
                if (DEBUG)
                {
                    print("Simtricity token is: $token\n");
                }
            }
            else if (DEBUG)
            {
                print("Skipping line containing: $line");
            }
        }
        else if (DEBUG)
        {
            print("Skipping line containing: $line");
        }
    }
    fclose($inFile);
    if ($token === NULL)
    {
        echo "Error: Simtricity token not found in '$filename'\n";
        exit;
    }

    return $token;
}


// Get the REST call path from the AJAX application
$query_string = str_replace("XXTOKENXX", getAccessToken(SIMTRICITY_TOKEN_FILENAME), $_SERVER['QUERY_STRING']);
$path = $_SERVER['PATH_INFO'] . '?' . $query_string;
$url = HOSTNAME.$path;

header('Access-Control-Allow-Origin: *');

// Open the Curl session
$session = curl_init($url);

// If it's a POST, put the POST data in the body
// if ($_POST['path']) {
//  $postvars = '';
//  while ($element = current($_POST)) {
//   $postvars .= key($_POST).'='.$element.'&';
//   next($_POST);
//  }
//  $postvars = substr($postvars, 0, -1);  // removing trailing &
//  $postvars = str_replace('xml_version', 'xml version', $postvars);  // fix xml declaration bug?
//  $postvars = stripslashes($postvars);

//  curl_setopt ($session, CURLOPT_POST, true);
//  curl_setopt ($session, CURLOPT_POSTFIELDS, $postvars);
// }
// else {
//  //If it's a post, but not a form post (like a SOAP request)
//  if ($_SERVER['REQUEST_METHOD']==='POST') {
//   curl_setopt ($session, CURLOPT_POST, true);
//   curl_setopt ($session, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);

//   $headers = getHeaders();
//   $header_array = Array( "Content-Type: text/xml", "SOAPAction: " . $headers['SOAPAction']);
//   curl_setopt ($session, CURLOPT_HTTPHEADER, $header_array);
//   curl_setopt ($session, CURLOPT_CUSTOMREQUEST, "POST");
//  }
// }

// Don't return HTTP headers. Do return the contents of the call
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// Make the call
$xml = curl_exec($session);

// The web service returns XML. Set the Content-Type appropriately
header("Content-Type: text/csv");

echo $xml;
curl_close($session);

?>
