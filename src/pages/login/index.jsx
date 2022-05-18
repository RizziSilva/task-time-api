import { useState } from 'react'
import { Input, Button } from 'app-components'
import style from './style.module.scss'

export function Login() {
  const [form, setForm] = useState({ username: '', password: '' })

  function handleInputOnChange({ target }) {
    const { name, value } = target

    setForm({ ...form, [name]: value })
  }

  function handleSubmitClick() {
    // TODO silva.william 17/05/2022: Criar a request para fazer login
  }

  return (
    <div className={style['container-login']}>
      <div className={style['container-form']}>
        <span className={style['title']}>Task Time</span>
        <Input
          onChange={handleInputOnChange}
          value={form.username}
          name='username'
          id='username'
          label='Nome de Usuário'
        />
        <Input
          onChange={handleInputOnChange}
          value={form.password}
          name='password'
          id='password'
          label='Senha'
        />
        <Button
          className={style['button']}
          onClick={handleSubmitClick}
          label='Login'
        />
      </div>
    </div>
  )
}
