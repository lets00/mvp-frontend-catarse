import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { formatMoney } from '../helpers/format'

export default function ProjectCard(props) {
    const [donations, setDonations] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getDonations = async () => {
            const request = await fetch(`http://localhost:4000/v1/support/${props.id}`)
            const data = await request.json()
            setDonations(data)
        }
        getDonations()
    }, [props.id])

    const calculatePercentage = () => {
        const donationsValue = donations.reduce((acc, donation) => acc + +(donation.value), 0)
        return Math.round(100 * donationsValue / +props.goal)
    }

    const toProjectInfo = (id) => {
        history.push(`/project/${id}`)
    }

    return (
        <div className="card" onClick={() => toProjectInfo(props.id)} style={{ cursor: 'pointer' }}>
            <img className="card-img-top" src={props.image_url} alt={`Project ${props.id}`}></img>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="text-muted"> por {props.user_id} </p>
                <p className="card-text"> {props.description} </p>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${calculatePercentage()}%` }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="row d-flex justify-content-between">
                    <p className="card-text">{calculatePercentage()}%</p>
                    <p className="card-text">{formatMoney(+props.goal)}</p>
                </div>
                <p>Até {new Date(props.finnish_date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}
