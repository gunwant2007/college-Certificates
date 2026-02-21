const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Dynamic danger zones (heatmap points)
let dangerZones = [
    { lat: 18.5204, lng: 73.8567, intensity: 0.9 },
    { lat: 18.5310, lng: 73.8440, intensity: 0.7 },
    { lat: 18.5150, lng: 73.8700, intensity: 0.6 }
];

// Store visited zones
let visitedZones = [];

// API: Get danger zones
app.get("/api/dangerzones", (req, res) => {
    res.json(dangerZones);
});

// API: Store visited zone
app.post("/api/visited", (req, res) => {
    visitedZones.push({
        ...req.body,
        timestamp: new Date()
    });
    res.json({ message: "Visited zone stored" });
});

// API: View visited zones
app.get("/api/visited", (req, res) => {
    res.json(visitedZones);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});