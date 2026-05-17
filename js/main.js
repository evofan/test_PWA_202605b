let numList = [];
console.log(numList.length);

// serialize
let serializedAry = localStorage.getItem("savedataAry");

// Local Storage
numList = JSON.parse(serializedAry);
console.log(numList);

// sound

// Setup the new Howl.
const sound1 = new Howl({
  src: ["./sound/pingpong.mp3"],
});
const sound2 = new Howl({
  src: ["./sound/boo.mp3"],
});

// Play the sound.
//sound1.play();

// Change global volume.
// Howler.volume(0.5);

// ローカルデータが有った時のみ上書きする処理
if (numList === null || numList.length === 0) {
  //console.log("ローカルストレージにデータが無いので100をテストで入れる");
  numList = [];
}
console.log(numList);
console.log(numList.length);

function get_calc(btn) {
  // 1文字目が演算子の場合は消す
  let val = document.calculator.display.value;
  if (
    (btn.value === "=" ||
      btn.value === "×" ||
      btn.value === "*" ||
      btn.value === "÷" ||
      btn.value === "+" ||
      btn.value === "-") &&
    (document.calculator.display.value === "" ||
      document.calculator.display.value === null ||
      document.calculator.display.value === undefined)
  ) {
    // alert("式の先頭が記号は不可");
    return false;
  }

  if (btn.value === "=") {
    // document.calculator.display.value = eval(document.calculator.display.value);
    document.calculator.display.value = evaluate(
      document.calculator.display.value,
    ).trim();
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

function setData(e) {
  console.log(e);
  // let setNo = eval(document.calculator.display.value);
  let setNo = evaluate(document.calculator.display.value).trim();
  console.log(setNo);
  // 数値無し時
  if (setNo === "" || setNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= numList.length; i++) {
    if (setNo === numList[i]) {
      alert("その番号は既に登録済みです");
      document.calculator.display.value = "";
      return false;
    } else {
      console.log("いいえ");
    }
  }
  alert(setNo + "番を新たに登録しました");
  document.calculator.display.value = "";
  numList.push(setNo);
  console.log(numList);

  // serialize
  serializedAry = JSON.stringify(numList);

  // Local Storage
  localStorage.setItem("savedataAry", serializedAry);
}

function deleteData(e) {
  console.log(e);

  // let deleteNo = eval(document.calculator.display.value);
  let deleteNo = evaluate(document.calculator.display.value).trim();
  console.log(deleteNo);
  // 数値無し時
  if (deleteNo === "" || deleteNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= numList.length; i++) {
    if (deleteNo === numList[i]) {
      alert(deleteNo + "番を登録から削除します");
      numList.splice(i, 1);
      console.log(numList);

      // serialize
      serializedAry = JSON.stringify(numList);

      // Local Storage
      localStorage.setItem("savedataAry", serializedAry);

      document.calculator.display.value = "";
      return false;
    } else {
      console.log("いいえ");
    }
  }
  alert("その番号は登録内に見つかりませんでした");
  document.calculator.display.value = "";
  console.log(numList);
}

function checkData(e) {
  console.log("checkData!");
  // let checkNo = eval(document.calculator.display.value);
  let checkNo = evaluate(document.calculator.display.value).trim();
  console.log(checkNo);

  // 数値無し時
  if (checkNo === "" || checkNo === undefined) {
    alert("番号が入力されていません");
    return false;
  }
  for (let i = 0; i <= numList.length; i++) {
    if (checkNo === numList[i]) {
      // alert("その番号は禁止リストに有ります！");
      console.log(numList);
      // document.calculator.display.value = "";

      // let colorElemnt = document.getElementsByClassName('display_message');
      // let colorElemnt = document.getElementById("message");
      let colorElemnt = document.getElementsByClassName("display_message")[0];
      console.log(colorElemnt);
      colorElemnt.style.setProperty("background-color", "red");
      colorElemnt.style.setProperty("color", "white");

      sound1.stop();
      sound2.play();
      document.calculator.display_message.value = "× その番号は禁止です！";

      return false;
    } else {
      console.log("禁止リストには無し");

      let colorElemnt = document.getElementsByClassName("display_message")[0];
      console.log(colorElemnt);
      colorElemnt.style.setProperty("background-color", "green");
      colorElemnt.style.setProperty("color", "white");

      sound2.stop();
      sound1.play();
      document.calculator.display_message.value = "〇 その番号はOKです！";
    }
  }

  // document.calculator.display.value = "";
  console.log(numList);
}

/**
 * 登録一覧を表示する
 */
function displayRegistrationList() {
  alert(numList);
}

/**
 *
 * @param {*} e
 */
function deleteAllData(e) {
  console.log("deleteAllData");

  // 確認用ダイアログ
  const dialog = window.confirm("登録データを全て削除してよろしいですか？");

  if (dialog) {
    numList = [];
    localStorage.clear();
    alert("全ての登録データを削除しました");
    document.calculator.display.value = "";
    console.log(numList);
  } else {
    event.preventDefault();
    alert("削除を中止しました");
  }
}

/**
 * データをソートする（昇順）
 * @param {*} e
 */
function sortData(e) {
  console.log("sortData()"); // ０埋め

  // 確認用ダイアログ
  const dialog = window.confirm("番号を昇順で並べ変えますか？");

  if (dialog) {
    // 0パディング
    // for (let i = 0; i < numList.length; i++) {
    //   console.log(i);
    //   let result = zeroPadding(numList[i], 4);
    //   numList[i] = result;
    // }

    // ソート
    // let newList = numList.sort((a, b) => (a < b ? -1 : 1));

    // 桁数が異なってもOKなソート
    let newList = numList.sort((a, b) => a - b);
    console.log(newList);
    numList = newList;

    // serialize
    serializedAry = JSON.stringify(numList);

    // Local Storage
    localStorage.setItem("savedataAry", serializedAry);

    document.calculator.display.value = "";

    alert("登録データを昇順でソートしました");
    document.calculator.display.value = "";
    console.log(numList);
  } else {
    event.preventDefault();
    alert("ソートを中止しました");
  }
}

/**
 * 数値のゼロ埋め（＝ゼロパディング、桁を揃える）
 * @param {number|string} number 対象の数字
 * @param {number} [digit=0] 桁数
 * @returns {string} ゼロが埋められた数字を返す
 */
const zeroPadding = (number, digit = 0) => {
  const fillNumber = digit - String(number).length;

  return fillNumber > 0 ? "0".repeat(fillNumber) + number : number;
};
