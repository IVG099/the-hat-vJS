const wordPerPlayer = 3;
let teamName
let arrTeams        = [] 
let quantityOfTeams = 0
let currentTeam     = 0 
let currentMember   = 0
let maxQuantityOfMemberInTeam = 0//can be various number of memebrs in different teams
let arrWords        = [] 
let indexOfCurWord  = 0 
let guessingOfWordIsAvailable = false
let allWordsWereGuessed = false
let maxWordsGuessed   = 0

const divTeams        = document.getElementById('teams');
const inpTeamName     = document.getElementById('teamName');

const lblInputWords  = document.getElementById('labelInputWords');
const inpTtemp  = document.getElementById('ttemp');
const ulWordsOfPlayer  = document.getElementById('wordsOfPlayer');
const btnAddWord  = document.getElementById('addWord');
btnAddWord.addEventListener('click', addWord);
const divBlock1  = document.getElementById('divBlock1');
const divBlock2  = document.getElementById('divBlock2');
const divBlock3  = document.getElementById('divBlock3');
const divBlock4  = document.getElementById('divBlock4');
const divBlock5  = document.getElementById('divBlock5');
const btnShow  = document.getElementById('showTeamName');
const btnDelete  = document.getElementById('deleteLocalStorage');
const btnStartGame    = document.getElementById('btnStartGame');
btnStartGame.addEventListener('click', startGame);
const divReslults = document.getElementById('divBlock5')
const pWinner = document.getElementById('winner')
const btnPlayAgain = document.getElementById('playAgain')

function startGame(){
  divTeams.classList.remove("visibility-hidden")
  btnSaveTeamName.classList.remove("visibility-hidden")
  inpTeamName.classList.remove("visibility-hidden")
  btnStartGame.classList.add("visibility-hidden")
  btnStartGame.classList.add("display-none")
  divBlock1.classList.add("visibility-hidden")
  divBlock1.classList.add("display-none")
}

const btnSaveTeamName = document.getElementById('saveTeamName');
btnSaveTeamName.addEventListener('click', saveTeamName);

function saveTeamName(evt) {
  // console.log(`Произошло событие ${evt.type}`);
  // console.log(`А команда ${nameToShow}`);
  if((inpTeamName.value).trim().length == 0){
    alert(`Название команды должно быть заполнено!`)
    return
  }

  teamName = inpTeamName.value;
  if (arrTeams == null){
    arrTeams = []
  }

  let foundedTeamInArray = arrTeams.find((p) => p.teamName === teamName) // mb undefined
  if (foundedTeamInArray === undefined) {
    let quantityOfTeams = arrTeams.length//почему без этой строки с каждым новым нажатием нулю равна была?
    let objNewTeam = {}
    objNewTeam.teamName  = teamName;
    objNewTeam.teamIndex = quantityOfTeams;
    let newDivTeam = document.createElement('div');
    newDivTeam.id = `newDivTeam${quantityOfTeams}`;
    newDivTeam.className = 'divTeam visibility-visible';
   
    let teamNameHead = document.createElement('h2');
    teamNameHead.innerHTML = `Команда 
    "${teamName}"`
    teamNameHead.id = `teamNameHead${quantityOfTeams}`;
    newDivTeam.appendChild(teamNameHead);

    objNewTeam.teamDivId      = newDivTeam.id;
    objNewTeam.teamNameHeadId = newDivTeam.id;

    let inputTeamMember = document.createElement('input');
    teamNameHead.innerHTML = `Команда 
    "${teamName}"`
    inputTeamMember.id = `inputTeamMember${quantityOfTeams}`;
    // inputTeamMember.setAttribute('style', 'color:red; border: 7px solid blue;')
    inputTeamMember.setAttribute('placeholder', 'Введите имя игрока')
    inputTeamMember.name = `inputTeamMember${quantityOfTeams}`;
    inputTeamMember.autocomplete="off"
    teamNameHead.appendChild(inputTeamMember);

    objNewTeam.inputTeamMemberID = inputTeamMember.id;

    let labelTeamMember = document.createElement('label');
    labelTeamMember.for = inputTeamMember.id;
    labelTeamMember.placeholder = "Введите имя нового игрока";
    labelTeamMember.value = "Введите имя нового игрока";
    // newDivTeam.appendChild(labelTeamMember);

    objNewTeam.teamDivId      = newDivTeam.id;
    objNewTeam.teamNameHeadId = newDivTeam.id;
    objNewTeam.isWinner       = false;

    // Добавляем новый div к существующему элементу в конец
    divTeams.appendChild(newDivTeam); 

    window['newTeamMemberButton' + quantityOfTeams] = document.createElement('button');
    window['newTeamMemberButton' + quantityOfTeams].value = `Создать игрока команды ${teamName}`
    window['newTeamMemberButton' + quantityOfTeams].innerText = `Создать игрока команды ${teamName}`
    window['newTeamMemberButton' + quantityOfTeams].innerHTML = `Создать игрока команды ${teamName}`
    window['newTeamMemberButton' + quantityOfTeams].dataNumberButton = quantityOfTeams;
    window['newTeamMemberButton' + quantityOfTeams].style.cssText = 'background-Color: lightblue; border: 1px solid black; width:100px; height: 10 px; border-radius: 5%;'
    window['newTeamMemberButton' + quantityOfTeams].addEventListener('click', saveTeamMemberName);
    newDivTeam.appendChild(window['newTeamMemberButton' + quantityOfTeams])

    let ulTeamMembers = document.createElement('ul');
    ulTeamMembers.innerHTML = `<strong>Игроки команды:</strong>`

    ulTeamMembers.id = `ulTeamMembers${quantityOfTeams}`;
    newDivTeam.appendChild(ulTeamMembers)

    objNewTeam.ulTeamMembersID = newDivTeam.id;
    objNewTeam.players = [];

    objNewTeam.guessedWords = []

    arrTeams.push(objNewTeam)
    // localStorage.setItem('arrTeam', JSON.stringify(arrTeam));

  } else {
    alert (`команда ${teamName} уже записана` )
  }
  inpTeamName.value = ""
}

