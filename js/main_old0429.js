function get_calc(btn) {
  if (btn.value === "=") {
    document.calculator.display.value = eval(document.calculator.display.value);
    /*
    document.calculator.display.value = myEval(
      document.calculator.display.value,
    );
    */
  } else if (btn.value === "C") {
    document.calculator.display.value = "";

    let colorElemnt = document.getElementsByClassName("display_message")[0];
    colorElemnt.style.setProperty("background-color", "white");
    // colorElemnt.style.setProperty("color", "white");

    document.calculator.display_message.value = "";
  } else {
    if (btn.value === "×") {
      btn.value = "*";
    } else if (btn.value === "÷") {
      btn.value = "/";
    }
    document.calculator.display.value += btn.value;
    document.calculator.multi_btn.value = "×";
    document.calculator.div_btn.value = "÷";
  }
}

function myEval(expr) {
  console.log(expr);
  console.log(Number(expr));
  console.log(Function(expr)());
  Function(expr)();
}

let noList = [100];
console.log(noList.length);

function setData(e) {
  console.log(e);
  let setNo = eval(document.calculator.display.value);
  console.log(setNo);
  // 数値無し時
  if (setNo === "" || setNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= noList.length; i++) {
    if (setNo === noList[i]) {
      alert("その番号は既に登録済みです");
      document.calculator.display.value = "";
      return false;
    } else {
      console.log("いいえ");
    }
  }
  alert(setNo + "番を新たに登録しました");
  document.calculator.display.value = "";
  noList.push(setNo);
  console.log(noList);
}

function deleteData(e) {
  console.log(e);
  let deleteNo = eval(document.calculator.display.value);
  console.log(deleteNo);
  // 数値無し時
  if (deleteNo === "" || deleteNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= noList.length; i++) {
    if (deleteNo === noList[i]) {
      alert(deleteNo + "番を登録から削除します");
      noList.splice(i, 1);
      console.log(noList);
      document.calculator.display.value = "";
      return false;
    } else {
      console.log("いいえ");
    }
  }
  alert("その番号は登録内に見つかりませんでした");
  document.calculator.display.value = "";
  console.log(noList);
}

function checkData(e) {
  console.log("checkData!");
  let checkNo = eval(document.calculator.display.value);
  console.log(checkNo);

  // 数値無し時
  if (checkNo === "" || checkNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= noList.length; i++) {
    if (checkNo === noList[i]) {
      // alert("その番号は禁止リストに有ります！");
      console.log(noList);
      // document.calculator.display.value = "";

      // document.querySelector("#message").textContent = "Good Morning!";

      // let colorElemnt = document.getElementsByClassName('display_message');
      // let colorElemnt = document.getElementById("message");
      let colorElemnt = document.getElementsByClassName("display_message")[0];
      console.log(colorElemnt);
      colorElemnt.style.setProperty("background-color", "red");
      colorElemnt.style.setProperty("color", "white");

      document.calculator.display_message.value = "× その番号は禁止です！";

      return false;
    } else {
      console.log("禁止リストには無し");

      let colorElemnt = document.getElementsByClassName("display_message")[0];
      console.log(colorElemnt);
      colorElemnt.style.setProperty("background-color", "green");
      colorElemnt.style.setProperty("color", "white");

      document.calculator.display_message.value = "〇 その番号はOKです！";
    }
  }
  // alert("その番号は禁止リストに見つかりませんでした");
  // document.calculator.display.value = "";
  console.log(noList);
}


function readData(e){
  alert(noList);
}