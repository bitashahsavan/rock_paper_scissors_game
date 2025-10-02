const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    //همون ایموجی هستش که کاربرروی ان کلیک می کند
    const selectionName = selectionButton.dataset.selection
    //اگر ایموجی که کاربرانتخاب کرد هم نام بایکی ازایموجی های داخل ابجکت شد
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

function makeSelection(selection) {
   const computerSelection = randomSelection()
   const yourWinner = isWinner(selection, computerSelection)
   const computerWinner = isWinner(computerSelection, selection)
   addSelectionResult(computerSelection, computerWinner)
   addSelectionResult(selection, yourWinner)
   
   if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
}




function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}


//این تابع برنده رامشخص می کند والمان های ورودی ان انتخاب ما وانتخاب حریف یاهمان کامپیوتراست
function isWinner(selection, opponentSelection) {

  //اگرانتخاب ما قسمت بیتز ابجکت که مساوی با نام حریف شد یعنی مابرنده شدیم
  return selection.beats === opponentSelection.name
}
//تابعی که هرباربه جای کامپیوتریکی ازایموجی هارابطورتصادفی انتخاب می کند
function randomSelection() {
  //ازتعدادابجکت یکی رابصورت تصادفی انتخاب میکند که عدد رندی است
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  //هربارکه این تابع فراخوانی میشود تابع روی ابجکت اجراواونی که طبق رندومایندکس انتخاب شده رابرمی گرداند
  return SELECTIONS[randomIndex]
}
// !قدم های ایجاد جاوااسکریپت
// #1کاربر روی هرایموجی کلیک کرد کامپیوتر راان رابشناسد
// #2کامپیوتربه صورت تصادفی یکی از ایموجی های داخل ابجکت را انتخاب 
// #3ایموجی هایی که کاربر یاکامپیوترانتخاب می کنند داخل یک دیو درپایین ان با کلاس ازقبل تعریف شده نمایش داده شود
// #4هرجا هرکس برنده شد کلاس برنده رابگیرد
// #5 برنده کسی است که بیتز انتخابش با نام حریف یکی باشد
