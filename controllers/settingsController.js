const { Setting } = require('../models');

const getSettings = async (req, res) => {
    try {
        const organizationId = req.user.organizationId;
        const setting = await Setting.findOne({ where: { organizationId } });

        if (!setting) {
            return res.status(404).json({ error: 'Settings not found' });
        }

        res.json({
            defaultLowStockThreshold: setting.defaultLowStockThreshold
        });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSettings = async (req, res) => {
    try {
        const { defaultLowStockThreshold } = req.body;
        const organizationId = req.user.organizationId;

        const setting = await Setting.findOne({ where: { organizationId } });

        if (!setting) {
            return res.status(404).json({ error: 'Settings not found' });
        }

        setting.defaultLowStockThreshold = defaultLowStockThreshold;
        await setting.save();

        res.json(setting);
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getSettings,
    updateSettings,
};
