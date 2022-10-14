function load(){
  let count = Number(Cookies.get("counter"));
  if (isNaN(count)){
    return;
  }
    console.log(count + " counter");
    let message= `<table>
    <tr>
      <td>X</td>
      <td>Y</td>
      <td>R</td>
      <td>Result</td>
    </tr>`;
    for (let i = 0; i < count + 1; ++i) {
      let p = Cookies.get(String(i));
      console.log(p + " куки по индексу " + i);
      let array = parseStringToArray(p);
      //console.log(array + "массив куки по индексу " + i);
      message += wrapToTable(array);
    }
    message += "</table>";
    document.getElementById('info').innerHTML = message;
}

function parseStringToArray(string) {
  let buffer = "";
  let mas = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] == ";") {
      mas.push(buffer);
      buffer = "";
    } else {
      buffer += string[i];
    }
  }
  mas.push(buffer);
  console.log(mas, "Мой массив из функции");
  return mas;
}

function wrapToTable(array) {
  let string;
  if (array[3] === "Не попадает") {
    string =
  `<tr class='red'>
    <td>${array[0]}</td>
    <td>${array[1]}</td>
    <td>${array[2]}</td>
    <td>${array[3]}</td>
    </tr>`;
  } else{
    string =
    `<tr class='green'>
      <td>${array[0]}</td>
      <td>${array[1]}</td>
      <td>${array[2]}</td>
      <td>${array[3]}</td>
    </tr>`;
  }
  return string;
}