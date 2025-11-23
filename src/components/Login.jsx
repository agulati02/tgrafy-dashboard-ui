import { FaGithub } from 'react-icons/fa'

function Login() {
  const handleGitHubLogin = () => {
    window.location.href = `https://api-tgrafy.agulati.cc/api/v1/auth/oauth/github`
  }

  return (
    <>
        <div className="main-pg-cntr">
            <button onClick={handleGitHubLogin}>
                <FaGithub style={{ marginRight: '8px' }} />
                Sign in with GitHub
            </button>
        </div>
    </>
  )
}

export default Login