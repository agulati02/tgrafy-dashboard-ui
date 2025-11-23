import { Plus, Search, Clock, Star, Trash2, Github } from "lucide-react"
import { useState } from "react"

function Installations({ installations }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredRepos = installations.repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Installations</h1>
                            <p className="text-gray-600">Manage repositories where your app is installed</p>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            <Plus className="w-5 h-5" />
                            Add Repository
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search repositories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Repository Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Repository</th>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Activity</th>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Stars</th>
                        <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredRepos.map((repo) => (
                        <tr key={repo.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                            <div>
                                <div className="font-medium text-gray-900">{repo.name}</div>
                                <div className="text-sm text-gray-500">{repo.owner}/{repo.name}</div>
                            </div>
                            </td>
                            <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(repo.status)}`}></div>
                                <span className="text-sm capitalize text-gray-700">{repo.status}</span>
                            </div>
                            </td>
                            <td className="py-4 px-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                {repo.lastActivity}
                            </div>
                            </td>
                            <td className="py-4 px-6">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {repo.stars}
                            </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                            <button
                                onClick={() => handleUninstall(repo.id)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Uninstall
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    
                    {filteredRepos.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Github className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No repositories found</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Installations