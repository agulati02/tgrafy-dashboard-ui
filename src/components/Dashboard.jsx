import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import User from './User.jsx'
import Installations from './Installations.jsx'
import Cookies from "js-cookie"
import '../styles/Dashboard.css'

function Dashboard() {
    const [profile, setProfile] = useState(null)
    const [installations, setInstallations] = useState(null)
    const [searchParams] = useSearchParams()

    const user_id = searchParams.get('login')

    useEffect(() => {
        let cancelled = false

        async function fetchData() {
            try {
                // Run both API calls concurrently
                const [profileRes, installationsRes] = await Promise.all([
                    fetch(`https://api-tgrafy.agulati.cc/api/v1/users/profile?user_id=${user_id}`, { 
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Accept': 'application/json' }
                    }),
                    fetch(`https://api-tgrafy.agulati.cc/api/v1/users/installations?user_id=${user_id}`, { 
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Accept': 'application/json' }
                    })
                ])

                if (!profileRes.ok) throw new Error(`Profile request failed: ${profileRes.status}`)
                if (!installationsRes.ok) throw new Error(`Installations request failed: ${installationsRes.status}`)

                const profileData = await profileRes.json()
                const installationsData = await installationsRes.json()

                if (!cancelled) {
                    setProfile(profileData)
                    setInstallations(installationsData)
                }
            } catch (err) {
                if (!cancelled) setError(err.message || 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        if (user_id) fetchData()
        return () => { cancelled = true }
    }, [user_id])

    return (
        <>
            {
                profile && 
                <div className="flex h-screen bg-gray-800">
                    <User user={profile} installations={{repositories: installations.installations}} />
                    <Installations installations={{repositories: installations.installations}} />
                </div>
            }
        </>
    )
}

export default Dashboard