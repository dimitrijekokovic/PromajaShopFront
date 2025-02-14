import { useState } from 'react';
import Input from './Input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/customAuth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Uspešna prijava!');
    } else {
      setMessage(data.message);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
