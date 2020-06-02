// Chargement des "depedencies".
const { Client, Attachment } = require('discord.js');
const client = new Client();
const fs = require('fs');
const readline = require('readline');
const { exec } = require("child_process");

// Exportation du fichier "config.js"
const config_key = require('./config.js'); 
let config_env = new config_key()
let err_ttl_audio = config_env.ERROR_TITLE_AUDIO;
let err_cvrt_audio = config_env.ERROR_CONVERT_AUDIO;
let convert_finish = config_env.DISCORD_MSG_CONVERT_FINISHED;
let convert_size_over_8mb = config_env.DISCORD_MSG_CONVERT_FILESIZE_OVER_8MB;
let audio_directory = config_env.AUDIO_DIRECTORY;
let discord_msg_cvrtng = config_env.DISCORD_MSG_CONVERTING;
var discord_key = config_env.DISCORD_KEY;
var command_prefix = config_env.COMMAND_PREFIX;
var welcome_msg = config_env.WELCOME_MSG;
const prefix = command_prefix;

// Envoyer le WELCOME_MSG (= config.js) lorsque le bot est opérationel.
client.on('ready', () => {
  console.log(welcome_msg);
});

// Lorsqu'un message est uploadé, ...
client.on("message", (message) => {

  // Si un message contient le prefix `COMMAND_PREFIX` (= config.js)
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
 
  // Separation des arguments du message.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Si la commande 'convert' est exécuté, ...
  if(command === 'convert') {
    let url = args[0];

    // Récupération du titre de la vidéo :
    exec(`youtube-dl --encoding utf-8 --get-title "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`${error.message}`);
        message.reply(`${err_ttl_audio}`);
        return;
      }
      if (stderr) {
        console.log(`${stderr}`);
        message.reply(`${err_ttl_audio}`);
        return;
      }

      // Titre final de la vidéo.
      let video_title = `${stdout}`.replace(/\r?\n|\r/, "");

      // Conversion/Téléchargement de la vidéo :
      message.reply(`${video_title} ${discord_msg_cvrtng}`);
      exec(`youtube-dl -f bestaudio --extract-audio --audio-format mp3 "${url}" -o "${audio_directory}/%(title)s.%(ext)s"`, (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            message.reply(`${err_cvrt_audio}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            message.reply(`${err_cvrt_audio}`);
            return;
        }

        // Vérification de la taille du fichier '.mp3'.
        function getFilesizeInBytes(filename) {
          const stats = fs.statSync(filename);
          const fileSizeInBytes = stats.size;
          return fileSizeInBytes;
        }

        // Si taille > à 8MO :
        if(getFilesizeInBytes(`${audio_directory}/${video_title}.mp3`) >= 7340032){
          message.reply(`${convert_size_over_8mb}`);
        }

        // Si taille < à 8MO :
        else{
          const attachment = new Attachment(`${audio_directory}/${video_title}.mp3`);
          message.reply(`${convert_finish}`, attachment);
        }

      }); 
    });
  }

});

// Connection au bot discord.
client.login(discord_key);


