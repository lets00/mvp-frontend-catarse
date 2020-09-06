import React from 'react'
import logo from '../images/logo_big.png'

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <>
            <nav className="navbar align-center" style={{ "backgroundColor": "#503a80" }}>
                <div className="d-flex justify-content-between">
                    <Link to="/" className="navbar-brand mr-4">
                        <img src={logo} alt="Logo catarse" height="30" className="d-inline-block align-top"></img>
                    </Link>

                    <a className="ml-4 mr-4 mt-2" href="/">Comece seu projeto</a>
                    <form className="form-inline">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Título do projeto" defaultValue="" onChange={(e) => { props.updateTitle(e.target.value)}}/>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-outline-secondary"> <FontAwesomeIcon icon={faEye} /></button>
                            </div>
                        </div>
                    </form>
                </div>
                {props.isAuth ? <button className="btn btn-danger" onClick={props.logout}>Logout</button> : <Link className="btn btn-primary" to='/login'>Login</Link>}
            </nav>
        </>
    )
}
