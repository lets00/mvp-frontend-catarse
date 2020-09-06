import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getProjects } from '../api/apiService'

export default function Projects(props) {
    const [projects, setProjects] = useState([])
    const [title, setTitle] = useState('')

    // const debounce = (callback, delay) => {
    //     let timer;
    //     return (...args) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => callback(...args), delay)
    //     }
    // }

    useEffect(() => {
        const getProjectsTitle = async () => {
            setTitle(props.title)
            if (!props.title) {
                setProjects(await getProjects())
            } else {
                setProjects(await getProjects(props.title))
            }
        }
        getProjectsTitle()

    }, [props.title])

    const changeSelectOrder = (e) => {
        switch (e.target.value) {
            case "title":
                setProjects(projects.sort((a, b) => a.title - b.title).splice(0, projects.length))
                break
            case "meta":
                setProjects(projects.sort((a, b) => +(a.goal) - +(b.goal)).splice(0, projects.length))
                break
            case "date":
                setProjects(projects.sort((a, b) => new Date(a.finnish_date) - new Date(b.finnish_date)).splice(0, projects.length))
                break
            default: setProjects(projects)
        }
    }
    return (
        <>
            <div className="d-flex pb-4 pt-4 text-center justify-content-center" style={{ backgroundColor: "#503a80" }}>
                <h2 style={{fontWeight: 400, color: "white"}}>Quero ordernar por </h2>
                <select className="ml-2" onChange={(e) => changeSelectOrder(e)}>
                    <option value="title">Título</option>
                    <option value="meta">Meta de arrecadação</option>
                    <option value="date">Data de encerramento</option>
                </select>

            </div>
            <div className="container">
                <p> {projects.length} projetos encontrados {title ? `com título ${title}` : null}</p>
                <div className="row">
                    {projects.map(project => {
                        return (
                            <div key={project.id} className="col-4 mt-4">
                                <ProjectCard
                                    id={project.id}
                                    image_url={project.image_url}
                                    title={project.title}
                                    user_id={project.user_id}
                                    description={project.description}
                                    goal={project.goal}
                                    finnish_date={project.finnish_date}
                                />
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
