const btn = document.getElementById('click');



//ПОСЛЕ ВЫПОЛНЕНИЯ ФУНКЦИИ VALIDATE - НУЖНО ЗАТЕРЕТЬ ВСЕ ЗНАЧЕНИЯ
//через dom хрень нужно очистить все значения по типу setAttribute, почитать учебник
//валидация на x и r - несрабатывает после одной введенной партии значений

//АААААААА
//НЕЛЬЗЯ ХРАНИТЬ ДАННЫЕ В ПЕРЕМЕННЫХ КАК ВЫШЕ, ПОСКОЛЬКУ ПОСЛЕ 
//ОТРАБОТКИ СКРИПТА ДАННЫЕ ОСТАЛИСЬ СТАРЫМИ, ОНИ ПРОИНИЦИАЛИЗИРОВАННЫ
//ДЛЯ VALIDATE() - ЗНАЧЕНИЯ ВВЕДЕНЫ И ВСЕ ХОРОШО

//ПОСМОТРИ ЧТО 


function validate() {
  let text = document.getElementsByClassName("input_text")[0].value;
  if (document.getElementById("hidden_elem").value == "") {
    alert("Задайте значение X");
    return false;
  }
  if (document.getElementsByName("rbtn")[0].value =="") {
    alert("Задайте R");
    return false;
  }
  
  if ((text == "") || (isNaN(Number(text))) || (Number(text) > 5) || (Number(text) < -3) || (null === text.match(/^\-?[0-9]{1}(\.[0-9]{0,13})?$/))) {
    alert("Введите рациональное число в диапазоне [-3;5] с точностью до 13 знаков после точки");
    return false;
  }
  return true;
}



function sendRequest() {
  let xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    console.log("1",this.responseText[0]===undefined,"ответ с сервера");
    if (this.responseText[0]===undefined){
      return;
    }
    if (Cookies.get("counter") === undefined) {
      Cookies.set("counter", "0");
    } else {
      Cookies.set("counter", JSON.stringify(Number.parseInt(Cookies.get("counter")) + 1));
    }
    let str = this.responseText;
    let mas = str.split(';', 4);
    console.log(mas);
    Cookies.set(Cookies.get("counter"), mas.join(';')); //убрал JSON.stringify()
    load()
    str = this.responseText;
    str = str.slice(str.lastIndexOf(";")).substring(2);
    document.getElementById("time").innerHTML = str;
  }

  let obj = parseValues();
  let str = "btn=" + obj.x + "&text=" + obj.y + "&radiobutton=" + obj.r;
  //You may get a cached result. To avoid this, add a unique ID to the URL:
  xhttp.open("GET", "http://example/php/script.php?" + str + "&q=" + Math.random(), true);
  xhttp.send();
}

function parseValues() {
  let obj = new Object();
  obj.x = document.getElementById("hidden_elem").value;
  //console.log("парсX" + obj.x);

  //obj.y = y;
  obj.y = document.getElementsByName("txt")[0].value;

  //console.log("парсY" + obj.y);
  obj.r =  document.getElementsByName("rbtn")[0].value;
  //console.log("парсR" + obj.r);
  return obj;
}

btn.addEventListener('click', function () {
  let flag = validate();
  if (flag) {
    sendRequest();
    document.getElementById("hidden_elem").removeAttribute("value");
    document.getElementsByName("rbtn")[0].removeAttribute("value");
    document.getElementsByName("txt")[0].removeAttribute("value");
    //очищает ввод формы 
    document.getElementsByClassName("block_values")[0].reset();
  }
});



function enterY(input) {
  //y = input;
  document.getElementsByName("txt")[0].setAttribute("value",input);  
  console.log(document.getElementsByName("txt")[0].value,"ЗНАЧЕНИЕ Y");
}

function enterX(input) {
  document.getElementById('hidden_elem').setAttribute("value", input);
}

function enterR(input) {
  document.getElementsByName("rbtn")[0].setAttribute("value",input);
}

