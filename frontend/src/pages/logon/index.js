import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from "react-icons/fi";

import api from '../../services/api';

import './style.css';

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon () {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin (event) {
        event.preventDefault();
        try {
            let response = await api.post('users/login', {login, senha});
            if(response.data.erro){
                alert(response.data.erro)
                return;
            }
            const { id,nome,email } = response.data
            console.log(id,nome,email)
            localStorage.setItem('id', id);
            localStorage.setItem('name', nome);
            localStorage.setItem('email', email)

            history.push('/profile');

        } catch (err) {
            alert("Usuário não encontrado");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        type="text" 
                        placeholder="Seu login"
                        value={login}
                        onChange = {e=>setLogin(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Sua senha"
                        value={senha}
                        onChange = {e=>setSenha(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}