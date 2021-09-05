const db = require("../db/database/db.js")
const express = require('express');
const router = express();

router.get("/allAthletes", (req, res, next) => {
    const sql = `
    SELECT Game.city, Game.year, AthletePhoto.photo, Athlete.name, Athlete.surname, AthletePhoto.photo_id
    FROM Athlete
    JOIN Game ON Game.game_id = AthleteResult.game_id
    JOIN AthletePhoto ON AthletePhoto.photo_id = Athlete.photo_id
    JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id
    GROUP BY Game.year
    ORDER BY Game.year DESC


    `

    //var params = []
    db.all(sql, (err, rows) => {
     
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
            
        })
        
      });
      
  });
  
module.exports = router;