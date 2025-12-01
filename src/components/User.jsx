import { Github, Activity, GitBranch } from 'lucide-react'

function User({ user, installations }) {
    return (
        <div className="w-80 min-h-screen bg-gray-800 border-r border-gray-500 p-6 overflow-y-auto flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
                <Github className="w-8 h-8 text-gray-100" />
                <h1 className="text-xl font-bold text-gray-100">TGRAFY Dashboard</h1>
            </div>

            <div className="space-y-6">
                {/* User avatar, name, handler & bio */}
                <div className="text-center">
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-500"
                    />
                    <h2 className="text-xl font-bold text-gray-50">{user.name}</h2>
                    <p className="text-gray-400 mb-2">@{user.login}</p>
                    <p className="text-sm text-gray-50 italic">{user.bio}</p>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-500">
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-50">{user.followers}</div>
                        <div className="text-xs text-gray-50">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-50">{user.following}</div>
                        <div className="text-xs text-gray-50">Following</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-50">{user.public_repos}</div>
                        <div className="text-xs text-gray-50">Repos</div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-50">
                        <Activity className="w-4 h-4" />
                        <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-50">
                        <GitBranch className="w-4 h-4" />
                        <span>{installations?.repositories.length} Active Installations</span>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-gray-50 text-sm">Activity Summary</h3>
                    <div className="text-xs text-gray-50 space-y-1">
                    <div className="flex justify-between">
                        <span>Active repositories:</span>
                        <span className="font-medium">{installations?.repositories.filter(r => r.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Needs attention:</span>
                        <span className="font-medium">{installations?.repositories.filter(r => r.status === 'warning').length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total stars:</span>
                        <span className="font-medium">{installations?.repositories.reduce((acc, r) => acc + r.stars, 0)}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User