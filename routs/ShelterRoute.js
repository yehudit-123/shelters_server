const express = require("express");
const router = express.Router();

const shelterService = require("../services/ShelterServices");
const geocodingService =require("../services/GeocodingService");

router.get("/", async (req, res) => {
    const shelters = await shelterService.getAllShelters();
    res.json(shelters);
});
router.post("/", async (req, res) => {

    try {

        const {
            shelterName,
            address,
            type,
            createdByUserId
        } = req.body;

        const coords =
            await geocodingService.getCoordinates(address);

        if (!coords) {
            return res.status(400).json({
                success: false,
                message: "Address not found"
            });
        }

        await shelterService.addShelter({
            shelterName,
            address,
            latitude: coords.latitude,
            longitude: coords.longitude,
            type,
            createdByUserId,
            status: "pending"
        });

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });
    }
});
module.exports = router;