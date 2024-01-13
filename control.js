var content = document.getElementsByClassName("content");
var step = document.getElementsByClassName("step");
content[0].style.display = "block";
step[0].classList.add("active");
// find class tab and add event click
console.log(content.length);
var tab = document.getElementsByClassName("tab");
for (var i = 0; i < tab.length; i++) {
  tab[i].addEventListener("click", function () {
    // hide all content
    for (var i = 0; i < content.length; i++) {
      content[i].style.display = "none";
      content[i].classList.remove("active");
      step[i].classList.remove("active");
    }
    // show content with same index
    var index = this.getAttribute("data-index");
    content[index].style.display = "block";
    content[index].classList.add("active");
    step[index].classList.add("active");
  });
}

// onclick tab of step

for (var i = 0; i < step.length; i++) {
  step[i].addEventListener("click", function () {
    // hide all content
    if (checked() == false) {
      return;
    }
    for (var i = 0; i < content.length; i++) {
      content[i].style.display = "none";
      content[i].classList.remove("active");
      step[i].classList.remove("active");
    }
    // show content with same index
    var index = this.getAttribute("data-index");
    console.log(index);
    console.log(content[2]);
    content[index].style.display = "block";
    content[index].classList.add("active");
    step[index].classList.add("active");
  });
}

// onclick button next

var next = document.getElementsByClassName("btn-next");

for (var i = 0; i < next.length; i++) {
  next[i].addEventListener("click", function () {
    if (checked() == false) {
      return;
    }
    // hide all content
    for (var i = 0; i < content.length; i++) {
      content[i].style.display = "none";
      content[i].classList.remove("active");
      step[i].classList.remove("active");
    }
    // show content with same index
    var index = this.getAttribute("data-index");
    console.log(index);
    console.log(content[2]);
    content[index].style.display = "block";
    content[index].classList.add("active");
    step[index].classList.add("active");
  });
}

// onclick button back
var back = document.getElementsByClassName("btn-prev");

for (var i = 0; i < back.length; i++) {
  back[i].addEventListener("click", function () {
    if (checked() == false) {
      return;
    }
    // hide all content
    for (var i = 0; i < content.length; i++) {
      content[i].style.display = "none";
      content[i].classList.remove("active");
      step[i].classList.remove("active");
    }
    // show content with same index
    var index = this.getAttribute("data-index");
    // console.log(index);
    // console.log(content[2]);
    content[index].style.display = "block";
    content[index].classList.add("active");
    step[index].classList.add("active");
  });
}

// onclick button submit
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click vào nút Submit
  document.getElementById("btn-submit").addEventListener("click", function () {
    // Gọi hàm để đọc dữ liệu và chuyển đổi thành JSON
    submitForm();
  });
});

function checked() {
  var inputs = document.querySelectorAll(
    ".content.active input, .content.active select"
  );
  console.log(inputs);

  var errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });

  // Kiểm tra lỗi
  var hasError = false;

  let radioGroups = {};

  // Group all radio buttons by their 'name' attribute
  for (let input of inputs) {
    if (input.type === "radio") {
      if (!radioGroups[input.name]) {
        radioGroups[input.name] = [];
      }
      radioGroups[input.name].push(input);
    }
  }

  // Check each group of radio buttons
  for (let groupName in radioGroups) {
    let group = radioGroups[groupName];
    let isAnyChecked = group.some((radio) => radio.checked);

    if (!isAnyChecked) {
      // If no radio button in the group is checked, set hasError to true and add an error message
      hasError = true;
      addErrorMessage(group[0], groupName + " chưa được chọn");
    }
  }

  if (hasError) {
    return false;
  }
}

