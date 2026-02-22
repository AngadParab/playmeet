import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useEsports } from "@/context/EsportsContext"
import { format, formatDistanceToNow } from "date-fns"
import {
    Trophy, Activity, Clock, Plus, Bell,
    BarChart3, CalendarDays, User, Settings, UserPlus, Gamepad2, ShieldAlert
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const EsportsDashboard = () => {
    const { user, getCurrentUser } = useAuth()
    const { tournaments, getAllTournaments, loading: tournamentsLoading } = useEsports()
    const navigate = useNavigate()

    const [myTournaments, setMyTournaments] = useState({
        upcoming: [],
        ongoing: [],
        completed: [],
        hosted: []
    })
    const [dashboardStats, setDashboardStats] = useState(null)
    const [loadingData, setLoadingData] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")
    const [timeOfDay, setTimeOfDay] = useState("")
    const [recentActivity, setRecentActivity] = useState([])

    // Enhanced greeting system
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 6) setTimeOfDay("night")
        else if (hour < 12) setTimeOfDay("morning")
        else if (hour < 17) setTimeOfDay("afternoon")
        else if (hour < 21) setTimeOfDay("evening")
        else setTimeOfDay("night")
    }, [])

    useEffect(() => {
        getAllTournaments();
    }, [])

    // Process tournaments specifically for the user
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user || tournamentsLoading) return

            setLoadingData(true)
            try {
                const now = new Date()

                // Filter participating tournaments
                const participating = tournaments.filter(t => {
                    return t.participants?.some(p => {
                        const currentUserId = user?._id?.toString() || user?.id?.toString()

                        if (!currentUserId) return false

                        // Check main participant
                        const participantId = typeof p.user === 'object' ? p.user?._id || p.user?.id : p.user
                        if (participantId?.toString() === currentUserId) return true

                        // Check team members
                        const isTeamMember = p.teamMembers?.some(member => {
                            const memberId = typeof member.user === 'object' ? member.user?._id || member.user?.id : member.user
                            return memberId?.toString() === currentUserId
                        })

                        return isTeamMember
                    })
                })

                const upcoming = participating.filter(t => new Date(t.startDate) > now && t.status !== "Completed" && t.status !== "Ongoing")
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

                const ongoing = participating.filter(t => t.status === "Ongoing")

                const completed = participating.filter(t => t.status === "Completed")

                // Filter hosted tournaments
                const hosted = tournaments.filter(t => {
                    const currentUserId = user?._id?.toString() || user?.id?.toString()
                    const creatorId = typeof t.createdBy === 'object' ? t.createdBy?._id || t.createdBy?.id : t.createdBy
                    return creatorId?.toString() === currentUserId
                })

                setMyTournaments({
                    upcoming,
                    ongoing,
                    completed,
                    hosted
                })
            } catch (error) {
                console.error("Error fetching esports dashboard data:", error)
            } finally {
                setLoadingData(false)
            }
        }

        if (!tournamentsLoading) {
            fetchDashboardData()
        }
    }, [user, tournaments, tournamentsLoading])

    // Process real user stats
    useEffect(() => {
        if (user) {
            const stats = {
                totalTournaments: (myTournaments.upcoming.length + myTournaments.ongoing.length + myTournaments.completed.length) || 0,
                achievements: user.stats?.achievementsCount || user.achievements?.length || 0,
                totalPoints: user.stats?.totalPoints || 0,
                currentRank: user.stats?.currentRank || 0,
                followers: user.followers?.length || 0,
            }
            setDashboardStats(stats)

            // Process recent activity - ideally this would be esports specific
            if (user.activityLog) {
                setRecentActivity(user.activityLog.slice(0, 6))
            }
        }
    }, [user, myTournaments])

    const getGreeting = () => {
        const greetings = {
            night: user?.name ? `Grind time, ${user.name.split(" ")[0]}` : "Grind time",
            morning: user?.name ? `Morning, ${user.name.split(" ")[0]}` : "Good morning",
            afternoon: user?.name ? `Ready to jump in, ${user.name.split(" ")[0]}?` : "Good afternoon",
            evening: user?.name ? `Evening, ${user.name.split(" ")[0]}` : "Good evening"
        }
        return greetings[timeOfDay] || "Welcome back"
    }

    const getUserLevel = (points) => {
        if (points >= 5000) return { level: "Grandmaster", color: "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]", icon: Trophy }
        if (points >= 2000) return { level: "Master", color: "bg-cyan-600/90 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]", icon: Trophy }
        if (points >= 1000) return { level: "Diamond", color: "bg-purple-500/80 text-white", icon: Trophy }
        if (points >= 500) return { level: "Platinum", color: "bg-purple-900/50 text-purple-300 border border-purple-500/50", icon: Trophy }
        return { level: "Unranked", color: "bg-black/50 text-gray-400 border border-gray-800", icon: ShieldAlert }
    }

    const nextTournament = [...myTournaments.ongoing, ...myTournaments.upcoming][0]

    if (loadingData || tournamentsLoading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 font-sans tracking-wide">Loading Esports Profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30 pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-purple-500/50 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                            <AvatarImage src={user?.avatar?.url} className="rounded-lg object-cover" />
                            <AvatarFallback className="text-3xl bg-black text-purple-400 rounded-lg">
                                {user?.username?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight font-heading">
                                {getGreeting()}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-gray-400 font-mono text-sm">
                                    @{user?.username}
                                </p>
                                {dashboardStats && (
                                    <Badge variant="secondary" className={`text-xs font-normal border-0 ${getUserLevel(dashboardStats.totalPoints).color}`}>
                                        {getUserLevel(dashboardStats.totalPoints).level}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-gray-800 bg-black/40 hover:bg-gray-800 text-gray-300" asChild>
                            <Link to="/notifications" className="gap-2">
                                <Bell className="w-4 h-4" />
                                <span className="hidden sm:inline">Alerts</span>
                                {user?.notifications?.filter(n => !n.read).length > 0 && (
                                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px] bg-red-600 absolute -top-2 -right-2">
                                        {user.notifications.filter(n => !n.read).length}
                                    </Badge>
                                )}
                            </Link>
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold border-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]" asChild>
                            <Link to="/esports/tournaments/create" className="gap-2">
                                <Plus className="w-4 h-4" />
                                <span>Host Tournament</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {dashboardStats && [
                        { label: "Matches Played", value: dashboardStats.totalTournaments },
                        { label: "XP / MMR", value: dashboardStats.totalPoints },
                        { label: "Followers", value: dashboardStats.followers },
                        { label: "Trophies", value: dashboardStats.achievements }
                    ].map((stat) => (
                        <Card key={stat.label} className="border-white/10 bg-black/40 backdrop-blur-sm">
                            <CardContent className="p-6 flex flex-col items-center text-center sm:items-start sm:text-left">
                                <p className="text-2xl font-bold text-white tracking-tight font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-400 font-mono uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="bg-black/60 border border-white/10 p-1 rounded-xl">
                        <TabsTrigger value="overview" className="gap-2 text-gray-400 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
                            <BarChart3 className="w-4 h-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="matches" className="gap-2 text-gray-400 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
                            <Gamepad2 className="w-4 h-4" />
                            My Matches
                        </TabsTrigger>
                        <TabsTrigger value="activity" className="gap-2 text-gray-400 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
                            <Activity className="w-4 h-4" />
                            Activity Log
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Next Event */}
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <Card className="border-purple-500/30 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-colors">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <CalendarDays className="w-5 h-5 text-cyan-400" />
                                            Next Match
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {nextTournament ? (
                                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                                <div className="flex-1 space-y-4 w-full">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white font-heading truncate">
                                                            {nextTournament.name}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2 font-mono">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-xs uppercase px-2 py-0.5 bg-gray-800 rounded text-gray-300">{nextTournament.gameTitle}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-cyan-400">
                                                                <Clock className="w-4 h-4" />
                                                                {format(new Date(nextTournament.startDate), "MMM dd, HH:mm")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30 hover:bg-purple-600/30">
                                                            {nextTournament.status}
                                                        </Badge>
                                                        <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                                                            {nextTournament.maxPerTeam > 1 ? "Team" : "Solo"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-wide"
                                                    onClick={() => navigate(`/esports/tournaments/${nextTournament._id}/lobby`)}
                                                >
                                                    Enter Lobby
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                                                    <Gamepad2 className="w-6 h-6 text-gray-500" />
                                                </div>
                                                <h3 className="text-lg font-bold text-white font-heading">No active matches</h3>
                                                <p className="text-gray-400 text-sm mb-4">You haven't joined any competitive brackets yet.</p>
                                                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                                                    <Link to="/esports/tournaments">Browse Tournaments</Link>
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Hosted Tournaments */}
                                {myTournaments.hosted?.length > 0 && (
                                    <div className="mt-6">
                                        <Card className="border-cyan-500/30 bg-black/40 backdrop-blur-sm">
                                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                <div>
                                                    <CardTitle className="text-white font-heading">Hosted by Me</CardTitle>
                                                    <CardDescription className="text-gray-400 mt-1">Tournaments you manage</CardDescription>
                                                </div>
                                                <Settings className="w-5 h-5 text-cyan-400 opacity-50" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    {myTournaments.hosted.map(t => (
                                                        <div key={t._id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all cursor-pointer group" onClick={() => navigate(`/esports/tournaments/${t._id}/manage`)}>
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-md overflow-hidden bg-black/50 shrink-0 border border-white/10">
                                                                    <img src={t.images?.[0]?.url || `https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070&auto=format&fit=crop`} alt="Game" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-white text-sm truncate max-w-[150px] sm:max-w-[200px]">{t.name}</h4>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-black/50 border-cyan-500/30 text-cyan-400 rounded">{t.status}</Badge>
                                                                        <span className="text-xs text-gray-500 font-mono hidden sm:inline-block">• {t.participants?.length || 0} enrolled</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/40 border border-transparent group-hover:border-cyan-500/30">
                                                                Manage
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </div>
                            {/* Recent Achievements */}
                            <div>
                                <Card className="border-white/10 bg-black/40 backdrop-blur-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-base font-medium text-gray-300 uppercase tracking-wider font-mono">
                                            Recent Drops
                                        </CardTitle>
                                        <Trophy className="w-4 h-4 text-purple-400" />
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {user?.achievements?.length > 0 ? (
                                            <div className="space-y-4">
                                                {user.achievements.slice(0, 3).map((achievement, index) => (
                                                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                                        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                                                            <Trophy className="w-5 h-5 text-purple-400 drop-shadow-[0_0_5px_rgba(147,51,234,0.8)]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white font-heading">
                                                                {achievement.title}
                                                            </p>
                                                            <p className="text-xs text-gray-400 line-clamp-1">
                                                                {achievement.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button variant="ghost" className="w-full text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20" asChild>
                                                    <Link to="/profile">View Arsenal</Link>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-sm text-gray-500 font-mono">No achievements unlocked</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "Edit Gamer Tag", icon: User, href: "/profile" },
                                { title: "System Config", icon: Settings, href: "/settings" },
                                { title: "Find Squad", icon: UserPlus, href: "/esports/community" },
                                { title: "Browse Games", icon: Gamepad2, href: "/esports/games" }
                            ].map((action) => (
                                <Link key={action.title} to={action.href}>
                                    <Card className="hover:bg-white/10 transition-colors cursor-pointer border-white/5 bg-black/40 group">
                                        <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-cyan-600/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-400 transition-colors">
                                                <action.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-300 group-hover:text-white font-heading uppercase tracking-widest">{action.title}</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="matches" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-purple-900/20 border-purple-500/30">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-purple-400 mb-1 font-heading font-mono">
                                        {myTournaments.upcoming.length}
                                    </div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                                        Upcoming Brackets
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-cyan-900/20 border-cyan-500/30">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-cyan-400 mb-1 font-heading font-mono">
                                        {myTournaments.ongoing.length}
                                    </div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                                        Live Matches
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/10">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-gray-300 mb-1 font-heading font-mono">
                                        {myTournaments.completed.length}
                                    </div>
                                    <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                                        Past Glory
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-white/10 bg-black/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white font-heading">Active & Upcoming</CardTitle>
                                <CardDescription className="text-gray-400">Your registered competitive events</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {myTournaments.upcoming.length > 0 || myTournaments.ongoing.length > 0 ? (
                                    <div className="space-y-4">
                                        {[...myTournaments.ongoing, ...myTournaments.upcoming].map((tournament) => (
                                            <div
                                                key={tournament._id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all group"
                                            >
                                                <div className="flex items-center gap-4 w-full cursor-pointer" onClick={() => navigate(`/esports/tournaments/${tournament._id}/lobby`)}>
                                                    <div className="w-16 h-12 rounded-md overflow-hidden border border-white/10 shrink-0">
                                                        <img src={tournament.images?.[0]?.url || `https://source.unsplash.com/random/100x100?${tournament.gameTitle}`} alt="Game" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-white font-heading text-lg truncate">{tournament.name}</h4>
                                                        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mt-1">
                                                            <Badge className="bg-gray-800 hover:bg-gray-800 border-0">{tournament.gameTitle}</Badge>
                                                            <span className={tournament.status === 'Ongoing' ? 'text-green-400' : 'text-purple-400'}>
                                                                {format(new Date(tournament.startDate), "MMM dd, HH:mm")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="bg-purple-600 hover:bg-cyan-600 text-white font-bold ml-4 shrink-0 transition-colors"
                                                    onClick={() => navigate(`/esports/tournaments/${tournament._id}/lobby`)}
                                                >
                                                    Lobby
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 font-mono border border-dashed border-gray-800 rounded-lg">
                                        No active registrations found.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Past Tournaments */}
                        {myTournaments.completed.length > 0 && (
                            <Card className="border-white/10 bg-black/40 backdrop-blur-sm mt-6">
                                <CardHeader>
                                    <CardTitle className="text-white font-heading">Past Glory</CardTitle>
                                    <CardDescription className="text-gray-400">Your completed competitive events</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {myTournaments.completed.map((tournament) => (
                                            <div
                                                key={tournament._id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:border-gray-500/50 hover:bg-white/10 transition-all group opacity-75 hover:opacity-100"
                                            >
                                                <div className="flex items-center gap-4 w-full cursor-pointer" onClick={() => navigate(`/esports/tournaments/${tournament._id}/lobby`)}>
                                                    <div className="w-16 h-12 rounded-md overflow-hidden border border-white/10 shrink-0">
                                                        <img src={tournament.images?.[0]?.url || `https://source.unsplash.com/random/100x100?${tournament.gameTitle}`} alt="Game" className="w-full h-full object-cover grayscale" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-gray-300 font-heading text-lg truncate">{tournament.name}</h4>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                                                            <Badge className="bg-gray-800 hover:bg-gray-800 border-0">{tournament.gameTitle}</Badge>
                                                            <span>
                                                                {format(new Date(tournament.startDate), "MMM dd, yyyy")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold ml-4 shrink-0 transition-colors"
                                                    onClick={() => navigate(`/esports/tournaments/${tournament._id}/lobby`)}
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                        <Card className="border-white/10 bg-black/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white font-heading">System Logs</CardTitle>
                                <CardDescription className="text-gray-400">Recent actions across the network</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentActivity.length > 0 ? (
                                    <div className="space-y-6">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-cyan-400">
                                                <div className="mt-1">
                                                    <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center">
                                                        <Activity className="w-4 h-4 text-cyan-400" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-white uppercase tracking-wider">
                                                        {activity.action.replace('_', ' ')}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 font-mono">
                                                        <span className="text-purple-400">[{activity.category}]</span>
                                                        {activity.points && (
                                                            <span className="text-green-400 font-bold">+{activity.points} XP</span>
                                                        )}
                                                        <span>// {formatDistanceToNow(new Date(activity.timestamp))} ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 font-mono border border-dashed border-gray-800 rounded-lg">
                                        Log registry empty.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}

export default EsportsDashboard
