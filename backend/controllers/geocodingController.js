// controllers/geocodingController.js

const searchLocations = async (req, res) => {
    const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

    try {
        const { query, limit = 1 } = req.query;
        
        if (!query || query.trim().length < 2) {
            return res.json({ features: [] });
        }

        const encodedQuery = encodeURIComponent(query);
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedQuery}&apiKey=${GEOAPIFY_KEY}&limit=${limit}`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Geocoding error:', error);
        res.status(500).json({ 
            error: 'Failed to search locations',
            message: error.message 
        });
    }
};

module.exports = {
    searchLocations
};