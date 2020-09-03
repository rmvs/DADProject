import React, { useState } from 'react';

import './styles.css';
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

export default function NewIncident() {

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [value, setValue] = useState('');

    let ongId = localStorage.getItem('ongId');
    let history = useHistory();

    async function handleNewIncident (event) {
        event.preventDefault();

        let data = {
            title,
            description,
            value
        };

        try {

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            } );

            history.push('/profile');

        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
         <div className="content">
             <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
             </section>
             <form onSubmit={handleNewIncident}>
                 <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                 <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                 <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />

                 <button className="button" type="submit">Cadastrar</button>

             </form>
         </div>
     </div>
    );
}