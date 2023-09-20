import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveTodoApi, updateTodoApi, createTodoApi } from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function TodoComponent() {
    
    const {id} = useParams()
    
    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    
    const username = authContext.username
    
    useEffect(
        () => retrieveTodos(),
        [id]
        )

    function retrieveTodos(){
        if(id != -1) {
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        console.log(todo)

        if(id==-1) {
            createTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
    
        } else {
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length<5) {
            errors.description = 'Enter atleast 5 characters'
        }

        if(values.targetDate == null || values.targetDate=='' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
        <h1 className="mb-4">Enter Todo Details</h1>
        <div>
            <Formik
                initialValues={{ description: '', targetDate: '' }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {(props) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                <i className="bi bi-card-text text-primary me-2"></i>Description
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Enter description"
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="targetDate" className="form-label">
                                <i className="bi bi-calendar text-primary me-2"></i>Target Date
                            </label>
                            <Field
                                type="date"
                                className="form-control"
                                id="targetDate"
                                name="targetDate"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning mt-2"
                            />
                        </div>
                        <button className="btn btn-success" type="submit">
                            <i className="bi bi-check-circle-fill me-2"></i>Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
    )
}