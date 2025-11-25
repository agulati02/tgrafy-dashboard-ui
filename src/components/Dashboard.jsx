import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import User from './User.jsx'
import Installations from './Installations.jsx'
import '../styles/Dashboard.css'

function Dashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()

    const user_id = searchParams.get('login')

    useEffect(() => {
        let cancelled = false

        async function fetchData() {
            try {
                const res = await fetch(`https://api-tgrafy.agulati.cc/api/v1/users/profile?user_id=${user_id}`, { 
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    }
                })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                if (!cancelled) setData(json)
            } catch (err) {
                if (!cancelled) setError(err.message || 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchData()
        return () => { cancelled = true }
    }, [])

    return (
        <>
            {/* <h1>Dashboard</h1> */}
            {/* {loading && <p>Loading...</p>} */}
            {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
            {
                data && 
                <div>
                    {/* <img src={data.avatar_url} alt="User Avatar" className='avatar' />
                    <h3>@{data.login}</h3> */}
                    {/* <p>{JSON.stringify(data, null, 2)}</p> */}
                    <User user={data} installations={{repositories: []}} />
                    <Installations installations={{repositories: []}} />
                </div>
            }
        </>
    )
}

export default Dashboard