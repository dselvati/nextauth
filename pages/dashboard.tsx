import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  // const userCanSeeMetrics = useCan({
  //   permissions: ['metrics.list']
  //   // roles: ['administrator', 'editor']
  // })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (

    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

/**
 * Usuário autenticado é redirecionado para o login, sem apresentar o front,
 * Caso a verificação seja feita no front, pode carregar algumas informações até a verificação
 * e caso o usuário desabilite o JavaScript do navegador, algumas informações da página pode aparecer
 */

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)
  const response = await apiClient.get('/me')

  //console.log(response.data)

  return {
    props: {}
  }
})