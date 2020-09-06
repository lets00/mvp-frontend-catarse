import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getProjectByUserId, updateProjectById } from '../api/apiService';
import { formatMonth } from '../helpers/format';
import { ToastContainer, toast } from 'react-toastify';


export default function Update(props) {
    const history = useHistory()
    const [projectUpdated, setProjectUpdated] = useState({})
    const [project, setProject] = useState({})
    const [valid, setValid] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const updateProject = async () => {
            if (!props.login.jwt) {
                history.push('/login')
            } else {
                const my_projects = await getProjectByUserId(props.login.user_id)
                const find_project = my_projects.find((user_project) => user_project.id === +id)
                if (find_project) {
                    setProject(find_project)
                    setProjectUpdated(find_project)
                } else {
                    // You cannot be here. This redirect you to home
                    history.push('/')
                }
            }
        }
        updateProject()
    }, [props.login.jwt, props.login.user_id, id, history])

    const updateField = (id, value) => {
        projectUpdated[id] = value
        setProjectUpdated(projectUpdated)
        validateData()
    }

    const validateData = () => {
        const isNotNone = Object.keys(projectUpdated).every(key => project[key])
        setValid(isNotNone)
    }

    const convertDateToInputTag = (datetime) => {
        const date = new Date(datetime)
        return `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatMonth(date.getDate())}`
    }

    const updateData = async () => {
        const result = await updateProjectById(props.login.jwt, id, projectUpdated)
        if (result === 200) {
            history.push('/')
        } else {
            toast.error(`Não foi possível atualizar as informações. Por favor verifique os dados passados. Erro: ${result}`, {
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
            <h1>Atualizar projeto</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input type="text" className="form-control" id="title" maxLength="64" defaultValue={projectUpdated.title} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea type="text" className="form-control" id="description" maxLength="512" defaultValue={projectUpdated.description} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">URL da imagem</label>
                    <input type="text" className="form-control" id="image_url" defaultValue={projectUpdated.image_url} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Meta de arrecadação</label>
                    <input type="number" className="form-control" id="goal" min="0.01" max="500" step="0.01" defaultValue={projectUpdated.goal} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="finnish_date">Data de encerramento</label>
                    <input type="date" className="form-control" id="finnish_date" defaultValue={convertDateToInputTag(projectUpdated.finnish_date)} onChange={(e) => updateField(e.target.id, e.target.value)} />
                </div>
                {valid ? <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); updateData() }}>Atualizar projeto</button> : null}
            </form>
            <ToastContainer />
        </div>
    )
}
