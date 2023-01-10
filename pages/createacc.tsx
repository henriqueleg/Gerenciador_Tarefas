import { useRouter } from "next/router";
import { useState } from 'react';
import { executeRequest } from "../services/api";

export default function createacc() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const body = {
    name,
    email,
    password
}

const doRegister = async () => {
  if (password == confirmPass) {
    try {
      const result = await executeRequest('register', 'POST', body);
      alert("Cadastrado com Sucesso!")
      goBack();
    }
    catch (e: any) {
      alert(e?.response?.data?.error);
    }
  } else {
    alert("Confirmação de Senha não confere.")
  }
    
  }

  function goBack() {
    router.push("/");
 }

  return (
    <div className="container-login">
        <img src="/logo.svg" alt="Logo Fiap" className="logo" />
        <div className="form">
            <div>
                <img src="/mail.svg" alt="Email" />
                <input type='text' placeholder="Email"
                    value={email} onChange={event => setEmail(event.target.value)}
                />
            </div>

            <div>
                <img src="/mail.svg" alt="Name" />
                <input type='text' placeholder="Name"
                    value={name} onChange={event => setName(event.target.value)}
                />
            </div>

            <div>
                <img src="/lock.svg" alt="Senha" />
                <input type='password' placeholder="Senha"
                    value={password} onChange={event => setPassword(event.target.value)}
                />
            </div>

            <div>
                <img src="/lock.svg" alt="Senha" />
                <input type='password' placeholder="Confirmação de Senha"
                value={confirmPass} onChange={event => setConfirmPass(event.target.value)}
                />
            </div>

            <button onClick={doRegister}>Cadastrar</button>
            <button onClick={goBack}>Voltar</button>
        </div>
        
    </div>
);
}