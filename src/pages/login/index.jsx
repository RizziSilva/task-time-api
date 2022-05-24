import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Input, Button } from 'app-components'
import { userService } from 'app-services'
import { storageUtil } from 'app-utils'
import { PAGES } from 'app-constants'
import style from './style.module.scss'

export function Login() {
  const router = useRouter()
  const { login } = userService()
  const { saveUserInfoOnStorage } = storageUtil()
  const [form, setForm] = useState({ email: '', password: '' })

  function handleInputOnChange({ target }) {
    const { name, value } = target

    setForm({ ...form, [name]: value })
  }

  function getIsLoginButtonDisabled() {
    const { email, password } = form

    return !email || !password
  }

  async function handleSubmitClick() {
    try {
      const response = await login(form)
      saveUserInfoOnStorage(response)
      router.push(PAGES.HOME)
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'Default Message Here'
      toast(message)
    }
  }

  return (
    <div className={style['container-login']}>
      <div className={style['container-form']}>
        <span className={style['title']}>Task Time</span>
        <Input
          onChange={handleInputOnChange}
          value={form.email}
          name='email'
          id='email'
          label='Email'
        />
        <Input
          onChange={handleInputOnChange}
          value={form.password}
          name='password'
          id='password'
          label='Senha'
        />
        <Button
          disabled={getIsLoginButtonDisabled()}
          className={style['button']}
          onClick={handleSubmitClick}
          label='Login'
        />
      </div>
    </div>
  )
}
