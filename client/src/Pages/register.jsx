import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export const Register = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const registration =  (event) => {
        event.preventDefault()
        axios.post('/register', {
            username,
            email,
            password
        })
        alert('Registration success now you can login')
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-center text-4xl mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registration}>
          <input type="text" value={username} placeholder="username" onChange={e => setUsername(e.target.value)}/>
          <input type="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
          <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
          Already a member?
            <Link className="underline text-black" to={"/login"}> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
