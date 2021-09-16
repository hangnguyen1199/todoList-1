function addUser() {
    var person = [];
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    let personUser = {
        username: document.getElementById('username').value,
        mail: document.getElementById('mail').value,
        pass: document.getElementById('pass').value,
        resetpass: document.getElementById('resetpass').value,
    }
    person.push(personUser);

    if (personUser.username === "" || personUser.mail === "" || personUser.pass === "", personUser.resetpass === "") {
        alert("Vui lòng nhập đây đủ thông tin!")
        return
    } else {
        if (!checkGmail(personUser.mail)) {
            alert("Đăng kí thành công!");
        } else {
            alert("Email đã tồn tại!");
            return;
        }
    };

    localStorage.removeItem("person")
    localStorage.setItem('person', JSON.stringify(person))
    location.reload();

}

function renderListPerson() {
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    var listPersonHtml = `<tr>
        <td>#</td>
        <td>Tài khoản</td>
        <td>Gmail</td>
        <td>Mật khẩu</td>
        <td>Thao tác</td>
        </tr>`;

    person.forEach((personUser, index) => {
        listPersonHtml += `<tr>
        <td>${index}</td>
        <td>${personUser.username}</td>
        <td>${personUser.mail}</td>
        <td>${personUser.pass}</td>
        <td><button type="button" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editPerson(${index});'>Sửa </button><button type='submit' class='btn btn-danger btn-delete' onclick='deletePerson();'>Xóa</button></td>
        </tr>`;
    })
    document.getElementById('tablePerson').innerHTML = listPersonHtml;
}


function editPerson(id) {
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    person.forEach((person, index) => {
        if (index === id) {
            document.getElementById('username').value = person.username;
            document.getElementById('mail').value = person.mail;
            document.getElementById('pass').value = person.pass;
            document.getElementById('repeatPass').value = person.repeatPass;
            document.getElementById('id').value = id;
        }
    })

}

function upDate() {
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    var username = document.getElementById('username').value
    var mail = document.getElementById('mail').value
    var pass = document.getElementById('pass').value
    var repeatPass = document.getElementById('repeatPass').value
    var id = document.getElementById('id').value
    person.forEach((person, index) => {
        if (index == id) {
            person.username = username
            person.mail = mail
            person.pass = pass
            person.repeatPass = repeatPass
            alert('Lưu thành công')
        }
    })
    localStorage.removeItem('person')
    localStorage.setItem('person', JSON.stringify(person))
    location.reload()
}

function checkGmail(mail) {
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    for (let item = 0; item < person.length; item++) {
        if (person[item].mail == mail) {
            return true;
        }
    }
    return false;
}

function deletePerson(id) {
    var person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : [];
    var status = true;
    if (confirm("Bạn muốn chắc chắn muốn xóa")) {
        const index = person.indexOf(id);
        person.splice(index, 1);
    }
    if (status == false) {
        return status;
    }
    localStorage.removeItem("person")
    localStorage.setItem('person', JSON.stringify(person))
    location.reload();

}
var customer;

function Login() {
    var persons = JSON.parse(localStorage.getItem("person")) || [];
    var username = document.login.name.value;
    var pass = document.login.pass.value;
    if (username === "" || pass === "") {
        alert("Vui long dien day du thong tin");
    } else {
        for (i in persons) {
            if (persons[i].username == username && persons[i].pass == pass) {
                var user = {
                    username: username
                }
                localStorage.setItem('userCurrent', JSON.stringify(user));
                window.location.href = "http://127.0.0.1:5501/html/home.html"
            } else {
                document.getElementById("demo").innerHTML =
                    "Tên đăng nhập hoặc mật khẩu không đúng!";
            }
        }
    }

    // location.reload()
}