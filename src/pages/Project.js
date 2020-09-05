import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { getProjectById, getSupportById, getUserById, getProjectByUserId, donate, removeProjectById } from '../api/apiService'
import { formatMoney } from '../helpers/format'

export default function Project(props) {
    const [project, setProject] = useState({})
    const [support, setSupport] = useState([])
    const [collaborator, setCollaborator] = useState([])
    const [donnation, setDonnation] = useState('0.01')
    const [isUserProject, setIsUserProject] = useState(false)
    const history = useHistory();
    const { id } = useParams()

    const getTotalSupport = () => support.reduce((acc, sup) => acc + +sup.value, 0)

    const calcPercentage = () => Math.round(100 * getTotalSupport() / +project.goal)

    const donateToProject = async () => {
        if (props.login.jwt) {
            const result = await donate(props.login.jwt, id, donnation)
            if (result === 200) {
                setSupport(await getSupportById(id))
            }
        } else {
            history.push('/login')
        }
    }

    const isExpiratedProject = () => {
        const projectDate = new Date(project.finnish_date)
        const actualDate = new Date()
        return projectDate > actualDate
    }

    const removeProject = async () => {
        const result = await removeProjectById(props.login.jwt, id)
        if (result === 200){
            history.push('/')
        } else {
            console.log('Not removed', result)
        }
    }

    useEffect(() => {
        const updateProject = async () => {
            setProject(await getProjectById(id))
            setSupport(await getSupportById(id))
        }
        updateProject()
    }, [id])

    useEffect(() => {
        const updateCollaborators = async () => {
            let collaborator_id = support.map((sup) => sup.user_id)
            collaborator_id = Array.from(new Set(collaborator_id))
            let users = []
            for (let i = 0; i < collaborator_id.length; i++) {
                const user = await getUserById(collaborator_id[i])
                users.push(user['username'])
            }
            setCollaborator(users)
        }
        updateCollaborators()
    }, [support])

    useEffect(() => {
        const updateUserProject = async () => {
            if (props.login.jwt !== '') {
                const my_projects = await getProjectByUserId(props.login.user_id)
                const find_project = my_projects.find((user_project) => user_project.id === +id)
                if (find_project) {
                    setIsUserProject(true)
                }
            } else {
                setIsUserProject(false)
            }
        }
        updateUserProject()
    }, [props.login.jwt, props.login.user_id, id])

    return (
        <>
            <section className="text-center pb-4" style={{ color: 'white', backgroundSize: 'auto, cover', backgroundRepeat: 'repeat', backgroundImage: `linear-gradient(rgba(0, 4, 8, 0.82), rgba(0, 4, 8, 0.82)), url(${project.image_url})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>{project.title}</h1>
                        </div>
                    </div>
                    <div className="mt-4 mb-4"></div>
                    <div className="row">
                        <div className="col-8">
                            <img className="img-fluid" src={project.image_url} alt={`Project: ${project.title}`} />
                        </div>
                        <div className="col-4">
                            <div className="card bg-secondary">
                                <div className="card-body text-left">
                                    <div className="d-flex">
                                        <h2>{formatMoney(project.goal)}</h2>
                                    </div>
                                    <p>assinados por <b>{collaborator.length}</b> pessoa(s)</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${calcPercentage()}%` }}></div>
                                    </div>
                                    <p>{calcPercentage()}% de <b>R$ {formatMoney(getTotalSupport())}</b> por mês</p>
                                    <p> Data de término: {new Date(project.finnish_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                {isExpiratedProject() ? (
                                    <>
                                        <input className="mr-2" type="number" value={donnation} onChange={(e) => setDonnation(e.target.value)} min="0.01" step="0.01" />
                                        <button className="btn btn-success" onClick={donateToProject}>Colaborar</button>
                                    </>
                                ) : <h1 className="badge badge-pill badge-danger">Expirado</h1>}

                                {isUserProject ? (
                                    <div className="justify-content-center d-flex mt-2">
                                        <button className="btn btn-warning mr-2">Atualizar Projeto</button>
                                        <button className="btn btn-danger" onClick={removeProject} >Apagar Projeto</button>
                                    </div>) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <section className="container mt-2">
                <div className="row">
                    <div className="col-12">
                        <h2> Descrição </h2>
                        <p className="mt-4">{project.description}</p>
                    </div>
                    <div className="col-12">
                        <h2>Colaboradores</h2>
                        <ul>
                            {collaborator.map((col, id) => (<li key={id}>{col}</li>))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
