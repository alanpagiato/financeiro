// css
import "./Login.css";

//bootstrap
import { Button , Alert, Form, Row, FloatingLabel  } from "react-bootstrap";

// hooks
import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { login } from "../../slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  // faz o login
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    dispatch(login(user));

  };

  
  if(loading) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <center><h2>Login</h2></center>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group md="3" >
              <FloatingLabel label="Usuário" className="mb-3">
                <Form.Control required type="text" onChange={(e) => setUsername(e.target.value)} value={username || ""} />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group md="3" >
              <FloatingLabel label="Senha" className="mb-3">
                <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
              </FloatingLabel>
            </Form.Group>
          </Row>  
          <br />
          <Row>
            <Form.Group md="3">
              {!loading && <Button variant="success" size="sm" type="submit">Entrar</Button> }
              {loading && <Button variant="light" size="sm" type="submit" disabled>Carregando</Button> }
            </Form.Group>
          </Row>  
        </Form>
        <br />
      </div>
    
      {/* mensagem e erros */}
      <br />
      <div>
       {error && <Alert variant="danger" >{error}</Alert> }
     </div>
    </div>
  );
};

export default Login