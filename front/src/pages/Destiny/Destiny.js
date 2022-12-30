//bootstrap
import { Button , Table, Alert, Form, Row, Col, FloatingLabel  } from "react-bootstrap";

// hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessageDestiny } from "../../hooks/useResetComponentMessage";

// redux
import { getDestinys, insertDestiny, updateDestiny, deleteDestiny } from "../../slices/destinySlice"

const Destiny = () => {
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
  const resetMessage = useResetComponentMessageDestiny(dispatch);

  const {destinys, loading, message, error } = useSelector((state) => state.destiny);
  const { user } = useSelector((state) => state.auth);

  const newDestinyForm = useRef();
  const editDestinyForm = useRef();
  
  // cadastrando novo registro
  const handleInsertDestiny = (e) => {
    e.preventDefault();

    const destiny = {
      name: newName,
    };

    dispatch(insertDestiny(destiny))
        
    setNewName("");
    
    hideOrShowForms();
    resetMessage();
  };

  // carregando dados da tabela
  useEffect(() => {
    dispatch(getDestinys());
  },[dispatch, message]);

  //funcao para alternar forms
  const hideOrShowForms = (form) => {
    if (form==="edit") {
      editDestinyForm.current.style.display = "block";
      newDestinyForm.current.style.display = "none";
      setButtonText("Cancelar");      
    } else if (buttonText === "Cancelar"){
      newDestinyForm.current.style.display = "none";
      editDestinyForm.current.style.display = "none";
      setButtonText("Criar Novo");  
    } else if (form==="new") {
      newDestinyForm.current.style.display = "block";
      setButtonText("Cancelar");      
    };
    setErrorFront("");
    
  };

  //funcao para abrir formulario de edição preenchendo os dados
  const handleEditForm = (destiny) => {

    hideOrShowForms("edit");

    setEditId(destiny.id);
    setEditName(destiny.name);

  };

  // atualizando registro
  const handleUpdateDestiny = (e) => {
    e.preventDefault();

    const destiny = {
      id: editId, name: editName
    };

    dispatch(updateDestiny(destiny))

    setEditId("");
    setEditName("");

    hideOrShowForms();
    resetMessage();
  };

  // deletando registro
  const handleDeleteDestiny = (id) => {
    dispatch(deleteDestiny(id));
    resetMessage();
  };

  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <br />
      <center><h2>Destinos</h2></center>
      <Button className="btn-light" size="sm" onClick={() => hideOrShowForms("new")}>{buttonText}</Button>
      <br /><br />
      {/* Form de inclusao */}
      <div ref={newDestinyForm} style={{display: "none"}}>
      <Form onSubmit={handleInsertDestiny}>
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
      <div ref={editDestinyForm} style={{display: "none"}}>
        <Form onSubmit={handleUpdateDestiny}>
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
            {destinys && destinys.map((destiny) => (
              <tbody key={destiny.id}>
                <tr>
                  <td>{destiny.id}</td>
                  <td>{destiny.name}</td>
                  <td><Button size="sm" onClick={() => handleEditForm(destiny)} variant="outline-warning">Editar</Button>{" - "}
                  {user.group === "admin" &&
                    <Button size="sm" onClick={() => handleDeleteDestiny(destiny.id)} variant="outline-danger">Deletar</Button>
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

export default Destiny;