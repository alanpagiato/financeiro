//bootstrap
import { Button , Table, Alert, Form, Row, Col, FloatingLabel  } from "react-bootstrap";

// hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessagePaymentMethod } from "../../hooks/useResetComponentMessage";

// redux
import { getPaymentMethods, insertPaymentMethod, updatePaymentMethod, deletePaymentMethod } from "../../slices/paymentMethodSlice"

const PaymentMethod = () => {
  //states dos formularios
  const [newDescription, setNewDescription] = useState("");
  const [editId, setEditId] = useState("")
  const [editDescription, setEditDescription] = useState("");
  // state para titulo do botao
  const [buttonText, setButtonText] = useState("Criar Novo");
  // state para erros de validação de front end
  const [errorFront, setErrorFront] = useState("")

  //iniciando dispatch
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessagePaymentMethod(dispatch);

  const {paymentMethods, loading, message, error } = useSelector((state) => state.paymentMethod);
  const { user } = useSelector((state) => state.auth);

  const newPaymentMethodForm = useRef();
  const editPaymentMethodForm = useRef();
  
  // cadastrando novo registro
  const handleInsertPaymentMethod = (e) => {
    e.preventDefault();

    const paymentMethod = {
      description: newDescription,
    };

    dispatch(insertPaymentMethod(paymentMethod))
        
    setNewDescription("");
    
    hideOrShowForms();
    resetMessage();
  };

  // carregando dados da tabela
  useEffect(() => {
    dispatch(getPaymentMethods());
  },[dispatch, message]);

  //funcao para alternar forms
  const hideOrShowForms = (form) => {
    if (form==="edit") {
      editPaymentMethodForm.current.style.display = "block";
      newPaymentMethodForm.current.style.display = "none";
      setButtonText("Cancelar");      
    } else if (buttonText === "Cancelar"){
      newPaymentMethodForm.current.style.display = "none";
      editPaymentMethodForm.current.style.display = "none";
      setButtonText("Criar Novo");  
    } else if (form==="new") {
      newPaymentMethodForm.current.style.display = "block";
      setButtonText("Cancelar");      
    };
    setErrorFront("");
    
  };

  //funcao para abrir formulario de edição preenchendo os dados
  const handleEditForm = (paymentMethod) => {

    hideOrShowForms("edit");

    setEditId(paymentMethod.id);
    setEditDescription(paymentMethod.description);

  };

  // atualizando registro
  const handleUpdatePaymentMethod = (e) => {
    e.preventDefault();

    const paymentMethod = {
      id: editId, description: editDescription
    };

    dispatch(updatePaymentMethod(paymentMethod))

    setEditId("");
    setEditDescription("");

    hideOrShowForms();
    resetMessage();
  };

  // deletando registro
  const handleDeletePaymentMethod = (id) => {
    dispatch(deletePaymentMethod(id));
    resetMessage();
  };

  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <br />
      <center><h2>Formas de Pagamento</h2></center>
      <Button className="btn-light" size="sm" onClick={() => hideOrShowForms("new")}>{buttonText}</Button>
      <br /><br />
      {/* Form de inclusao */}
      <div ref={newPaymentMethodForm} style={{display: "none"}}>
      <Form onSubmit={handleInsertPaymentMethod}>
        <Row>
          <Form.Group as={Col} md="3" >
            <FloatingLabel label="Descrição" className="mb-3">
              <Form.Control required type="text" onChange={(e) => setNewDescription(e.target.value)} value={newDescription || ""} />
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
      <div ref={editPaymentMethodForm} style={{display: "none"}}>
        <Form onSubmit={handleUpdatePaymentMethod}>
          <Row>
            <Form.Group as={Col} md="3" >
              <FloatingLabel label="Descrição" className="mb-3">
                <Form.Control required type="text" onChange={(e) => setEditDescription(e.target.value)} value={editDescription || ""} />
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
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            {paymentMethods && paymentMethods.map((paymentMethod) => (
              <tbody key={paymentMethod.id}>
                <tr>
                  <td>{paymentMethod.id}</td>
                  <td>{paymentMethod.description}</td>
                  <td><Button size="sm" onClick={() => handleEditForm(paymentMethod)} variant="outline-warning">Editar</Button>{" - "}
                  {user.group === "admin" &&
                    <Button size="sm" onClick={() => handleDeletePaymentMethod(paymentMethod.id)} variant="outline-danger">Deletar</Button>
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

export default PaymentMethod;