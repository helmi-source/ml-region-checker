const express = require('express');
const { checkRegion } = require('cekregml');
const app = express();
const port = process.env.PORT || 3000;  // PENTING: Render pake PORT dari environment

// === PENTING: BIARIN RENDER BISA SERVE FILE HTML ===
app.use(express.static(__dirname));
// ==================================================

app.get('/cek-region', async (req, res) => {
    const playerId = req.query.id;
    const serverId = req.query.server;

    if (!playerId || !serverId) {
        return res.status(400).json({
            success: false,
            message: 'Enter your ID and Server!'
        });
    }

    try {
        const data = await checkRegion(playerId, serverId);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`[BACKEND] Online on port ${port}`);

});
