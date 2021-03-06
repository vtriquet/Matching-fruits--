/**************************************************************************************************
Constructor of the Menu class
**************************************************************************************************/
var Menu = function Menu() {
  this.music = new Audio("resources/audio/menu.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();
  this.musicState = "on"; // Music activate
  this.soundState = "on"; // Sounds activate
  this.language = "fr"; // Language FR
}

/**************************************************************************************************
Prototype of the Menu class
**************************************************************************************************/
Menu.prototype = {
  // Initilializes the menu
  initialize: function initialize() {
    // Disable for the moment because it's annoying when we develop
    //fadeOut(eltLaunchScreen, 1000);
    //fadeIn(eltMenu, 1000);
    fadeIn(eltMenu, 1);
    
    // Set the menu properties
    eltBtnPlay.style.top = "34%";
    eltBtnScores.style.top = "39%";
    eltBtnAchievements.style.top = "44%";
    eltBtnOptions.style.top = "49%";
    eltBtnLevel.style.top = "55%";
    eltBtnTimeTrial.style.top = "60%";
    eltBtnLevelScores.style.top = "55%";
    eltBtnTimeTrialScores.style.top = "60%"; 
    eltBtnLevelAchievements.style.top = "55%";
    eltBtnTimeTrialAchievements.style.top = "60%";
    
    // Set event listener
    eltBtnPlay.addEventListener("click", oMenu.clickTabPlay, false);
    eltBtnScores.addEventListener("click", oMenu.clickTabScores, false);
    eltBtnAchievements.addEventListener("click", oMenu.clickTabAchievements, false);
    eltBtnOptions.addEventListener("click", oMenu.clickTabOptions, false);
    eltBtnLang.addEventListener("click", oMenu.setLanguage, false);
    eltBtnMusic.addEventListener("click", oMenu.switchMusicState, false);
    eltBtnSound.addEventListener("click", oMenu.switchSoundState, false);
    eltBtnLevel.addEventListener("click", oMenu.clickTabLevel, false);
    eltBtnTimeTrial.addEventListener("click", oMenu.clickTabTimeTrial, false);
    eltBtnTimeTrialScores.addEventListener("click", oMenu.clickTabTimeTrialScores, false);
    eltBtnLevelScores.addEventListener("click", oMenu.clickTabLevelScore, false);
    eltBtnLevelAchievements.addEventListener("click", oMenu.clickTabLevelAchievements, false);
    eltBtnTimeTrialAchievements.addEventListener("click", oMenu.clickTabTimeTrialAchievements, false);
    eltArrowPreviousScores.addEventListener("click", oMenu.previousScores, false);
    eltArrowPreviousLevelScores.addEventListener("click", oMenu.previousLevelScores, false);
    
    var listArrowPrevious = document.getElementsByClassName("arrow-previous");
    
    for (var i = 0; i < listArrowPrevious.length; i++) {
      listArrowPrevious[i].addEventListener("click", oMenu.previous, false);
    }
    
    var listArrowPreviousLevel = document.getElementsByClassName("arrow-previous-level");
    
    for (var i = 0; i < listArrowPreviousLevel.length; i++) {
      listArrowPreviousLevel[i].addEventListener("click", oMenu.previousLevel, false);
    }
  },
  // Previous function
  previous: function previous() {
    eltMenu.style.display = "block";
    eltGame.style.display = "none";
    eltAchievements.style.display = "none";
    eltOptions.style.display = "none";
    eltScores.style.display = "none";
    eltScoresList.style.display = "none";
    eltLevels.style.display = "none";
    eltScores.style.backgroundImage = "url(resources/backgrounds/scores.jpg)";
    eltBtnLevelScores.style.display = "block";
    eltBtnTimeTrialScores.style.display = "block";
  },
  // Get back to the page of levels choice
  previousLevel: function previousLevel() {
    eltLevels.style.display = "block";
    eltLevelGoal.style.display = "none";
    // Remove event listener in order to avoid bug if the user choose an another level
    eltLevelGoalBtnPlay.removeEventListener('click', evtLevelGoalBtnPlay, false);
  },
  previousScores: function previousScores() {
    eltArrowPreviousScores.style.display = "none";
    eltScoresList.style.display = "none";
    eltScores.style.display = "block";
    eltBtnLevelScores.style.display = "block";
    eltBtnTimeTrialScores.style.display = "block";
  },
  previousLevelScores: function previousLevelScores() {
    eltScores.style.display = "none";
    eltLevelScore.style.display = "none";
    eltLevels.style.display = "block";
  },
  // Changes the language of the application. FR and EN only available for the moment
  setLanguage: function setLanguage() {
    if (oMenu.language == "fr") {
      oMenu.language = "en";
      addSetting("language", "en");
    } else if (oMenu.language == "en") {
      oMenu.language = "fr";
      addSetting("language", "fr");
    }
    
    oMenu.updateUI();
  },
  // Switch music state => activate / desactivate music
  switchMusicState: function switchMusicState() {
    if (oMenu.musicState == "on") {
      oMenu.musicState = "off";
      addSetting("music", "off");
    } else if (oMenu.musicState == "off") {
      oMenu.musicState = "on";
      addSetting("music", "on");
    }
    
    oMenu.updateUI();
  },
  // Switch sound state => activate / desactivate sound
  switchSoundState: function switchSoundState() {
    if (oMenu.soundState == "on") {
      oMenu.soundState = "off";
      addSetting("sounds", "off");
    } else {
      oMenu.soundState = "on";
      addSetting("sounds", "on");
    }
    
    oMenu.updateUI();
  },
  // Update the UI
  updateUI: function updateUI() {
    if (oMenu.language == "fr") {
      document.webL10n.setLanguage("fr");
      eltBtnLang.src = "resources/images/buttons/btn-lang-fr.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-fr.jpg)";
      eltAchievements.style.backgroundImage = "url(resources/backgrounds/achievements-fr.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-fr.jpg)";
      eltLevels.style.backgroundImage = "url(resources/backgrounds/levels-fr.jpg)";
      eltLevelGoal.style.backgroundImage = "url(resources/backgrounds/level-goal-fr.jpg)";
      eltLevelScore.style.backgroundImage = "url(resources/backgrounds/level-score-fr.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-fr.jpg)";
      eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-fr.jpg)";
    } else if (oMenu.language == "en") {
      document.webL10n.setLanguage("en");
      eltBtnLang.src ="resources/images/buttons/btn-lang-en.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-en.jpg)";
      eltAchievements.style.backgroundImage = "url(resources/backgrounds/achievements-en.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-en.jpg)";
      eltLevels.style.backgroundImage = "url(resources/backgrounds/levels-en.jpg)";
      eltLevelGoal.style.backgroundImage = "url(resources/backgrounds/level-goal-en.jpg)";
      eltLevelScore.style.backgroundImage = "url(resources/backgrounds/level-score-en.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-en.jpg)";
      eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-en.jpg)";
    }

    if (oMenu.soundState == "on") {
      eltBtnSound.src = "resources/images/buttons/btn-sound-on.png";
    } else {
      eltBtnSound.src = "resources/images/buttons/btn-sound-off.png";
    }
    
    if (oMenu.musicState == "on") {
      eltBtnMusic.src = "resources/images/buttons/btn-music-on.png";
      oMenu.music.play();
    } else {
      eltBtnMusic.src = "resources/images/buttons/btn-music-off.png";
      oMenu.music.pause();
    }
  },
  // Handles click on the tab "Jouer" / "Play"
  clickTabPlay: function clickTabPlay() {
    //oGame.initialize();
    eltMenu.style.display = "none";
    eltGame.style.display = "block";
    selectAllLevels(eltLevels, "levels");
  },
  // Handles click on the tab "Niveaux" / "Levels"
  clickTabLevel: function clickTabLevel() {
    eltMenu.style.display = "none";
    eltGame.style.display = "none";
    eltLevels.style.display = "block";
  },
  // Handles click on the tab "Scores" => "Niveaux" / "Levels"
  clickTabLevelScore: function clickTabLevelScore() {
    eltScores.style.display = "none";
    eltLevels.style.display = "block";
  },
  // Handles click on the tab "Contre-la-montre" / "Time Trial"
  clickTabTimeTrial: function clickTabTimeTrial() {
    oGame.initialize();
    oGame.setTimeTrial();
  },
  // Handles click on the tab "Scores" => "Contre-la-montre" / "Time Trial"
  clickTabTimeTrialScores: function clickTabTimeTrialScores() {
    if (eltBtnLang.src.indexOf("btn-lang-fr") !== -1) {
      eltScores.style.backgroundImage = "url(resources/backgrounds/scores-time-trial-fr.jpg)";
    } else if (eltBtnLang.src.indexOf("btn-lang-en") !== -1) {
      eltScores.style.backgroundImage = "url(resources/backgrounds/scores-time-trial-en.jpg)";
    }
    eltBtnLevelScores.style.display = "none";
    eltBtnTimeTrialScores.style.display = "none";
    eltScoresList.style.display = "block";
    eltArrowPreviousScores.style.display = "block";
    selectAllScores();
  },
  // Handles click on the tab "Scores"
  clickTabScores: function clickTabScores() {
    eltMenu.style.display = "none";
    eltLevels.style.display = "none";
    eltScores.style.display = "block";
    selectAllLevels(eltLevels, "scores");
  },
  // Handles click on the tab "Options"
  clickTabOptions: function clickTabOptions() {
    eltMenu.style.display = "none";
    eltOptions.style.display = "block";
  },
  // Handles click on the tab "Options"
  clickTabAchievements: function clickTabAchievements() {
    eltMenu.style.display = "none";
    eltAchievements.style.display = "block";
    eltBtnLevelAchievements.style.display = "block";
    eltBtnTimeTrialAchievements.style.display = "block";
    eltAchievementsList.style.display = "none";
  },
  clickTabLevelAchievements: function clickTabLevelAchievements() {
    eltBtnLevelAchievements.style.display = "none";
    eltBtnTimeTrialAchievements.style.display = "none";
    eltAchievementsList.style.display = "block";
    selectAllAchievements(eltAchievementsList, "Levels"); 
  },
  clickTabTimeTrialAchievements : function clickTabTimeTrialAchievements() {
    eltBtnLevelAchievements.style.display = "none";
    eltBtnTimeTrialAchievements.style.display = "none";
    eltAchievementsList.style.display = "block";
    selectAllAchievements(eltAchievementsList, "TimeTrial"); 
  }
};
