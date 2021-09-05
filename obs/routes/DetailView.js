//Dependencies
const db = require("../db/database/db.js")
const express = require('express');
const router = express();
const { convert } = require('html-to-text');
const fs = require('fs');
//const remark = require('remark');//import {remark} from 'remark'
//const stripMarkdown = require('strip-markdown');//import strip from 'strip-markdown'


//convert html to plain Text
const htmltoText = (html) => {
  let text = html;
  text = text.replace(/\n/gi, "");
  text = text.replace(/<style([\s\S]*?)<\/style>/gi, "");
  text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
  text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
  text = text.replace(/<\/div>/gi, "\n\n");
  text = text.replace(/<\/li>/gi, "\n");
  text = text.replace(/<li.*?>/gi, "  *  ");
  text = text.replace(/<\/ul>/gi, "\n\n");
  text = text.replace(/<\/p>/gi, "\n\n");
  text = text.replace(/<br\s*[\/]?>/gi, "\n");
  text = text.replace(/<[^>]+>/gi, "");
  text = text.replace(/^\s*/gim, "");
  text = text.replace(/ ,/gi, ",");
  text = text.replace(/ +/gi, " ");
  text = text.replace(/\n+/gi, "\n\n");
  return text;
};
// convert markdown formatted text to html
function parseMarkdown(markdownText) {
	const htmlText = markdownText
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.*)\*/gim, '<i>$1</i>')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		.replace(/\n$/gim, '<br />')

	return htmlText.trim()
}

// the router to fetch detailed information about an athlete

router.get("/view/:photo_id/:year", (req, res, next) => {
    const sql = `
    SELECT  Athlete.name, Athlete.surname, Athlete.date_of_birth, Athlete.weight, Athlete.height, Athlete.bio,
     Athlete.athlete_id, Athleteresult.gold, AthleteResult.silver, AthleteResult.bronze, AthletePhoto.photo_id
    FROM Athlete
    JOIN AthletePhoto ON AthletePhoto.photo_id = Athlete.photo_id
    JOIN AthleteResult ON AthleteResult.athlete_id = Athlete.athlete_id
    JOIN Game ON Game.game_id = AthleteResult.game_id
    WHERE Athlete.athlete_id = ${req.params.photo_id} AND Game.year = ${req.params.year}

    `

   db.all( sql, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows,
      "markdown": htmltoText(parseMarkdown(rows[0].bio))
    });
    console.log(rows[0].bio);
  });
 
  });
  
module.exports = router;