


function isPalindrome(date){
    var reversedDate = date.split("").reverse().join("");
    return reversedDate === date;
}


function convertDateString(date) {
    var dateStr = { day:"", month:"", year:""}

    if(date.day < 10){
        dateStr.day = "0" +date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if( date.month < 10) {
        dateStr.month = "0" +date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();


    // console.log(dateStr)
    return dateStr
}


function getAllDateFormats(date){

    var dateStr = date

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmyyyydd = dateStr.month + dateStr.year + dateStr.day
    var yyyyddmm = dateStr.year + dateStr.day + dateStr.month
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmyydd = dateStr.month + dateStr.year.slice(-2) + dateStr.day
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month

    // console.log(ddmmyyyy," ", mmyyyydd, " ",yyyyddmm, " ",ddmmyy, " ",mmyydd, " ",yyddmm)
    return [ddmmyyyy, mmyyyydd, yyyyddmm, ddmmyy, mmyydd, yyddmm]
}

function checkPalindromeForAllDates(date) {
    var dateStr = convertDateString(date)
    // console.log(dateStr)
    var allDates = getAllDateFormats(dateStr)

    var palindromeList = [];

    for ( i = 0; i < allDates.length; i++){
        var result = isPalindrome(allDates[i]);
        palindromeList.push(result);
        console.log(palindromeList)
    }

    return palindromeList

    
}

function isLeapYear(year){
    if (year % 400 === 0){
        return true;
    }

    if (year % 100 === 0){
        return false;
    }

    if (year % 4 === 0){
        return true;
    }

    return false
}





function comparePalindromes(birthdate){
    var [counterIncrease,incrementDate] = findNextPalindrome(birthdate)

    var [counterDecrease,decrementDate] = findPreviousPalindrome(birthdate)

    // console.log(counterIncrease)
    // console.log(counterDecrease)

    if (counterIncrease <= counterDecrease){
        outputDiv.innerText = `Opps, your birthdate isn't a Palindrome 😥. Next Palindrome is on ${incrementDate.day}-${incrementDate.month}-${incrementDate.year} and it is ${counterIncrease} days away`
        
    }
    else {
        outputDiv.innerText = `Opps, your birthdate isn't a Palindrome 😥. Next Palindrome is on ${decrementDate.day}-${decrementDate.month}-${decrementDate.year} and it was ${counterDecrease} days before`
        
    }
    
}

function nextDate(date){

    var day = date.day +1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
        if (day > 29) {
            day = 1;
            month = 3;
        }
        } else {
        if (day > 28) {
            day = 1;
            month = 3;
        }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}



function findNextPalindrome(date){
    var incrementDate = date;
    var counter = 0

    while(1){
        counter++;
        incrementDate = nextDate(incrementDate)
        var palindromeString = checkPalindromeForAllDates(incrementDate)

        for (index = 0; index < palindromeString.length; index++){
            
            if(palindromeString[index]){
                return [counter, incrementDate]
                
            }
                 
            
        } 
        
    }
    
}


function previousDate(date){

    var day = date.day -1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
    
        if (month === 0) {
          month = 12;
          day = 31;
          year--;
        } else if (month === 2) {
          if (isLeapYear(year)) {
            day = 29;
          } else {
            day = 28;
          }
        } else {
          day = daysInMonth[month - 1];
        }
      }
    
      return {
        day: day,
        month: month,
        year: year,
      };
}


function findPreviousPalindrome(date){
    var decrementDate = date;
    var counter = 0

    while(1){
        counter++;
        decrementDate = previousDate(decrementDate)
        var palindromeString = checkPalindromeForAllDates(decrementDate)

        for (index = 0; index < palindromeString.length; index++){
            
            if(palindromeString[index]){
                // console.log(palindromeString)
                return [counter, decrementDate]
                
            }
                 
            
        } 
        
    }
}


////////// Input And Function Calls

const inputBirthdate = document.querySelector("#dob-input");
const submitBtn = document.querySelector("#submit-btn");
const outputDiv = document.querySelector("#output-div")


function clickHandler(e){
    var dob = inputBirthdate.value
    dob = dob.split("-")
    // console.log(dob)

    var birthdate = {
        "day":Number(dob[2]),
        "month":Number(dob[1]),
        "year":Number(dob[0])
    }

    // console.log(birthdate)
    if (inputBirthdate.value != ""){
        var palindromeString = checkPalindromeForAllDates(birthdate)
        var boolCount = 0
        // console.log(palindromeString)
        for (index = 0; index <= palindromeString.length; index++){
            // console.log(palindromeString)
            if(palindromeString[index] === true){
                // console.log("Is a Palindrome");
                outputDiv.innerText = "Is a Palindrome"
                boolCount = 1;
                break;
            }
            else {           
                // comparePalindromes(birthdate)
                // break;
            }
        }
        if (boolCount === 0){
            comparePalindromes(birthdate)
        }
    }
    else {
        outputDiv.innerText = "Please Enter your birthdate!!!"
    }
    showOutputDiv()
    
}

function hideOutputDiv() {
    outputDiv.style.display = "none"
}

function showOutputDiv () {
    outputDiv.style.display = "block"
}

hideOutputDiv()
submitBtn.addEventListener("click", clickHandler)




