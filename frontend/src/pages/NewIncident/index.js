import React, { useState } from 'react';

import './styles.css';
import logoImg from "../../assets/logo.svg";
import petLogo from "../../assets/PET.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ImageUploading from 'react-images-uploading';

import api from '../../services/api';

export default function NewIncident() {

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [value, setValue] = useState('');
    let [file, setFile] = useState('');
    let [images, setImages] = useState([]);

    let id = localStorage.getItem('id');
    let history = useHistory();

    async function onChange (imageList, addUpdateIndex) {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    async function handleNewIncident (event) {
        event.preventDefault();

        let data = {
            title,
            description,
            value,
            file
        };

        try {
            const formData = new FormData();
            formData.append("arquivo",data.file);
            formData.append("titulo",data.title);
            formData.append("descricao",data.description);
            formData.append("valor",value)
            if(images.length > 0){
                formData.append("foto",images[0].file)
            }            
            await api.post('incidents', formData, {
                headers: {
                    Authorization: id
                }
            } );

            history.push('/profile');

        } catch (err) {
            console.log(err)
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
         <div className="content">
             <section>
                {/* <img src={petLogo} alt="Be The Hero"/> */}                
                <ImageUploading   
                    value={images}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                   {
                       ({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                       }) => (
                       <div className="upload__image-wrapper" style={{'textAlign':'center'}}>
                           {
                               imageList.map((image,index)=>(
                                    <div key={index}>
                                        <img src={image['data_url']} alt="" style={{'maxWidth':'50%'}} />
                                    </div>                                    
                               ))
                           }                           
                           <button className={"button"} style={{'background':'blue','width':'50%','textAlign':'center'}} onClick={onImageUpload} {...dragProps}>Carregar foto</button>
                       </div>)
                   }
                </ImageUploading>      
                <h1>Cadastrar novo chamado</h1>          
                <p>Descreva o chamado detalhadamente. Você pode anexar um arquivo de qualquer formato.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
             </section>
             <form onSubmit={handleNewIncident}>
                 <input 
                    placeholder="Título do chamado"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    id="fil"
                    type="file"
                    placeholder="Screenshot"
                    onChange={event => {
                        setFile(event.target.files[0])
                        console.log(event.target.files)
                    }}
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