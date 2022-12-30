//bootstrap
import { Button , Table, Alert, Form, Row, Col, FloatingLabel  } from "react-bootstrap";

// hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessageOrigin } from "../../hooks/useResetComponentMessage";

// redux
import { getOrigins, insertOrigin, updateOrigin, deleteOrigin } from "../../slices/originSlice"

const Origin = () => {
  //states dos formularios
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState("");
  // state para titulo do botao
  const [buttonText, setButtonText] = useState("Criar Novo");
  // state para erros de validação de front end
  const [errorFront, setErrorFront] = useState("")

  //iniciando dispatch
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessageOrigin(dispatch);

  const {origins, loading, message, error } = useSelector((state) => state.origin);
  const { user } = useSelector((state) => state.auth);

  const newOriginForm = useRef();
  const editOriginForm = useRef();
  
  // cadastrando novo registro
  const handleInsertOrigin = (e) => {
    e.preventDefault();

    const origin = {
      name: newName,
    };

    dispatch(insertOrigin(origin))
        
    setNewName("");
    
    hideOrShowForms();
    resetMessage();
  };

  // carregando dados da tabela
  useEffect(() => {
    dispatch(getOrigins());
  },[dispatch, message]);

  //funcao para alternar forms
  const hideOrShowForms = (form) => {
    if (form==="edit") {
      editOriginForm.current.style.display = "block";
      newOriginForm.current.style.display = "none";
      setButtonText("Cancelar");      
    } else if (buttonText === "Cancelar"){
      newOriginForm.current.style.display = "none";
      editOriginForm.current.style.display = "none";
      setButtonText("Criar Novo");  
    } else if (form==="new") {
      newOriginForm.current.style.display = "block";
      setButtonText("Cancelar");      
    };
    setErrorFront("");
    
  };

  //funcao para abrir formulario de edição preenchendo os dados
  const handleEditForm = (origin) => {

    hideOrShowForms("edit");

    setEditId(origin.id);
    setEditName(origin.name);

  };

  // atualizando registro
  const handleUpdateOrigin = (e) => {
    e.preventDefault();

    const origin = {
      id: editId, name: editName
    };

    dispatch(updateOrigin(origin))

    setEditId("");
    setEditName("");

    hideOrShowForms();
    resetMessage();
  };

  // deletando registro
  const handleDeleteOrigin = (id) => {
    dispatch(deleteOrigin(id));
    resetMessage();
  };

  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <br />
      <center><h2>Origens</h2></center>
      <Button className="btn-light" size="sm" onClick={() => hideOrShowForms("new")}>{buttonText}</Button>
      <br /><br />
      {/* Form de inclusao */}
      <div ref={newOriginForm} style={{display: "none"}}>
      <Form onSubmit={handleInsertOrigin}>
        <Row>
          <Form.Group as={Col} md="3" >
            <FloatingLabel label="Name" className="mb-3">
              <Form.Control required type="text" onChange={(e) => setNewName(e.target.value)} value={newName || ""} />
            </FloatingLabel>
          </Form.Group>
        </Row>  
        <Row>
          <Form.Group as={Col} md="3">
            {!loading && <Button variant="success" size="sm" type="submit">Cadastrar</Button> }
            {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando</Button> }
          </Form.Group>
        </Row>  
      </Form>
      <br />
      </div>
      {/* Form de edicao */}
      <div ref={editOriginForm} style={{display: "none"}}>
        <Form onSubmit={handleUpdateOrigin}>
          <Row>
            <Form.Group as={Col} md="3" >
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control required type="text" onChange={(e) => setEditName(e.target.value)} value={editName || ""} />
              </FloatingLabel>
            </Form.Group>
          </Row>  
          <Row>
            <Form.Group as={Col} md="3">
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
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            {origins && origins.map((origin) => (
              <tbody key={origin.id}>
                <tr>
                  <td>{origin.id}</td>
                  <td>{origin.name}</td>
                  <td><Button size="sm" onClick={() => handleEditForm(origin)} variant="outline-warning">Editar</Button>{" - "}
                  {user.group === "admin" &&
                    <Button size="sm" onClick={() => handleDeleteOrigin(origin.id)} variant="outline-danger">Deletar</Button>
                  }   
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  )
}

export default Origin;