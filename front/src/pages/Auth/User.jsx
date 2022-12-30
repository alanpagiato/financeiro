// bootstrap
import { Button , Table, Alert, Form, Row, Col, FloatingLabel } from "react-bootstrap";

// hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessageUser } from "../../hooks/useResetComponentMessage";

// redux
import { getUsers, register, updateUser, deleteUser } from "../../slices/userSlice"

const User = () => {
  //states dos formularios
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [editId, setEditId] = useState("")
  const [editUsername, setEditUsername] = useState("");
  const [editName, setEditName] = useState("");
  const [editGroup, setEditGroup] = useState("");
  // state para titulo do botao
  const [buttonText, setButtonText] = useState("Criar Novo");
  // state para erros de validação de front end
  const [errorFront, setErrorFront] = useState(null);

  //iniciando dispatch
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessageUser(dispatch);

  const {users, loading, message, error } = useSelector((state) => state.user);

  const newUserForm = useRef();
  const editUserForm = useRef();

  const validate = (username, password, group) => {
    
    if (username.match(/[A-Z\s]/)) {
      setErrorFront("Username não pode conter espaços em branco e letras maiúsculas !");
      return false; 
    }
    if (password.includes(" ")) {
      setErrorFront("Senha não pode conter espaços em branco  !");
      return false; 
    }
    if (group.match(/[A-Z\s]/)){
      setErrorFront("Grupo não pode conter espaços em branco e letras maiúsculas !");
      return false; 
    }

    return true;

  };
  
  // cadastrando nova conta
  const handleInsertUser = (e) => {
    e.preventDefault();

    if (validate(newUsername,newPassword,newGroup)) {
      const user = {
        username: newUsername, name: newName, password: newPassword, group: newGroup
      };
  
      dispatch(register(user))
      
      setNewUsername("");
      setNewName("");
      setNewPassword("");
      setNewGroup("");
      
      hideOrShowForms();
      resetMessage();
    }
    
  };

  // carregando dados da conta
  useEffect(() => {
    dispatch(getUsers());
  },[dispatch, message]);

  //funcao para alternar forms
  const hideOrShowForms = (form) => {
    if (form==="edit") {
      editUserForm.current.style.display = "block";
      newUserForm.current.style.display = "none";
      setButtonText("Cancelar");      
    } else if (buttonText === "Cancelar"){
      newUserForm.current.style.display = "none";
      editUserForm.current.style.display = "none";
      setButtonText("Criar Novo");  
    } else if (form==="new") {
      newUserForm.current.style.display = "block";
      setButtonText("Cancelar");      
    };
    setErrorFront(null);
    
  };

  //funcao para abrir formulario de edição preenchendo os dados
  const handleEditForm = (user) => {

    hideOrShowForms("edit");

    setEditId(user.id);
    setEditUsername(user.username);
    setEditName(user.name);
    setEditGroup(user.group);

  };

  // atualizando conta
  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (validate(editUsername,editName,editGroup)) {
      const user = {
        id: editId, username: editUsername, name: editName, group: editGroup
      };

      dispatch(updateUser(user));

      setEditId("");
      setEditUsername("");
      setEditName("");
      setEditGroup("");
      
      hideOrShowForms();
      resetMessage();
    }
  };

  // deletando conta
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    resetMessage();
  };

  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <br />
      <center><h2>Usuário</h2></center>
      <Button className="btn-light" size="sm" onClick={() => hideOrShowForms("new")}>{buttonText}</Button>
      <br /><br />
      {/* Form de inclusao */}
      <div ref={newUserForm} style={{display: "none"}}>
          <br />
          <Form onSubmit={handleInsertUser}>
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setNewUsername(e.target.value)} value={newUsername || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Nome" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setNewName(e.target.value)} value={newName || ""} />
                </FloatingLabel>
              </Form.Group>
            </Row>  
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Senha" className="mb-3">
                  <Form.Control required type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword || ""} />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Grupo" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setNewGroup(e.target.value)} value={newGroup || ""} />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="3">
                {!loading && <Button variant="success" size="sm" type="submit">Cadastrar</Button> }
                {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando...</Button> }
              </Form.Group>
            </Row>  
          </Form>
          <br />
      </div>
      {/* Form de edicao */}
      <div ref={editUserForm} style={{display: "none"}}>
          <br />
          <Form onSubmit={handleUpdateUser}>
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setEditUsername(e.target.value)} value={editUsername || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Nome" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setEditName(e.target.value)} value={editName || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Grupo" className="mb-3">
                  <Form.Control required type="text" onChange={(e) => setEditGroup(e.target.value)} value={editGroup || ""} />
                </FloatingLabel>
              </Form.Group>
            </Row>  
            <Row>
              <Form.Group as={Col} md="3" >
                {!loading && <Button variant="success" size="sm" type="submit">Salvar</Button> }
                {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando...</Button> }
              </Form.Group>
            </Row>  
          </Form>
          <br />
      </div>
      {/* mensagem e erros */}
      <div>
        {error && <Alert variant="danger" >{error}</Alert> }
        {errorFront && <Alert variant="danger" >{errorFront}</Alert> }
        {message && <Alert variant="success" >{message}</Alert> }
      </div>
      {/* tabela com os dados */}
      <div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Nome</th>
                <th>Grupo</th>
                <th>Ações</th>
              </tr>
            </thead>
            {users && users.map((user) => (
              <tbody key={user.id}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.group}</td>
                  <td><Button size="sm" onClick={() => handleEditForm(user)} variant="outline-warning">Editar</Button>{" - "} 
                      <Button size="sm" onClick={() => handleDeleteUser(user.id)} variant="outline-danger">Deletar</Button></td>
                </tr>
              </tbody>
              
            ))}
        </Table>
      </div>
    </div>
  );
};

export default User;