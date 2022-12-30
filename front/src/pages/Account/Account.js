//bootstrap
import { Button , Table, Alert, Form, Row, Col, Container, FloatingLabel  } from "react-bootstrap";

// hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessageAccount } from "../../hooks/useResetComponentMessage";

// redux
import { getAccounts, insertAccount, updateAccount, deleteAccount } from "../../slices/accountSlice"

const Account = () => {
  //states dos formularios
  const [newName, setNewName] = useState("");
  const [newAgency, setNewAgency] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newDigit, setNewDigit] = useState("");
  const [newBank, setNewBank] = useState(false);
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState("");
  const [editAgency, setEditAgency] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editDigit, setEditDigit] = useState("");
  const [editBank, setEditBank] = useState(false);
  // state para titulo do botao
  const [buttonText, setButtonText] = useState("Criar Novo");
  // state para erros de validação de front end
  const [errorFront, setErrorFront] = useState("")

  //iniciando dispatch
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessageAccount(dispatch);

  const {accounts, loading, message, error } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.auth);

  const newAccountForm = useRef();
  const editAccountForm = useRef();

  
  // cadastrando nova conta
  const handleInsertAccount = (e) => {
    e.preventDefault();

    let stringBank = ""
    if (newBank === true) {
      stringBank = "1";
    } else {
      stringBank = "0";
    };

    const account = {
      name: newName, agency: newAgency, accountNumber: newNumber, accountDigit: newDigit, bank: stringBank
    };

    dispatch(insertAccount(account))
        
    setNewName("");
    setNewAgency("");
    setNewNumber("");
    setNewDigit("");
    setNewBank(false);
    
    hideOrShowForms();
    resetMessage();
  };

  // carregando dados da conta
  useEffect(() => {
    dispatch(getAccounts());
  },[dispatch, message]);

  //funcao para alternar forms
  const hideOrShowForms = (form) => {
    if (form==="edit") {
      editAccountForm.current.style.display = "block";
      newAccountForm.current.style.display = "none";
      setButtonText("Cancelar");      
    } else if (buttonText === "Cancelar"){
      newAccountForm.current.style.display = "none";
      editAccountForm.current.style.display = "none";
      setButtonText("Criar Novo");  
    } else if (form==="new") {
      newAccountForm.current.style.display = "block";
      setButtonText("Cancelar");      
    };
    setErrorFront("");
    
  };

  //funcao para abrir formulario de edição preenchendo os dados
  const handleEditForm = (account) => {

    hideOrShowForms("edit");

    setEditId(account.id);
    setEditName(account.name);
    setEditAgency(account.agency);
    setEditNumber(account.accountNumber);
    setEditDigit(account.accountDigit);
    setEditBank(account.bank)
    account.bank === 1 ? (setEditBank(true)):(setEditBank(false)) ;

  };

  // atualizando conta
  const handleUpdateAccount = (e) => {
    e.preventDefault();

    let stringBank = ""
    if (editBank === true) {
      stringBank = "1";
    } else {
      stringBank = "0";
    };

    const account = {
      id: editId, name: editName, agency: editAgency, accountNumber: editNumber, accountDigit: editDigit, bank: stringBank
    };

    dispatch(updateAccount(account))

    setEditId("");
    setEditName("");
    setEditAgency("");
    setEditNumber("");
    setEditDigit("");
    setEditBank(false);

    hideOrShowForms();
    resetMessage();
  };

  // deletando conta
  const handleDeleteAccount = (id) => {
    dispatch(deleteAccount(id));
    resetMessage();
  };

  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <br />
      <center><h2>Contas</h2></center>
      <Button className="btn-light" size="sm" onClick={() => hideOrShowForms("new")}>{buttonText}</Button>
      <br /><br />
      {/* Form de inclusao */}
      <div ref={newAccountForm} style={{display: "none"}}>
        <Container className="container-form" >
          <br />
          <Form onSubmit={handleInsertAccount}>
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Nome" className="mb-3">
                <Form.Control required type="text" onChange={(e) => setNewName(e.target.value)} value={newName || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Agência" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setNewAgency(e.target.value)} value={newAgency || ""} />
                </FloatingLabel>
              </Form.Group>
            </Row>  
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Número da conta" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setNewNumber(e.target.value)} value={newNumber || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="1" >
                <FloatingLabel label="Dígito" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setNewDigit(e.target.value)} value={newDigit || ""} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <Form.Check type="switch" label="Banco" checked={newBank} onChange={(e) => setNewBank(e.target.checked)}/>
                  
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4">
                {!loading && <Button variant="success" size="sm" type="submit">Cadastrar</Button> }
                {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando</Button> }
              </Form.Group>
            </Row>  
          </Form>
          <br />
        </Container>
      </div>
      {/* Form de edicao */}
      <div ref={editAccountForm} style={{display: "none"}}>
        <Container className="container-form">
          <br />
          <Form onSubmit={handleUpdateAccount}>
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Nome" className="mb-3">
                  <Form.Control required type="text"onChange={(e) => setEditName(e.target.value)} value={editName || ""} />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Agência" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setEditAgency(e.target.value)} value={editAgency || ""} />
                </FloatingLabel>  
              </Form.Group>
            </Row>  
            <Row>
              <Form.Group as={Col} md="3" >
                <FloatingLabel label="Número da conta" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setEditNumber(e.target.value)} value={editNumber || ""} />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group as={Col} md="1" >
                <FloatingLabel label="Dígito" className="mb-3">
                  <Form.Control type="text" onChange={(e) => setEditDigit(e.target.value)} value={editDigit || ""} />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group as={Col} md="4" >
              <Form.Check type="switch" label="Banco" checked={editBank} onChange={(e) => setEditBank(e.target.checked)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4">
                {!loading && <Button variant="success" size="sm" type="submit">Salvar</Button> }
                {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando...</Button> }
              </Form.Group>
            </Row>  
          </Form>
          <br />
        </Container>  
      </div>
      {/* mensagem e erros */}
      <div>
        {error && <Alert variant="danger" >{error}</Alert> }
        {errorFront && <Alert variant="danger" >{errorFront}</Alert> }
        {message && <Alert variant="success" >{message}</Alert> }
      </div>
      {/* tabela com os dados */}
      <br />
      <div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Agência</th>
                <th>Conta</th>
                <th>Banco</th>
                <th>Ações</th>
              </tr>
            </thead>
            {accounts && accounts.map((account) => (
              <tbody key={account.id}>
                <tr>
                  <td>{account.id}</td>
                  <td>{account.name}</td>
                  <td>{account.agency}</td>
                  <td>{account.accountNumber} - {account.accountDigit}</td>
                  <td>{account.bank===1 ? ("Sim") : ("Não")}</td>
                  <td><Button size="sm" onClick={() => handleEditForm(account)} variant="outline-warning">Editar</Button>{" - "}
                  {user.group === "admin" &&
                    <Button size="sm" onClick={() => handleDeleteAccount(account.id)} variant="outline-danger">Deletar</Button>
                  }
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
};

export default Account;