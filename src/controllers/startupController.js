const Startup = require("../models/Startup");

// Create Startup
const createStartup = async (req, res) => {
    try {
        const startup = await Startup.create({
            startupName: req.body.startupName,
            idea: req.body.idea,
            requiredSkills: req.body.requiredSkills || [],
            founder: req.user._id,
        });

        res.status(201).json({
            success: true,
            startup,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Startups
const getStartups = async (req, res) => {
    try {
        const startups = await Startup.find()
            .populate("founder", "name email");

        res.status(200).json({
            success: true,
            startups,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Startup By ID
const getStartupById = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id)
            .populate("founder", "name email")
            .populate("members", "name email");

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found",
            });
        }

        res.json({
            success: true,
            startup,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Startup
const updateStartup = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);

        if (!startup) {
            return res.status(404).json({
                message: "Startup not found",
            });
        }

        if (startup.founder.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Only founder can update startup",
            });
        }

        startup.startupName =
            req.body.startupName || startup.startupName;

        startup.idea =
            req.body.idea || startup.idea;

        startup.requiredSkills =
            req.body.requiredSkills || startup.requiredSkills;

        startup.stage =
            req.body.stage || startup.stage;

        await startup.save();

        res.json(startup);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Startup
const deleteStartup = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);

        if (!startup) {
            return res.status(404).json({
                message: "Startup not found",
            });
        }

        if (startup.founder.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Only founder can delete startup",
            });
        }

        await startup.deleteOne();

        res.json({
            success: true,
            message: "Startup deleted",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createStartup,
    getStartups,
    getStartupById,
    updateStartup,
    deleteStartup,
};