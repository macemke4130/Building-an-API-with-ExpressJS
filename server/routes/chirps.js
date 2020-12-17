const express = require('express');
const cs = require('../chirpstore');

const router = express.Router();

// LH/api/chirps/15 --
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = cs.GetChirp(id);
    res.json(chirp);

});

// LH/api/chirps/ --
router.get('/', (req, res) => {
    const chirps = cs.GetChirps();
    res.json(chirps);
});

// LH/api/chirps/ --
router.post('/', (req, res) => {
    const newChirp = req.body;
    cs.CreateChirp(newChirp);
    res.json({ msg: "Add New Chirp", details: newChirp });
});

// LH/api/chirps/ --
router.put('/:id', (req, res) => {
    let id = req.params.id;
    const updatedChirp = req.body;
    cs.UpdateChirp(id, updatedChirp);
    res.json({ msg: "Editing Chirp: " + id, details: updatedChirp });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    cs.DeleteChirp(id);
    res.json("Deleteting Chirp with ID: " + id);
});

module.exports = router;