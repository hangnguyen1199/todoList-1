function checkUser() {
    var username = document.getElementById('username').value;
    var regexUse = /^[A-Za-z0-9_\.]{6,32}$/;
    var errorUse = document.getElementById('error_username');
    if (username == '' || username == null) {
        errorUse.innerHTML = " Vui lòng nhập tài khoản"
    } else if (!regexUse.test(username)) {
        errorUse.innerHTML = "Tên đăng nhập có độ dài từ 6 - 18 ký tự"
    } else {
        errorUse.innerHTML = " ";
    }
}

function checkPass() {
    var regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var pw = document.getElementById('pass').value;
    var errorPass = document.getElementById('error_pass');
    if (pw == '' || pw == null) {
        errorPass.innerHTML = " Vui lòng nhập mật khẩu"
    } else if (!regexPass.test(pw)) {
        errorPass.innerHTML = "Tối thiểu tám ký tự, ít nhất một chữ cái và một số"
    } else {
        errorPass.innerHTML = " ";
    }
}

function checkResetPass() {
    var pw = document.getElementById('pass').value;
    var cpw = document.getElementById('repeatPass').value;
    var errorResetpass = document.getElementById('error_repeatPass');
    if (cpw == '' || cpw == null) {
        errorResetpass.innerHTML = " Vui lòng nhập lại mật khẩu"
    } else if (cpw != pw) {
        errorResetpass.innerHTML = "Phải trùng với password!"
    } else {
        errorResetpass.innerHTML = " ";
    }
}

function checkMail() {
    var mail = document.getElementById('mail').value;
    var regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMail = document.getElementById('error_mail')

    if (mail == '' || mail == null) {
        errorMail.innerHTML = " Vui lòng nhập mail"
    } else if (!regexMail.test(mail)) {
        errorMail.innerHTML = "Mail không đúng định dạng"
    } else {
        errorMail.innerHTML = " ";
    }
}

function checkWord() {
    var work = document.getElementById('work').value;
    var errorWork = document.getElementById('error_work')
    if (work == '' || work == null) {
        errorWork.innerHTML = " Vui lòng nhập tên công việc"
    } else {
        errorWork.innerHTML = " ";
    }
}

function checkDescription() {
    var description = document.getElementById('description').value;
    var errorDescription = document.getElementById('error_description')
    if (description == '' || description == null) {
        errorDescription.innerHTML = " Vui lòng nhập mô tả"
    } else {
        errorDescription.innerHTML = " ";
    }
}

function checkDay() {
    var day = document.getElementById('day').value;
    var errorDay = document.getElementById('error_day')
    if (day == '' || day == null) {
        errorDay.innerHTML = " Vui lòng nhập ngày hết hạn"
    } else {
        errorDay.innerHTML = " ";
    }
}

// thêm mới
function addData() {
    var users = [];
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var userCurrent = localStorage.getItem('userCurrent') ? JSON.parse(localStorage.getItem('userCurrent')) : [];
    let user = {
        work: document.getElementById('work').value,
        description: document.getElementById('description').value,
        day: document.getElementById('day').value,
        status: document.getElementById('status').value,
        username: userCurrent.username
    }
    users.push(user);

    //check value empty

    if (user.work === "" || user.description === "" || user.status === "", user.day === "") {
        alert("Vui lòng nhập đây đủ thông tin!")
        return
    };

    localStorage.setItem('users', JSON.stringify(users));
    this.renderListUser();
    location.reload();
}


function renderListUser() {
    var userCurrent = localStorage.getItem('userCurrent') ? JSON.parse(localStorage.getItem('userCurrent')) : [];
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (users.length === 0) {
        document.getElementById('list-user').style.display = 'none';
        return false;
    }
    document.getElementById('list-user').style.display = 'block';
    var listUserHtml = `<tr>
        <td>#</td>
        <td>Name</td>
        <td>Mô tả</td>
        <td>Ngày hết hạn</td>
        <td>Trạng thái</td>
        <td>Thao tác</td>
        </tr>`;

    users.forEach((user, index) => {
        if (user.username == userCurrent.username) {
            listUserHtml += `<tr>
            <td id = "idUser">${index}</td>
            <td>${user.work}</td>
            <td>${user.description}</td>
            <td>${user.day}</td>
            <td>${user.status}</td>
            <td><button type='submit' class='btn btn-secondary btn-edit' onclick='editData(${index});'>Sửa</button><button type='submit' class='btn btn-danger btn-delete' onclick='deleteData();'>Xóa</button></td>
            </tr>`;
        }
    })
    document.getElementById('list-user').innerHTML = listUserHtml;

}
var idUser;

function editData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    users.forEach((users, index) => {
        if (index === id) {
            document.getElementById('work').value = users.work;
            document.getElementById('description').value = users.description;
            document.getElementById('day').value = users.day;
            document.getElementById('status').value = users.status;
            idUser = id;
            document.getElementById('add').style.display = 'none'
            document.getElementById('save').style.display = 'flex'
        }
    })

}

document.getElementById("save").addEventListener("click", function() {
    saveData(idUser);
});

function saveData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var work = document.getElementById('work').value
    var description = document.getElementById('description').value
    var day = document.getElementById('day').value
    var status = document.getElementById('status').value
    users.forEach((users, index) => {
        if (index == id) {
            users.work = work;
            users.description = description
            users.day = day
            users.status = status
            alert('Lưu thành công')
        }
    })
    document.getElementById('add').style.display = 'flex'
    document.getElementById('save').style.display = 'none'
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users))
    window.location.reload()
    renderListUser();
}

function deleteData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var status = true;
    if (confirm("Bạn muốn chắc chắn muốn xóa")) {
        const index = users.indexOf(id);
        users.splice(index, 1);
    }
    if (status == false) {
        return status;
    }
    localStorage.removeItem("users")
    localStorage.setItem('users', JSON.stringify(users))
    location.reload();

}

function Logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('mail');
    localStorage.removeItem('userCurrent');
    window.location.href = "http://127.0.0.1:5501/index.html#";

}



// function checkStatus() {
//     console.log(users.day);
//     var isExpired = users.day < new Date() ? users.day = "Het han" : users.day;
// }

//pagination
$('#paging').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    pageSize: 5,

})