function saveTeamMemberName(event){
  // alert (event.target.value)
  // alert (event.target.dataNumberButton)
  // console.log (event.target)

  // ищем куда прикрепить
  let ulTeamMembers = document.getElementById(`ulTeamMembers${event.target.dataNumberButton}`)
  
  let newMember = document.createElement('li')
  let inputNameOfPlayer = document.getElementById(arrTeams[event.target.dataNumberButton].inputTeamMemberID);
  // alert(arrTeams[event.target.dataNumberButton].inputTeamMemberID)

  if((inputNameOfPlayer.value).trim().length == 0){
  alert(`Имя игрока должно быть заполнено!`)
  return
  }

  newMember.innerHTML = inputNameOfPlayer.value;
  inputNameOfPlayer.value = ""
  ulTeamMembers.appendChild(newMember)

  let objTeam = arrTeams[event.target.dataNumberButton]
  objTeam.players.push(newMember.innerHTML);

  btnteamNamesSaved.classList.remove("visibility-hidden")
}

function searchMaxQuantityOfMemberInTeam(){
  arrTeams.forEach(function(item, i, arr) {
    if (item.players.length > maxQuantityOfMemberInTeam){
      maxQuantityOfMemberInTeam = item.players.length
    }
  });
}

function changeVisibility(numberOfStep){

  if (numberOfStep === 5) {
    pfillUpWord.classList.remove("visibility-hidden")
    lblInputWords.classList.remove('visibility-hidden')
    inpTtemp.classList.remove('visibility-hidden')
    btnAddWord.classList.remove('visibility-hidden')
    ulWordsOfPlayer.classList.remove('visibility-hidden')
    btnSaveTeamName.disabled = true;

    arrTeams.forEach(function(item, i, arr) {
      window['newTeamMemberButton' + i].hidden = true//или для кнопки можно: disabled = true
      document.getElementById(`inputTeamMember${i}`).hidden = true//или для инпута можно: disabled = true
      }
    )

  } else if (numberOfStep === 6){
    pfillUpWord.classList.add("visibility-hidden")
    lblInputWords.classList.add('visibility-hidden')
    inpTtemp.classList.add('visibility-hidden')
    btnAddWord.classList.add('visibility-hidden')
    ulWordsOfPlayer.classList.add('visibility-hidden')
    divBlock3.classList.add("display-none")
    divBlock3.hidden=true
    divBlock4.hidden=true
    divBlock4.classList.remove('visibility-hidden')
  } else if(numberOfStep === 7){
    btnFinishStep.classList.add('visibility-hidden')
    pInstructionsBlock4.classList.add('visibility-hidden')
    ulWordsInGame.classList.add('visibility-hidden')
    divBlock4.classList.add('visibility-hidden')
    divBlock3.classList.add("display-none")
    divBlock4.classList.add("display-none")
    divBlock3.hidden=true
    divBlock4.hidden=true
    divReslults.classList.remove('visibility-hidden')
    btnPlayAgain.classList.remove('visibility-hidden')
  }
  }