function submitForm() {
  // Lặp qua tất cả các thẻ input và select
  var inputs = document.querySelectorAll("input, select");

  // Xóa các thông báo lỗi cũ
  var errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });

  // Kiểm tra lỗi
  var hasError = false;

  let radioGroups = {};

  // Group all radio buttons by their 'name' attribute
  for (let input of inputs) {
    if (input.type === "radio") {
      if (!radioGroups[input.name]) {
        radioGroups[input.name] = [];
      }
      radioGroups[input.name].push(input);
    }
  }

  // Check each group of radio buttons
  for (let groupName in radioGroups) {
    let group = radioGroups[groupName];
    let isAnyChecked = group.some((radio) => radio.checked);

    if (!isAnyChecked) {
      // If no radio button in the group is checked, set hasError to true and add an error message
      hasError = true;
      addErrorMessage(group[0], groupName + " chưa được chọn");
    }
  }

  if (hasError) {
    return;
  }

  // Nếu không có lỗi, tiếp tục xử lý form
  var formData = {};
  inputs.forEach(function (input) {
    if (input.type === "radio" && input.checked) {
      formData[input.name] = input.value;
    } else if (input.value.trim() !== "") {
      formData[input.id] = input.value;
    } else if (input.type === "date" && !input.value.trim() === "") {
      formData[input.id] = input.value;
    } else if (input.type === "date" && input.value.trim() === "") {
      formData[input.id] = "Không có";
    } else {
      formData[input.id] = "Không có";
    }
  });

  var jsonData = JSON.stringify(formData);
  console.log(jsonData);

  fetch(
    "https://script.google.com/macros/s/AKfycbzk4grZzyH2veYJJmphNE7qXTUmGULaJvNxh_ar4Y-GE0UHOC8DP3DVNp9McWXyvTem/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Hàm thêm thông báo lỗi ngay dưới input
function addErrorMessage(input, message) {
  var errorMessage = document.createElement("p");
  errorMessage.style = "col-sm-12; color: red;";
  errorMessage.className = "error-message";
  errorMessage.textContent = message;
  input.parentNode.appendChild(errorMessage);
}

// ? API lấy danh sách tỉnh, huyện, xã

const provinceUrl = "https://provinces.open-api.vn/api/p/?depth=2";
const districtUrl = "https://provinces.open-api.vn/api/p/"; // URL huyện, thay đổi ID khi chọn tỉnh
const wardUrl = "https://provinces.open-api.vn/api/d/"; // URL xã, thay đổi ID khi chọn huyện

function getApiData(
  id_tinh,
  id_huyen,
  id_xa,
  id_list_tinh,
  id_list_huyen,
  id_list_xa
) {
  let btntinh = document.querySelector(id_tinh);
  let menutinh = document.querySelector(id_list_tinh);

  let btnhuyen = document.querySelector(id_huyen);
  let menuhuyen = document.querySelector(id_list_huyen);

  let btnxa = document.querySelector(id_xa);
  let menuxa = document.querySelector(id_list_xa);

  btntinh.addEventListener("click", function () {
    menutinh.style.display =
      menutinh.style.display === "none" ? "block" : "none";
  });

  btnhuyen.addEventListener("click", function () {
    menuhuyen.style.display =
      menuhuyen.style.display === "none" ? "block" : "none";
  });

  btnxa.addEventListener("click", function () {
    menuxa.style.display = menuxa.style.display === "none" ? "block" : "none";
  });

  // Sử dụng sự kiện "input" để tìm kiếm tỉnh khi gõ
  btntinh.addEventListener("input", function () {
    const searchValue = btntinh.value.trim().toLowerCase();
    const provinceList = document.querySelectorAll(id_list_tinh + " li");
    provinceList.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    menutinh.style.display = "block";
  });

  // Sử dụng sự kiện "input" để tìm kiếm huyện khi gõ
  btnhuyen.addEventListener("input", function () {
    const searchValue = btnhuyen.value.trim().toLowerCase();
    const districtList = document.querySelectorAll(id_list_huyen + " li");
    districtList.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    menuhuyen.style.display = "block";
  });

  // Sử dụng sự kiện "input" để tìm kiếm xã khi gõ
  btnxa.addEventListener("input", function () {
    const searchValue = btnxa.value.trim().toLowerCase();
    const wardList = document.querySelectorAll(id_list_xa + " li");
    wardList.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    menuxa.style.display = "block";
  });

  document.addEventListener("mousedown", function (event) {
    const target = event.target;
    if (!target.closest(id_tinh) && !target.closest(id_list_tinh)) {
      menutinh.style.display = "none";
    }
    if (!target.closest(id_huyen) && !target.closest(id_list_huyen)) {
      menuhuyen.style.display = "none";
    }
    if (!target.closest(id_xa) && !target.closest(id_list_xa)) {
      menuxa.style.display = "none";
    }
  });

  menutinh.addEventListener("click", function (event) {
    const target = event.target;
    const option = target.textContent;
    if (option) {
      btntinh.value = option;
      menutinh.style.display = "none";
      // Đổi đường dẫn để lấy danh sách huyện của tỉnh đã chọn
      const provinceId = target.getAttribute("code");
      fetch(`${districtUrl}${provinceId}?depth=2`)
        .then((response) => response.json())
        .then((data) => {
          const districtList = document.querySelector(id_list_huyen);
          const data1 = data.districts;
          districtList.innerHTML = ""; // Xóa danh sách huyện cũ
          data1.forEach((district) => {
            const listItem = document.createElement("li");
            listItem.textContent = district.name;
            listItem.setAttribute("code", district.code);
            districtList.appendChild(listItem);
          });
        })
        .catch((error) => console.error("Lỗi khi lấy danh sách huyện:", error));
    }
  });

  menuhuyen.addEventListener("click", function (event) {
    const target = event.target;
    const option = target.textContent;
    if (option) {
      btnhuyen.value = option;
      menuhuyen.style.display = "none";
      // Đổi đường dẫn để lấy danh sách xã của huyện đã chọn
      const districtId = target.getAttribute("code");
      fetch(`${wardUrl}${districtId}?depth=2`)
        .then((response) => response.json())
        .then((data) => {
          const wardList = document.querySelector(id_list_xa);
          const data1 = data.wards;
          wardList.innerHTML = ""; // Xóa danh sách xã cũ
          data1.forEach((ward) => {
            const listItem = document.createElement("li");
            listItem.textContent = ward.name;
            listItem.setAttribute("code", ward.code);
            wardList.appendChild(listItem);
          });
        })
        .catch((error) => console.error("Lỗi khi lấy danh sách xã:", error));
    }
  });

  menuxa.addEventListener("click", function (event) {
    const target = event.target;
    const option = target.textContent;
    if (option) {
      btnxa.value = option;
      menuxa.style.display = "none";
    }
  });

  fetch(provinceUrl)
    .then((response) => response.json())
    .then((data) => {
      const provinceList = document.querySelector(id_list_tinh);
      data.forEach((province) => {
        const listItem = document.createElement("li");
        listItem.textContent = province.name;
        listItem.setAttribute("code", province.code);
        provinceList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Lỗi khi lấy danh sách tỉnh:", error));
}

getApiData("#tinh", "#huyen", "#xa", "#list_tinh", "#list_huyen", "#list_xa");
getApiData(
  "#tinh1",
  "#huyen1",
  "#xa1",
  "#list_tinh1",
  "#list_huyen1",
  "#list_xa1"
);
getApiData(
  "#tinh2",
  "#huyen2",
  "#xa2",
  "#list_tinh2",
  "#list_huyen2",
  "#list_xa2"
);
