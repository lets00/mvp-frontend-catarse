import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createProject } from '../api/apiService'
import { toast, ToastContainer } from 'react-toastify'

export default function New(props) {
    const history = useHistory()
    const [project, setProject] = useState({})
    const [valid, setValid] = useState(false)

    useEffect(() => {
        const updateProject = async () => {
            if (!props.login.user_id) {
                history.push('/login')
            } else {
                const proj = {
                    'user_id': props.login.user_id,
                    'title': '',
                    'description': '',
                    'image_url': '',
                    'finnish_date': '',
                    'goal': 0,
                }
                setProject(proj)
            }
        }
        updateProject()
    }, [props.login.user_id, history])

    const updateField = (id, value) => {
        project[id] = value
        setProject(project)
        validateData()
    }

    const validateData = () => {
        const isNotNone = Object.keys(project).every(key => project[key])
        setValid(isNotNone)
    }

    const createData = async () => {
        const result = await createProject(props.login.jwt, project)
        if (result === 200) {
            history.push('/')
        } else {
            toast.error(`Não foi possível criar o projeto as informações. Por favor verifique os dados passados. Erro: ${result}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="container">
            <h1>Novo projeto</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input type="text" className="form-control" id="title" maxLength="64" defaultValue={project.title} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea type="text" className="form-control" id="description" maxLength="512" defaultValue={project.description} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">URL da imagem</label>
                    <input type="text" className="form-control" id="image_url" defaultValue={project.image_url} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Meta de arrecadação</label>
                    <input type="number" className="form-control" id="goal" min="0.01" max="500" step="0.01" defaultValue={project.goal} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="finnish_date">Data de encerramento</label>
                    <input type="date" className="form-control" id="finnish_date" onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                {valid ? <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); createData() }}>Criar projeto</button> : null}
            </form>
            <ToastContainer />
        </div>
    )
}
