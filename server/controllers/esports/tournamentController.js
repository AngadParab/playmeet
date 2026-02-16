export const getTournaments = async (req, res) => {
    try {
        res.status(200).json({ message: "Tournaments functionality coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTournament = async (req, res) => {
    try {
        res.status(201).json({ message: "Tournament creation coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
