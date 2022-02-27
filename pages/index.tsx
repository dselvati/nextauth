import { GetServerSideProps } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {

    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}


export const getServerSideProps = withSSRGuest(async (context) => {
  // const cookies = parseCookies(context) // Cookies fica no context, se for cookies HTTPOnly não funciona no Server Side

  // if (cookies['nextauth.token']) {
  //   return {
  //     redirect: {
  //       destination: '/dashboard',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {

    }
  }
})