const pfillUpWord  = document.getElementById('fillUpWord')

const btnteamNamesSaved = document.getElementById('teamNamesSaved');
btnteamNamesSaved.addEventListener('click', teamNamesSaved);

//after filling up all teams and their members
function teamNamesSaved(){

let numberOfPlayers = arrTeams[0].players.length
let equalTeams = true

arrTeams.forEach(function(item, i, arr) {
  if(!(item.players.length == numberOfPlayers)){
  equalTeams = false
  }
  }
)

if (!equalTeams){
alert('В командах должно быть равное количество игроков!')
return
}

  divBlock2.classList.add("visibility-hidden")
  divBlock3.classList.remove("visibility-hidden")
  btnteamNamesSaved.classList.add("visibility-hidden")
  
  searchMaxQuantityOfMemberInTeam()
  changeVisibility(5)
  showFillingUpWordsForNextPlayer()

}

//заполнение игроками слов для использования в игре 
function showFillingUpWordsForNextPlayer() {

  //!!!Переменные, объявленные внутри функции без ключевого слова, станут глобальными переменными!!!
  
  let liItems = ulWordsOfPlayer.getElementsByTagName('li')
  if(liItems.length > 0){
    while (liItems.length > 0){
      liItems[0].remove();
    }
  }

  //при первом нажатии здесь currentMember = 0 и currentTeam = 0
  if(currentMember === maxQuantityOfMemberInTeam){
    alert('all players has filled up words!')
    currentMember = 0
    currentTeam   = 0
    changeVisibility(6)
    showUpNextPlayer()
    return;
  }

  //в разных командах может быть разное количество участников, 
  //чтобы не выводить предложения заполнить слова для несуществующих игроков команды (команды, где игроков не хватает])
  if ((arrTeams[currentTeam].players[currentMember] == undefined) || (arrTeams[currentTeam].players[currentMember] == "")) {

  } else{
    pfillUpWord.value         =`Игрок ${arrTeams[currentTeam].players[currentMember]} команды ${arrTeams[currentTeam].teamName}введите список из ${wordPerPlayer} своих слов`
    pfillUpWord.innerHTML   = `Игрок &nbsp <span class="colortext"><strong>  ${arrTeams[currentTeam].players[currentMember]} </strong></span> &nbsp команды &nbsp <span class="colortext"><strong>   ${arrTeams[currentTeam].teamName} </strong></span> &nbsp введите список из ${wordPerPlayer} своих слов`
  }
  
  // alert(`currentMember: ${currentMember} currentTeam: ${currentTeam}`)
  if(currentTeam < arrTeams.length - 1){
    currentTeam++;
  } else {
    currentTeam = 0;  
    currentMember++
  }
    
}

function addWord(){

  if((inpTtemp.value).trim().length == 0){
  alert(`Слово не может быть пустым!`)
  return
  }

  arrWords.push(inpTtemp.value)
  let newWord = document.createElement('li')
  newWord.appendChild(document.createTextNode(inpTtemp.value));//НАДО ЛИ ЭТО?!
  newWord.autocomplete = "off"
  ulWordsOfPlayer.appendChild(newWord)
  inpTtemp.value = "";

  if ((ulWordsOfPlayer.getElementsByTagName('li').length) == wordPerPlayer){
    let tmr = setTimeout(() => {
      showFillingUpWordsForNextPlayer()//переходим к заполнению слов другого игрока
      clearTimeout(tmr)//надо ли это?
  } , 300)
  }

}

function clearUpWordsInGame(){
  let liItems = ulWordsInGame.getElementsByTagName('li')
  if(liItems.length > 0){
    while (liItems.length > 0){
      liItems[0].remove();
    }
  }
}

