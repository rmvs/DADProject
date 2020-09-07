import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2, FiUserPlus, FiUserMinus} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';

export default function Profile () {
    let [incidents, setIncidents] = useState([]);
    let history = useHistory();

    let nome  = localStorage.getItem('nome');
    let email = localStorage.getItem('email');
    let pessoaid = localStorage.getItem('pessoaid');
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



    async function handleDeleteIncident (idChamado) {
        try {
            await api.delete(`incidents/${idChamado}`,{
                headers: {
                    Authorization: id
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== idChamado));

        } catch (err) {
            alert('Erro ao deletar chamado, tente novamente.');
        }
    }

    async function handleJoinIncident (chamado){
        const response = await api.post('incidents/join',{
            pessoaid: pessoaid,
            chamadoid: chamado.id
        },{
            headers: {
                Authorization: id
            }
        })

        setIncidents(incidents.filter(incident => {            
            if(incident.id == chamado.id){
                incident.participa = !incident.participa;
                try{
                    if(incident.participa){
                        incident.participantes++;
                    }else{
                        incident.participantes--;
                    }
                }catch(e) { }
                }
            return true;
        }))
    }

    function handleLogout () {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo(a), {nome} ({email})</span>
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

                                <strong>NOME ONG</strong>
                                <p>{incident.autor.ongnome}</p>

                                <strong>CASO :</strong>
                                <p>{incident.titulo}</p>

                                <strong>DESCRIÇÃO</strong>
                                <p>{incident.descricao}</p>

                                <strong>PARTICIPANTES</strong>
                                <p>{incident.participantes}</p> 

                                {
                                    incident.anexoid ?
                                    <React.Fragment>
                                    <strong>DOCUMENTO/ANEXO</strong>
                                    <p>Clique <a target="_blank" href={"https://vmdad2020groupdiag.blob.core.windows.net/documentos/" + incident.anexoid}>aqui</a> para visualizar.</p>
                                    </React.Fragment> : ""
                                }

                                <strong>VALOR: </strong>
                                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.arrecadado)}</p>

                                <strong>AUTOR</strong>
                                <p>{ `${incident.autor.nome} (${incident.autor.email})` }</p>

                                {
                                    ((k)=>{
                                        if(incident.autor.id != k){
                                            if(!incident.participa){
                                                return (
                                                    <button onClick={() => handleJoinIncident(incident)} type='button' style={{right:'50px'}}>
                                                        <FiUserPlus size={20} color="#a8a8b3" />
                                                    </button>
                                                );
                                            }else{
                                                return (
                                                    <button onClick={() => handleJoinIncident(incident)} type='button' style={{right:'50px'}}>
                                                        <FiUserMinus size={20} color="#a8a8b3" />
                                                    </button>
                                                )
                                            }                                            
                                        }
                                    })(pessoaid)
                                }
                                {
                                    ((k)=>{
                                        if(incident.autor.id == k){
                                            return(
                                                <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                                                    <FiTrash2 size={20} color="#a8a8b3"/>
                                                </button>
                                            )
                                        }
                                    })(pessoaid)
                                }                           
                                
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}