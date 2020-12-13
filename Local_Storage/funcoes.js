const listBtn = (document.querySelector("#btnListar").onclick = listUser);
let add = true;
let id = -1;
let form = document.querySelector("#frmCadastro");
form.onsubmit = (e) => (add ? addUser(e) : updateUser(e));

function addUser(e) {
  e.preventDefault();

  const data = document.querySelectorAll("#frmCadastro input");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(saveData(data));
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuário adicionado")
  
  data.forEach((input) => (input.value = "")); //limpando os campos do formulario
}

function modifyUser(updateId) {
  add = false;
  id = updateId;
  const user = JSON.parse(localStorage.getItem("users"))[updateId];
  
  document.querySelector("#txtCodigo").value = user.code;
  document.querySelector("#txtNome").value = user.name;
  document.querySelector("#txtTelefone").value = user.tel;
  document.querySelector("#txtEmail").value = user.mail;
}

function deleteUser(deleteId) {
  const users = JSON.parse(localStorage.getItem("users"))
  users.splice(deleteId,1);
  localStorage.setItem("users", JSON.stringify(users));
  listUser();
}

function updateUser(e) {
  e.preventDefault();
  const data = document.querySelectorAll("#frmCadastro input");
  const users = JSON.parse(localStorage.getItem("users"));
  users[id] = saveData(data);
  localStorage.setItem("users", JSON.stringify(users));
  
  listUser();
  add = true;
  id = -1;
  data.forEach((input) => (input.value = ""));
}

function saveData(data) {
  return {
    code: data[0].value,
    name: data[1].value,
    tel: data[2].value,
    mail: data[3].value,
  };
}

function listUser() {
  const users = JSON.parse(localStorage.getItem("users")) || -1;
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  if (users === -1 || users.length === 0) alert("Nenhum usuário cadastrado");
  else {
    users.forEach((user, index) => {
      table.innerHTML += `<tr>
        <td><img style="width:26px; heigth:26px;" onclick="deleteUser(${index})" title='deletar' src='./images/delete.png'/> <img style="width:26px; heigth:26px;" onclick="modifyUser(${index})" title='editar' src='./images/editar.png'/></td>
        <td>${user.code}</td>
        <td>${user.name}</td>
        <td>${user.tel}</td>
        <td>${user.mail}</td>
      </tr>`;
    });
  }
}