function showUpNextPlayer(){

  clearUpWordsInGame()
 
  pInstructionsBlock4.value =`Игрок ${arrTeams[currentTeam].players[currentMember]} команды ${arrTeams[currentTeam].teamName} Ваш ход!`
  pInstructionsBlock4.innerHTML   = `Игрок &nbsp <span class="colortext"><strong>${arrTeams[currentTeam].players[currentMember]}</strong></span> &nbsp команды &nbsp <span class="colortext"><strong>${arrTeams[currentTeam].teamName}</strong></span> &nbsp Ваш ход!`
  btnStartStep.classList.remove('visibility-hidden')
  btnFinishStep.classList.add('visibility-hidden')
}

const pInstructionsBlock4 = document.getElementById('pInstructionsBlock4'); 
const ulWordsInGame = document.getElementById('wordsInGame'); 
const btnStartStep = document.getElementById('startStep');
btnStartStep.addEventListener('click', startStep);

function startStep(){
  btnStartStep.classList.add('visibility-hidden')
  guessingOfWordIsAvailable = true
  let tmr = setTimeout(() => {
    if(!allWordsWereGuessed){
      alert('Прошло 30 секунд!')
      btnFinishStep.classList.remove('visibility-hidden')
    }
    clearTimeout(tmr)//надо ли это?
    guessingOfWordIsAvailable = false
    
  }, 5000)

  showUpNextWord()

}

let newWordInGame

function showUpNextWord(){
  // alert('adding li')
  newWordInGame = document.createElement('li')
  // newWordInGame.innerHTML = arrWords[indexOfCurWord];
  newWordInGame.innerHTML = `${arrWords[indexOfCurWord]} &nbsp;&nbsp;&nbsp;&nbsp; <span class="colortextGreen" data-index=0>&nbspУГАДАНО&nbsp</span>
  <span class="colortextRed" data-index=1>&nbsp;&nbsp;&nbsp;ПРОПУЩЕНО&nbsp</span>`
  newWordInGame.autocomplete = "off"
  ulWordsInGame.appendChild(newWordInGame)
}

ulWordsInGame.onclick = function(event){

  if (!guessingOfWordIsAvailable){
    return //time of player had run out
  }

  if (event.target.dataset.index){
      // const index = Number(event.target.dataset.index); 
      // const index = parseInt(event.target.dataset.index); 
      // alert(event.target.dataset.index)
      //слово угадано:
      if(parseInt(event.target.dataset.index) == 0){
 
        newWordInGame.innerHTML = `${arrWords[indexOfCurWord]}  &nbsp;&nbsp;&nbsp;УГАДАНО`
        newWordInGame.classList.add("backgroundColorGreen")
        newWordInGame.classList.remove("backgroundColorRed")

        arrTeams[currentTeam].guessedWords.push(arrWords[indexOfCurWord])
        arrWords.splice(indexOfCurWord, 1)  
        // indexOfCurWord++  ПОЛУЧАЕТСЯ, ИНДЕКС ОСТАВЛЯЕМ ТЕМ ЖЕ, если элемент удалили?!
        
        if(arrWords.length==0){
          terminamos()
        } else {
          
          //некоторые слова могли быть пропуцщены (не отгаданы), тогда индекс стал больше 0
          if (indexOfCurWord >= arrWords.length){
            indexOfCurWord = 0
          }
          showUpNextWord()
        }

        //слово пропущено:
      } else if (parseInt(event.target.dataset.index) == 1){
        newWordInGame.innerHTML = `${arrWords[indexOfCurWord]}  &nbsp;&nbsp;&nbsp;ПРОПУЩЕНО`
        newWordInGame.classList.add("backgroundColorRed")
        newWordInGame.classList.remove("backgroundColorGreen")
        if (indexOfCurWord < arrWords.length-1){
          indexOfCurWord++
        } else {
          indexOfCurWord = 0
        }
        showUpNextWord()

      }
  }

}

const btnFinishStep = document.getElementById('finishStep');
btnFinishStep.addEventListener('click', finishStep);

