export const getEsportsProfile = async (req, res) => {
    try {
        res.status(200).json({ message: "Esports profile functionality coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEsportsProfile = async (req, res) => {
    try {
        res.status(201).json({ message: "Esports profile creation coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
