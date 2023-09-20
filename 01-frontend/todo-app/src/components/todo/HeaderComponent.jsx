import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return (

        
        <header className="border-bottom mb-5 p-3 bg-primary">
        <div className="container">
            <div className="row align-items-center">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand ms-2 fs-3 fw-bold text-light" to="#">
                        <i className="bi bi-check-square-fill me-2"></i>
                        Task Manager
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {isAuthenticated && (
                                    <Link className="nav-link text-light" to="/welcome/ashutosh">
                                        <i className="bi bi-house-door-fill me-1"></i>
                                        Dashboard
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && (
                                    <Link className="nav-link text-light" to="/todos">
                                        <i className="bi bi-list me-1"></i>
                                        Tasks
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {!isAuthenticated && (
                                    <Link className="nav-link text-light" to="/login">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && (
                                    <Link className="nav-link text-danger" to="/logout" onClick={logout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Logout
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    
    

    )
}

export default HeaderComponent