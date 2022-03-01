// if the user is login via genuine method this will check the suspecious ways.
let user_session = sessionStorage.getItem("user");
if (user_session != "online") {
  // console.log("user is not logged in");
  window.history.back();
}

// this will logout the user safely
function logout() {
  sessionStorage.clear();
  window.history.back();
}

// creating an student class
class Student {
  constructor(
    studName,
    rollNo,
    phoneNo,
    branch,
    bookName,
    author,
    access,
    date
  ) {
    this.name = studName;
    this.roll = rollNo;
    this.phone = phoneNo;
    this.branch = branch;
    this.bookName = bookName;
    this.author = author;
    this.access = access;
    this.date = date;
  }

  // this will validate the student who is issuing the book
  validate(student) {
    // console.log(student.date);
    if (student.name.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  // this will add the student into localstorage
  addToLocalStorage(student) {
    let studentInfo;
    let libraryRack = localStorage.getItem("libraryRack");
    if (libraryRack == null) {
      studentInfo = [];
    } else {
      studentInfo = JSON.parse(libraryRack);
    }
    studentInfo.push(student);
    localStorage.setItem("libraryRack", JSON.stringify(studentInfo));
  }

  // this will clear the library form
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  // this will add the enrolled student into the table below the form
  add() {
    // console.log("adding student");
    let studentInfo;
    let libraryRack = localStorage.getItem("libraryRack");
    if (libraryRack == null) {
      studentInfo = [];
    } else {
      studentInfo = JSON.parse(libraryRack);
    }

    let html = "";

    studentInfo.forEach((student, index) => {
      // console.log(libraryRack);
      let libraryRack = localStorage.getItem("libraryRack");

      html += `<tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.phone}</td>
                <td>${student.branch}</td>
                <td>${student.bookName}</td>
                <td>${student.author}</td>
                <td>${student.access}</td>
                <td>${student.date}</td>
                <td><button id="${index}" onclick="student.deleteStudent(this.id);" class="btn btn-outline-danger my-2 my-sm-0"  type="submit">Return</button></td>
              </tr>`;

      // console.log(html);
    });

    let tableBody = document.getElementById("tableBody");

    if (studentInfo.length !== 0) {
      tableBody.innerHTML = html;
    } else {
      tableBody.innerHTML = `<h5 style="color:red">Empty</h5>`;
    }
  }

  // this will delete the particular student when clicked on the return button
  deleteStudent(index) {
    // console.log("deleting");
    let studentInfo;

    let libraryRack = localStorage.getItem("libraryRack");
    if (libraryRack == null) {
      studentInfo = [];
    } else {
      studentInfo = JSON.parse(libraryRack);
    }
    studentInfo.splice(index, 1);

    localStorage.setItem("libraryRack", JSON.stringify(studentInfo));

    student.add();
  }

  // this will check if the student is already available or not
  isAvailable(student) {
    // console.log(student.roll, typeof student.roll);
    let returnVal;

    let studentInfo;
    let libraryRack = localStorage.getItem("libraryRack");

    if (libraryRack == null) {
      console.log("libraryRack is null");
      studentInfo = [];
      returnVal = true;
      return returnVal;
    } else if (libraryRack == "[]") {
      console.log("value of library rack is []");
      returnVal = true;

      return returnVal;
    } else {
      studentInfo = JSON.parse(libraryRack);
    }

    // console.log(studentInfo[0].roll);
    for (let i = 0; i < studentInfo.length; i++) {
      // console.log(studentInfo[i].roll);
      let availRoll = studentInfo[i].roll;

      if (availRoll == student.roll) {
        // console.log("not valid");

        returnVal = false;
        break;
      } else {
        // console.log("valid");
        returnVal = true;
      }
    }
    // console.log(returnVal);
    return returnVal;
  }

  showMessage(type, message) {
    let messages = document.getElementById("message");
    let boldText;
    if (type == "success") {
      boldText = "success";
    } else {
      boldText = "Error!";
    }
    messages.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${boldText}</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    setTimeout(() => {
      messages.innerHTML = "";
    }, 5000);
  }
}

let search = document.getElementById("search");
search.addEventListener("input", () => {
  // console.log("seaching");

  let searchRoll = search.value.toLowerCase();
  // console.log(searchRoll, typeof searchRoll);

  let table = document.getElementById("tableBody");
  // console.log(table);
  let tr = Array.from(table.getElementsByTagName("tr"));
  // console.log(tr);

  for (let i = 0; i < tr.length; i++) {
    let tableRoll = tr[i].getElementsByTagName("td")[1].innerHTML;
    // console.log(tableRoll);

    if (tableRoll.indexOf(searchRoll) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
});
let searchBook = document.getElementById("searchbook");
searchBook.addEventListener("input", () => {
  // console.log("seaching");

  let searchRoll = searchBook.value.toLowerCase();
  // console.log(searchRoll, typeof searchRoll);

  let table = document.getElementById("tableBody");
  // console.log(table);
  let tr = Array.from(table.getElementsByTagName("tr"));
  // console.log(tr);

  for (let k = 0; k < tr.length; k++) {
    let tableBook = tr[k].getElementsByTagName("td")[4].innerHTML.toLowerCase();
    // console.log(tableBook);

    if (tableBook.indexOf(searchRoll) > -1) {
      tr[k].style.display = "";
    } else {
      tr[k].style.display = "none";
    }
  }
});

let sort = document.getElementById("arrange");
sort.addEventListener("click", () => {
  let studentInfo;
  let libraryRack = localStorage.getItem("libraryRack");
  if (libraryRack == null) {
    studentInfo = [];
  } else {
    studentInfo = JSON.parse(libraryRack);
  }

  studentInfo.sort((a, b) => {
    return a.roll - b.roll;
  });
  localStorage.setItem("libraryRack", JSON.stringify(studentInfo));
  student.add();
});

let libraryForm = document.getElementById("libraryForm");

let student = new Student();
student.add();

libraryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // updateDate();
  let studName = document.getElementById("studName").value;
  let rollNo = document.getElementById("rollNo").value;
  let phoneNo = document.getElementById("phoneNo").value;
  let branch;

  let aiMl = document.getElementById("aiMl");
  let cs = document.getElementById("cs");
  let etc = document.getElementById("etc");
  let civil = document.getElementById("civil");
  let mech = document.getElementById("mech");

  if (aiMl.checked) {
    branch = "CS(AI & ML)";
  }
  if (cs.checked) {
    branch = "CS";
  }
  if (etc.checked) {
    branch = "EnTC";
  }
  if (civil.checked) {
    branch = "Civil";
  }
  if (mech.checked) {
    branch = "Mechanical";
  }

  let bookName = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let access = document.getElementById("access").value;
  let date = document.getElementById("date").value;

  // console.log(studName, rollNo, branch, bookName, author);

  let student = new Student(
    studName,
    rollNo,
    phoneNo,
    branch,
    bookName,
    author,
    access,
    date
  );

  // console.log(student);

  if (student.validate(student) && student.isAvailable(student)) {
    // console.log("add to table");
    student.addToLocalStorage(student);
    student.clear();
    student.add();
    student.showMessage("success", "Your book successfully added");
  } else {
    // console.log("student is not approprite");
    student.showMessage("danger", "sorry you can't add this book");
  }
});
