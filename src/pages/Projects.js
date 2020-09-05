import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getData = async () => {
            const req = await fetch('http://localhost:4000/v1/project')
            const data = await req.json()
            const sorted = data.sort((a, b) => new Date(a.finnish_date) - new Date(b.finnish_date))
            setProjects(sorted)
        }
        getData()
    }, [])

    useEffect(() => {
        console.log(projects)
    }, [projects])

    const changeSelectOrder = (e) => {
        switch (e.target.value) {
            case "title":
                setProjects(projects.sort((a, b) => a.title - b.title))
                break
            case "meta":
                setProjects(projects.sort((a, b) => +(a.goal) - +(b.goal)))
                break
            case "date":
                setProjects(projects.sort((a, b) => new Date(a.finnish_date) - new Date(b.finnish_date)))
                break
            default: console.log("default"); setProjects(projects)
        }
    }
    return (
        <>
            <div className="d-flex pb-4 pt-4 text-center justify-content-center" style={{ backgroundColor: "#503a80" }}>
                <h2>Quero ordernar por </h2>
                <select className="ml-2" onChange={(e) => changeSelectOrder(e)}>
                    <option value="title">Título</option>
                    <option value="meta">Meta de arrecadação</option>
                    <option value="date">Data de encerramento</option>
                </select>

            </div>
            <div className="container">
                <p> {projects.length} projetos encontrados</p>
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