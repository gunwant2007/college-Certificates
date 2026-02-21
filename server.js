const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let incidents = [];

const dangerZones = [
    { lat: 18.5204, lng: 73.8567, level: "High" },
    { lat: 18.5310, lng: 73.8440, level: "Medium" }
];

// Store Incident
app.post("/api/incident", (req, res) => {
    const incident = {
        id: "INC-" + Date.now(),
        timestamp: new Date(),
        ...req.body
    };

    incidents.push(incident);
    res.json({ message: "Incident stored", incident });
});

// Get Danger Zones
app.get("/api/dangerzones", (req, res) => {
    res.json(dangerZones);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// API: Emergency Alert
app.post("/api/emergency", (req, res) => {
    const alertData = {
        id: "ALERT-" + Date.now(),
        ...req.body,
        timestamp: new Date()
    };

    console.log("🚨 Emergency Alert Sent:", alertData);

    res.json({
        message: "Emergency alert sent to Police & Family (simulated).",
        alert: alertData
    });
});
function sendEmergencyAlert(){

    const locationText = document.getElementById("location").innerText;

    if(locationText === "Not detected"){
        alert("Location not available. Start live tracking first.");
        return;
    }

    fetch("/api/emergency", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            location: locationText,
            message: "User triggered emergency alert"
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Emergency alert sent successfully!");
        log("Emergency alert sent to Police & Family.");
        console.log(data);
    });
}