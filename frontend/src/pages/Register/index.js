import React, {useState} from 'react';

import './styles.css';
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

export default function Register () {

 const [nome, setNome] = useState('');
 const [email, setEmail] = useState('');
 const [login, setLogin] = useState('');
 const [senha, setSenha] = useState('');

 const history = useHistory();


 async function handleRegister (event) {
    event.preventDefault();// unable reload page at submit form

    const data = {
        nome,
        email,
        login,
        senha,
    }

    try {
        let response = await api.post('ongs', data);

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');
        
    } catch (err) {
        alert(`Erro no cadastro, tente novamente.`);
    }
 }

 return (
     <div className="register-container">
         <div className="content">
             <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
             </section>
             <form onSubmit={handleRegister}>
                 <input 
                    placeholder="Seu nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                 />

                 <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                 />
                 <input 
                    placeholder="Login"
                    value={login}
                    onChange={ e=> setLogin(e.target.value)}
                 />
                 <div className="input-group">
                     <input 
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                 </div>

                 <button className="button" type="submit">Cadastrar</button>


             </form>
         </div>
     </div>
 );
}