/**************************************************************************************************
Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
**************************************************************************************************/
function dump(arr,level) {
  var dumped_text = "";
  if(!level) level = 0;

  //The padding given at the beginning of the line.
  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "    ";

  if(typeof(arr) == 'object') { //Array/Hashes/Objects
    for(var item in arr) {
      var value = arr[item];

      if(typeof(value) == 'object') { //If it is an array,
        dumped_text += level_padding + "'" + item + "' ...\n";
        dumped_text += dump(value,level+1);
      } else {
        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
      }
    }
  } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
}

/**************************************************************************************************
Fade out effect
**************************************************************************************************/
function fadeOut(elem, speed) {
  if (!elem.style.opacity) {
    elem.style.opacity = 1;
  }
  var fade = setInterval(function() {
    elem.style.opacity -= .02;
    if (elem.style.opacity < 0) {
      clearInterval(fade);
      if (elem.id == "launch-screen") {
        elem.style.display = "none";
        oMenu.initialize();
      } else {
        elem.src = listFruitImages[8];
      }
    }
  }, speed / 50);
}

/**************************************************************************************************
Fade in effect
**************************************************************************************************/
function fadeIn(elem, speed) {
  if (!elem.style.opacity) {
    elem.style.opacity = 0.01;
    elem.style.display = "block";
  }
  var fade = setInterval(function() {
    elem.style.opacity = elem.style.opacity * 1.10;
    if (elem.style.opacity > 1) {
      clearInterval(fade);
    }
  }, speed / 50);
}

/**************************************************************************************************
Translate bottom or top an element
**************************************************************************************************/
function translate(elem, shift, speed) {
  oGame.state = "fall";

  var row = elem.id.substring(5, 6);
  var col = elem.id.substring(7, 8);
  var height = getFruit(row, col).height;
  var top = parseInt(elem.style.top.replace("px", ""));
  var max = parseInt(row) * parseInt(height);

  if (top != max) {
    if (top < max) {
      var fade = setInterval(function() {
        elem.style.top = top + shift + "px";
        top = parseInt(elem.style.top.replace("px", ""));
        if (top > max) {
          elem.style.top = max + "px";
          clearInterval(fade);
          oGame.state = "";
        }
      }, speed / 50);
    } else {
      var fade = setInterval(function() {
        elem.style.top = top - shift + "px";
        top = parseInt(elem.style.top.replace("px", ""));
        if (top < max) {
          elem.style.top = max + "px";
          clearInterval(fade);
          oGame.state = "";
        }
      }, speed / 50);
    }
  }
}

/**************************************************************************************************
Getter for fruits elements
**************************************************************************************************/
function getFruit(row, col) {
  return document.getElementById('fruit' + row + '_' + col);
};

/**************************************************************************************************
Checks if a fruit is destroyed
**************************************************************************************************/
function isDestroyed(fruit) {
  return (fruit && fruit.src.indexOf('destroy.png') != -1);
};

/**************************************************************************************************
Creates a new fruit element
**************************************************************************************************/
function createFruit(id, sTop, sLeft, src) {
  var eltFruit = document.createElement('img');
  eltFruit.className = 'fruit';
  eltFruit.id = id;
  eltFruit.src = src;
  eltFruit.style.top = sTop;
  eltFruit.style.left = sLeft;
  eltFruit.style.width = eltMap.width / 9 + 'px';
  eltFruit.style.height = eltMap.height / 9 + 'px';
  eltFruit.style.opacity = 1;

  eltFruit.addEventListener('webkitTransitionEnd', updateTransform, false);
  eltFruit.addEventListener(     'oTransitionEnd', updateTransform, false);
  eltFruit.addEventListener(      'transitionend', updateTransform, false);

  attachClickEvent(eltFruit);
  return eltFruit;
};

/**************************************************************************************************
Getter for pages elements (levels menu)
**************************************************************************************************/
function getPage(page) {
  return document.getElementById('page'+page);
};

/**************************************************************************************************
Getter for levels elements (levels menu)
**************************************************************************************************/
function getLevel(level) {
  return document.getElementById('level'+level);
};

/**************************************************************************************************
Levels page - Create a new page element
**************************************************************************************************/
function createPage(page) {
  var eltPage = document.createElement("div");
  eltPage.id = "page"+page;
  eltPage.className = "page";
  
  return eltPage;
};

/**************************************************************************************************
Levels page - Create a new level element
**************************************************************************************************/
function createLevel(id) {
  var eltLevel = document.createElement("img");
  eltLevel.id = "level"+parseInt(id+1);
  eltLevel.src = "resources/images/levels/"+parseInt(id+1)+".png";
  
  return eltLevel;
};

/**************************************************************************************************
Levels page - Create a new level element in order to append cherries
**************************************************************************************************/
function createLevelCherry(level, page) {
  var eltLevelCherry = document.createElement("div");
  eltLevelCherry.id = "levels-"+level+"-level-cherry-"+page;
  eltLevelCherry.className = "levels-"+level+"-level-cherry";
      
  return eltLevelCherry;
};

/**************************************************************************************************
Levels page - Create a new cherry element
**************************************************************************************************/
function createCherry(id, nb) {
  var eltCherry = document.createElement("img");
  eltCherry.id = "cherry"+id;
  eltCherry.src = "resources/images/cherries/"+nb+".png";
      
  return eltCherry;
};

function setBgEltEndLevel() { 
  if (oMenu.language == "fr") {
    eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-fr.jpg)";
  } else {
    eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-en.jpg)";
  }
}

function setBgEltEndLevelFail() {
  if (oMenu.language == "fr") {
    eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-failed-fr.jpg)";
  } else {
    eltEndLevel.style.backgroundImage = "url(resources/backgrounds/end-level-failed-en.jpg)";
  }
}
