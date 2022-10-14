<?php
$start = microtime(1);

$bool = true;

$hardPattern = "/^\-?[0-9]{1}(\.[0-9]{0,13})?$/";
$easyPattern = "/^-?[0-9]{1}$/";

if (isset($_GET['text'])) {
  $y = $_GET['text'];
  if ((preg_match($hardPattern,$y)==0) or ($y<-3) or ($y>5)){
    $bool = false;
  }
}

if (isset($_GET['radiobutton']) and $bool) {
  $R = $_GET['radiobutton'];
  if ((preg_match($easyPattern,$R)==0) or ($R>5) or ($R<1)){
    $bool = false;
  }
}

if (isset($_GET['btn']) and $bool) {
  $x = $_GET['btn'];
  if ((preg_match($easyPattern,$x)==0) or ($x>3) or ($x<-5)){ 
    $bool = false;
  }
}

$k = 0;
if (isset($x) and isset($y) and isset($R) and $bool) {
  $k = $R / 7;
}


function batman_upper($x, $k)
{
  $x = abs($x);
  if ($x > 7 * $k) {
    return 'The Batman equaxion is defined on -R <= x <= R';
  } elseif ($x < 0.5 * $k) {
    return 2.25;
  } elseif ((0.5 * $k <= $x)  and ($x < 0.75 * $k)) {
    return 3 * $x + 0.75;
  } elseif ((0.75 * $k <= $x) and ($x < 1.0 * $k)) {
    return 9 - 8 * $x;
  } elseif ((1 * $k <= $x) and ($x < 3 * $k)) {
    return (1.5 - 0.5 * $x - 3 * sqrt(10) / 7 * (sqrt(3 - ($x ** 2) + 2 * $x) - 2));
  } elseif ((3 * $k <= $x) and ($x <= 7 * $k)) {
    return 3 * sqrt((- ($x / 7) ** 2) + 1);
  }
}


function batman_lower($x, $k)
{
  $x = abs($x);
  if ($x > 7 * $k) {
    return 'The Batman equation is defined on -R <= t <= R';
  } elseif ((0 <= $x) and ($x < 4 * $k)) {
    return (abs($x / 2) - (3 * sqrt(33) - 7) / 112 * ($x ** 2) + sqrt(1 - (abs($x - 2) - 1) ** 2) - 3);
  } elseif ((4 * $k <=  $x) and ($x <= 7 * $k)) {
    return -3 * sqrt(- ($x / 7) ** 2 + 1);
  }
}


$Rez = 0;

if ((isset($x) and isset($y) and isset($R)) and ($y >= 0) and $bool) {
  $Rez = batman_upper($x, $k);
} elseif (isset($x) and isset($y) and isset($R)) {
  $Rez = batman_lower($x, $k);
}

if (isset($x) and isset($y) and isset($R)) {
  $Rez = (int) $Rez * $k - $y;
}

//это не совсем правильно, потому что он мог обрезать результат, изучи работу с дробными числами
// проверить, а если будет сравнение целого числа с дробным



$response;
if (isset($x) and isset($y) and isset($R) and $bool) {
  if ($Rez >= 0) {
    $response = "Попадает";
  } else {
    $response = "Не попадает";
  }
}

if (isset($x) and isset($y) and isset($R) and $bool) {  
  echo "$x;$y;$R;$response;";
  echo "\n";
  echo "<br> Время выполнения скрипта: " . number_format(microtime(1) - $start,13). " сек <br>";
  echo "Текущее время: " . date("r");
}