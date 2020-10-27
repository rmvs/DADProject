import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from "react-icons/fi";

import api from '../../services/api';

import './style.css';

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import petLogo from "../../assets/PET.png";

export default function Logon () {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin (event) {
        event.preventDefault();
        try {
            let response = await api.post('users/login', {login, senha});
            console.log(response);
            if(response.data.erro){
                alert(response.data.erro)
                return;
            }
            const { id,pessoaid,nome,email } = response.data
            console.log(id,nome,email)
            localStorage.setItem('id', id);
            localStorage.setItem('pessoaid',pessoaid);
            localStorage.setItem('name', nome);
            localStorage.setItem('email', email)

            history.push('/profile');

        } catch (err) {
            alert("Usuário não encontrado");
        }
    }

    async function verifySession(){
        if (localStorage.getItem('email') != null){
            history.push('/profile');
        }
    }

    verifySession();

    return(
        <div className="logon-container">
            <section className="form">                           
                <form onSubmit={handleLogin}>  
                <img src={petLogo} alt="Be the Hero" style={{'maxWidth':'50%'}}/>               
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
        </div>
    );
}