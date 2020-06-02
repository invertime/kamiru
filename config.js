class config_key {
  DISCORD_KEY = 'YOUR_API_KEY'; // Your Discord bot API Key
  COMMAND_PREFIX = '!kami'; // Command prefix
  WELCOME_MSG = "Kamiru bot is now operational !"; // Console log
  ERROR_TITLE_AUDIO = "une erreur s'est produite lors de la récupération du titre de la vidéo, désolé !"; // Output: @Username, `ERROR_TITLE_AUDIO` 
  ERROR_CONVERT_AUDIO = "une erreur s'est produite lors de la conversion de la vidéo, désolé !"; // Output: @Username, `ERROR_CONVERT_AUDIO` 
  AUDIO_DIRECTORY = './Download'; // Don't write ./Download/ <- this '/' because it's hardcoded in "index.js".
  DISCORD_MSG_CONVERTING = "est en cours de conversion ! Merci de bien vouloir patienter, merci..."; // Output: @Username, ${video_title} `DISCORD_MSG_CONVERTING`
  DISCORD_MSG_CONVERT_FILESIZE_OVER_8MB = "la taille de votre fichier MP3 est supérieure à 8MO, désolé !"; // Output: @Username, `DISCORD_MSG_CONVERT_FILESIZE_OVER_8MB`
  DISCORD_MSG_CONVERT_FINISHED = "voici votre fichier !"; // Output: @Username, `DISCORD_MSG_CONVERT_FINISHED` (with file attachement)
}

module.exports = config_key