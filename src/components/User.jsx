import { Github, Activity, GitBranch } from 'lucide-react'

function User({ user, installations }) {
    return (
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
                <Github className="w-8 h-8 text-gray-900" />
                <h1 className="text-xl font-bold text-gray-900">TGRAFY Dashboard</h1>
            </div>

            <div className="space-y-6">
                {/* User avatar, name, handler & bio */}
                <div className="text-center">
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-100"
                    />
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600 mb-2">@{user.login}</p>
                    <p className="text-sm text-gray-500 italic">{user.bio}</p>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-200">
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{user.followers}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                    </div>
                        <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{user.following}</div>
                        <div className="text-xs text-gray-500">Following</div>
                    </div>
                        <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{user.public_repos}</div>
                        <div className="text-xs text-gray-500">Repos</div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="w-4 h-4" />
                        <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <GitBranch className="w-4 h-4" />
                        <span>{installations?.repositories.length} Active Installations</span>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm">Activity Summary</h3>
                    <div className="text-xs text-gray-600 space-y-1">
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