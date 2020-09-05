import React, { useState } from 'react'
import logo from '../images/catarse.png'
import { useHistory } from 'react-router-dom'
import { login } from '../api/apiService'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassowrdChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        try {
            const json = await login(email, password)
            props.userLogged(json)
            history.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center mt-2">
                    <img src={logo} alt="Catarse logo"></img>
                    <h2 className="text-center mt-2">Cadastre-se</h2>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>
                        <div className="form-group">
                            <label htmlFor="email">Usuário/Email</label>
                            <input type="text" className="form-control" id="email" placeholder="lets00" value={email} onChange={(e) => handleEmailChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Senha</label>
                            <input type="password" className="form-control" id="pass" placeholder="*****" value={password} onChange={(e) => handlePassowrdChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-success">Efetuar cadastro</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
