import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';

export default function Profile () {
    let [incidents, setIncidents] = useState([]);
    let history = useHistory();

    let nome  = localStorage.getItem('nome');
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id')

    useEffect( () => {
        api.get('/profile', {
            headers: {
                Authorization: id
            }
        }).then(response => {
            console.log(response.data)
            setIncidents(response.data);
        });
    }, [id]);

    async function handleDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: id
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {
            alert('Erro ao deletar chamado, tente novamente.');
        }
    }

    function handleLogout () {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo(a), {nome}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo chamado</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Chamados Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => {
                        return (
                            <li key={incident.id}>
                                <strong>CASO :</strong>
                                <p>{incident.title}</p>

                                <strong>DESCRIÇÃO</strong>
                                <p>{incident.description}</p>

                                <strong>VALOR: </strong>
                                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                                <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                                    <FiTrash2 size={20} color="#a8a8b3"/>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}