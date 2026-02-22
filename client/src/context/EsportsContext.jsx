import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '@/utils/api'; // Ensure this utility exists and is correct
import { useAuth } from '@/hooks/useAuth';
import { useSocket } from '@/hooks/useSocket';

const EsportsContext = createContext();

export const useEsports = () => useContext(EsportsContext);

export const EsportsProvider = ({ children }) => {
    const { user } = useAuth();
    const { socket } = useSocket();

    // State management
    const [gamers, setGamers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [topGamers, setTopGamers] = useState([]);
    const [currentGamer, setCurrentGamer] = useState(null);
    const [gamerAchievements, setGamerAchievements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        hasNext: false,
        hasPrev: false,
        limit: 12
    });
    const [filters, setFilters] = useState({
        search: '',
        game: 'all',
        rank: 'all',
        location: '',
        sortBy: 'joinedDate:desc'
    });

    // Socket event handlers
    useEffect(() => {
        if (!socket) return;

        const handleGamerUpdate = (data) => {
            setGamers(prev => prev.map(gamer =>
                gamer._id === data._id ? data : gamer
            ));
            if (currentGamer?._id === data._id) {
                setCurrentGamer(data);
            }
        };

        const handleNewAchievement = (data) => {
            if (data.userId === user?.id) {
                toast.success(`New achievement unlocked: ${data.title}!`);
            }

            if (currentGamer?._id === data.userId) {
                setGamerAchievements(prev => [data, ...prev]);
            }
        };

        const handleFollowUpdate = (data) => {
            setGamers(prev => prev.map(gamer =>
                gamer._id === data.userId ? {
                    ...gamer,
                    followersCount: data.followersCount, // Ensure backend sends this
                    isFollowing: data.isFollowing
                } : gamer
            ));
        };

        // Socket listeners - Ensure these match backend events
        socket.on('gamerUpdated', handleGamerUpdate);
        socket.on('newEsportsAchievement', handleNewAchievement);
        socket.on('esportsFollowUpdate', handleFollowUpdate);

        return () => {
            socket.off('gamerUpdated');
            socket.off('newEsportsAchievement');
            socket.off('esportsFollowUpdate');
        };
    }, [socket, currentGamer, user]);

    // Get all gamers with filters and pagination
    const getAllGamers = async (newFilters = null, newPage = 1) => {
        setLoading(true);
        setError(null);

        try {
            const currentFilters = newFilters || filters;
            if (newFilters) {
                setFilters(newFilters);
            }

            const queryParams = new URLSearchParams();
            Object.entries(currentFilters).forEach(([key, value]) => {
                if (value && value !== 'all' && value !== '') {
                    queryParams.append(key, value);
                }
            });

            queryParams.append('page', newPage);
            queryParams.append('limit', pagination.limit);

            // Endpoint: /esports/gamers (Mirrored from /athletes)
            // Ensure backend route exists!
            const response = await api.get(`/esports/gamers?${queryParams}`);

            if (response.data.success) {
                if (newPage === 1) {
                    setGamers(response.data.data);
                } else {
                    setGamers(prev => [...prev, ...response.data.data]);
                }
                setPagination(response.data.pagination);
                return response.data.data;
            }
        } catch (error) {
            //   const message = error.response?.data?.message || 'Failed to fetch gamers';
            //   setError(message);
            //   toast.error(message);
            // For MVP/Mocking, if API fails, we can set mock data or just empty
            console.warn("API Call Failed, using empty list or handling gracefully", error);
            setGamers([]); // Fallback
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Get single gamer by ID
    const getGamerById = async (gamerId) => {
        setLoading(true);

        try {
            const response = await api.get(`/esports/gamers/${gamerId}`);

            if (response.data.success) {
                setCurrentGamer(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch gamer';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Toggle follow gamer
    const toggleFollowGamer = async (gamerId) => {
        const previousGamers = [...gamers];
        const previousCurrentGamer = currentGamer ? { ...currentGamer } : null;

        // Find the gamer and current follow status
        const gamer = gamers.find(g => g._id === gamerId);
        const isCurrentlyFollowing = gamer?.followers?.includes(user?.id);

        // Apply optimistic update
        setGamers(prev => prev.map(g => {
            if (g._id === gamerId) {
                let newFollowers = [...(g.followers || [])];
                if (isCurrentlyFollowing) {
                    newFollowers = newFollowers.filter(id => id !== user.id);
                } else {
                    if (user?.id) newFollowers.push(user.id);
                }
                return {
                    ...g,
                    followers: newFollowers,
                    followersCount: newFollowers.length,
                    isFollowing: !isCurrentlyFollowing
                };
            }
            return g;
        }));

        try {
            // Endpoint: /esports/gamers/:id/follow
            const response = await api.post(`/esports/gamers/${gamerId}/follow`);

            if (response.data.success) {
                const { isFollowing, followersCount } = response.data.data;
                toast.success(isFollowing ? 'Gamer followed!' : 'Gamer unfollowed!');
                return { success: true, isFollowing, followersCount };
            }
        } catch (error) {
            // Revert on error
            setGamers(previousGamers);
            if (previousCurrentGamer) setCurrentGamer(previousCurrentGamer);

            const message = error.response?.data?.message || 'Failed to update follow status';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Get current user's esports profile
    const getEsportsProfile = async () => {
        setLoading(true);
        try {
            const response = await api.get('/esports/profile/me');
            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            // Don't toast error here as 404 is expected for new users
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Create esports profile
    const createEsportsProfile = async (profileData) => {
        setLoading(true);
        try {
            const response = await api.post('/esports/profile', profileData);
            if (response.data.success) {
                toast.success('Esports Profile Created!');
                return response.data.data;
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create profile';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Get all tournaments
    const getAllTournaments = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tournaments');
            if (response.data.success) {
                setTournaments(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching tournaments:", error);
            // toast.error("Failed to load tournaments");
            return [];
        } finally {
            setLoading(false);
        }
    };

    const value = {
        // State
        gamers,
        topGamers,
        currentGamer,
        gamerAchievements,
        loading,
        error,
        pagination,
        filters,
        setFilters,

        // Actions
        getAllGamers,
        toggleFollowGamer,
        getEsportsProfile,
        createEsportsProfile,
        // Tournaments
        tournaments,
        getAllTournaments,
    };

    return (
        <EsportsContext.Provider value={value}>
            {children}
        </EsportsContext.Provider>
    );
};

export default EsportsContext;
