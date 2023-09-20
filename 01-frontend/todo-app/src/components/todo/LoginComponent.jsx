import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent() {

    const [username, setUsername] = useState('Sonam')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h1 className="text-center">Time to Login!</h1>      
                                  </div>
                    <div className="card-body">
                        {showErrorMessage && (
                            <div className="alert alert-danger" role="alert">
                                Authentication Failed. Please check your credentials.
                            </div>
                        )}
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Username"
                                    required
                                    style={{ padding: '10px', margin: '5px 0', width: '100%' }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    required
                                    style={{ padding: '10px', margin: '5px 0', width: '100%' }}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-block btn-lg"
                                onClick={handleSubmit}
                                style={{ margin: '15px 0', width: '100%' }}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
    )
}

export default LoginComponent