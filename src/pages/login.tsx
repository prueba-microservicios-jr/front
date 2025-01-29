import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    /*if (email === "usuario@example.com" && password === "123456") {
      login({ email }); // Guarda el usuario en el contexto
      navigate("/dashboard"); // Redirige al dashboard
    } else {
      alert("Credenciales incorrectas");
    }*/

    axios.post('http://localhost:3000/api/auth/login',{
      username: username,
      password: password
    }).then((response) => {
      const data = response.data;
      login({ username: username, access_token: data.data.access_token });
      navigate("/dashboard");
    }).catch((error) => {

      const res = error.response;
      if(res.status === 401){
        setError(res.data.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-45 sm:rounded-3xl z-0">
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl z-0">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="admin"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="123456"
              />
            </div>
            <div className="text-red-500 my-4 text-lg">{error}</div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Iniciar Sesión
            </button>
          </form>
          
        </div>
      </div>
      
    </div>
  );
};

export default Login;