function finishStep(){
  if(currentTeam < arrTeams.length - 1){
    currentTeam++;
  } else {
    currentTeam = 0;
    currentMember++
  }

  if(currentMember === maxQuantityOfMemberInTeam){
    currentMember = 0
    currentTeam   = 0
  }
  showUpNextPlayer()
}


function showResults(){

  arrTeams.forEach(function(item, i, arr) {
    let curDiv = document.getElementById(item.teamDivId)// newDivTeam.id = `newDivTeam${quantityOfTeams}`
    curDiv.classList.add(`divTeam`)//backgroundColorRed

    if (item.isWinner ==true){
      let pWinner = document.createElement('p')
      pWinner.innerHTML = `Победитель!!! <br> <br> Слов, <br> отгаданных командой: <br>  ${maxWordsGuessed}`
      pWinner.classList.add('pWinner')
      curDiv.appendChild(pWinner)
    }

    // let ulGuessedWords = document.createElement('ul');
    // ulGuessedWords.innerHTML = `<strong>Угаданные командой слова:</strong>`
    // curDiv.appendChild(ulGuessedWords)

    // let liGuessedWord = document.createElement('li')
    // liGuessedWord.innerHTML = `<br>` + item.guessedWords.join('<br>')
    // ulGuessedWords.appendChild(liGuessedWord)

    }
  )

}

function countResults(){

  let textForFinal = ''
  let htmlForFinal = ''
  let indexOfTeamWinner = [] 
  arrTeams.forEach(function(item, i, arr) {
    if (item.guessedWords.length > maxWordsGuessed){
      maxWordsGuessed = item.guessedWords.length
      indexOfTeamWinner.length=0
      indexOfTeamWinner.push(i)
    } else if(item.guessedWords.length == maxWordsGuessed){
      indexOfTeamWinner.push(i)
    } 
  });

  if(indexOfTeamWinner.length == 1){
    arrTeams[indexOfTeamWinner[0]].isWinner = true;
    let words = `<br>` + arrTeams[indexOfTeamWinner].guessedWords.join('<br>')
    textForFinal = `Выиграла команда: ${arrTeams[indexOfTeamWinner].teamName} 
    угадано слов: ${maxWordsGuessed} 
    team words guessed: ${arrTeams[indexOfTeamWinner].guessedWords}`
    htmlForFinal = `Выиграла команда: &nbsp <span class="colortext"><strong>${arrTeams[indexOfTeamWinner].teamName}</strong></span> &nbsp <br> угадано слов: &nbsp <span class="colortext"><strong>${maxWordsGuessed}</strong></span> &nbsp <br>
    Угаданные слова: &nbsp <span class="colortext"><strong>${words}</strong></span> &nbsp &nbsp <span class="colortext">`
  } else if (indexOfTeamWinner.length > 1){

    let teamsWinners = ''
    indexOfTeamWinner.forEach(function(item, i, arr) {
      arrTeams[item].isWinner = true
      teamsWinners+= `${arrTeams[item].teamName} `
      }
    )

    textForFinal = `Выиграли КОМАНДЫ: ${teamsWinners} 
    Каждая угадала слов: ${maxWordsGuessed} `
    htmlForFinal = `Выиграли КОМАНДЫ: ${teamsWinners} <br>  
    Каждая угадала слов: ${maxWordsGuessed}`
  }

  pWinner.value     = textForFinal
  pWinner.innerHTML = htmlForFinal
  // btnStartStep.classList.remove('visibility-hidden')
  // btnFinishStep.classList.add('visibility-hidden')

}

function terminamos(){
  allWordsWereGuessed = true
  alert('Все слова угаданы!')
  changeVisibility(7)
  countResults()
  showResults()
}

btnPlayAgain.addEventListener('click', playAgain)

function playAgain(){
  location.reload() 
}

// const btnNameToShow = document.getElementById('showTeamName');
// btnNameToShow.addEventListener('click', callback);

// function callback(evt) {
//   console.log(`Произошло событие ${evt.type}`);
//   localStorage.setItem('teamName', evt.target.value);
//   nameToShow = localStorage.getItem('teamName')
//   arrTeams = JSON.parse(localStorage.getItem('arrTeams'))
//   alert(`Сохраненные команды:  ${arrTeams}`);
//   localStorage.clear();
//   arrTeams = []
//   firstRect.setAttribute('style', 'color:red; border: 7px solid blue;')
// }