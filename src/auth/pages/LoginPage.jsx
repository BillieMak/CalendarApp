import './LoginPage.css';
import {useAuthStore, useForm2} from '../../hooks'
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}
 
const registerFormFields = {
    registerName:'',
    registerEmail:'',
    registerPassword:'',
    registerPassword2:'',
}

export const LoginPage = () => {

    const {startLogin, errorMessage, startRegister} = useAuthStore()

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm2(loginFormFields)
    const {registerName, registerEmail,registerPassword,registerPassword2,onInputChange:onRegisterInputChange} = useForm2(registerFormFields)

    const loginSubmit = (event)=>{
        event.preventDefault()
        startLogin({email:loginEmail,password: loginPassword})
    }

    const registerSubmit = (event) => {
        event.preventDefault()
        if(registerPassword !== registerPassword2){
            Swal.fire("Error en registro", 'Contraseñas no son iguales', "error")
            return;
        }

        startRegister({name:registerName,email: registerEmail,password:registerPassword})
        // console.log({registerName, registerEmail,registerPassword,registerPassword2})
    }

    useEffect(() => {
    if(errorMessage !== undefined) {
        Swal.fire("error en la autenticacion", errorMessage,'error')
    }
     
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-flex justifyContent-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={registerName}
                                name="registerName"
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={registerEmail}
                                name="registerEmail"
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={registerPassword}
                                name="registerPassword"
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                value={registerPassword2}
                                name="registerPassword2"
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}