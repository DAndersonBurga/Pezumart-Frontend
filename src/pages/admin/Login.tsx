import { toast, ToastContainer } from "react-toastify";
import "../../scss/admin/auth.scss";
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../hooks/useAuth";



const Login = () => {

    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regex: RegExp = new RegExp("[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}")

        const correo = e.currentTarget.correo.value as string;
        const password = e.currentTarget.password.value as string;

        if(!correo || !password) {
            toast.error("Todos los campos son obligatorios");
            return
        }

        if(!regex.test(correo)) {
            toast.error("El correo no es válido");
            return
        }
        
        login(correo, password)
    }

  return (
    <div className="auth">
        <img className="auth__imagen" src="../img/mario.png" alt="imagen mario" />
      <div className="auth__contenedor">
        <h1 className="auth__titulo">Login Pezu<span>Mart</span></h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__campos">
            <label className="auth-form__label" htmlFor="correo">
              Correo
            </label>
            <input className="auth-form__input" name="correo" id="correo" type="email" />
          </div>

          <div className="auth-form__campos">
            <label className="auth-form__label" htmlFor="password">
              Password
            </label>
            <input className="auth-form__input" name="password" type="password" />
          </div>

          <input className="auth-form__login" type="submit" value="Login" />
        </form>
      </div>


      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;