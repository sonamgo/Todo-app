import {useParams, Link} from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {

    const {username } = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        console.log('called')
              
        retrieveHelloWorldPathVariable('sonam', authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup') )

    }

    function successfulResponse(response) {
        console.log(response)
        //setMessage(response.data)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
        <h1 className="display-4 text-primary mb-4">Welcome, {username}!</h1>
        <div className="lead mb-4">
            Manage your todos - <Link to="/todos" className="text-info">Go here</Link>
        </div>
        <div>
            <button className="btn btn-success btn-lg" onClick={callHelloWorldRestApi}>
                <i className="bi bi-check-circle-fill mr-2 me-3"></i>
                Call Hello World
            </button>
        </div>
        {message && (
            <div className="text-success mt-3">
                <i className="bi bi-check-circle-fill mr-2 me-3"></i>
                {message}
            </div>
        )}
    </div>
    )
}

export default WelcomeComponent