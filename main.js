const btnCheck = document.querySelector(".btn-check")
const dob = document.querySelector(".input-bdy")
const displayOutput = document.querySelector("#display-output")

function reverseString(str){
    var reversedStr = str.split('').reverse().join('')
    return reversedStr
}

function isPalindrome(str){
    if(str === reverseString(str)){
        return true
    }else{
        return false
    }
}

function convertDateToStr(date){

    var dateStr = { day: '', month: '', year: '' };

    if(date.day<10){
        dateStr.day = '0' + date.day
    }else{
        dateStr.day = date.day.toString()
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month
    }else{
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr
}

function datesAllFormats(date){

    var dateStr = convertDateToStr(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

//check palindromes for all date formats
function checkPalindrome(date){
    var palindrome = false
    var allDateFormats = datesAllFormats(date)
    for(var i=0;i<allDateFormats.length;i++){
        if(isPalindrome(allDateFormats[i])){
            palindrome = true
            break
        }
    }
    return palindrome
}

function isLeapYear(year){
    if(year % 100 === 0){
        if(year % 400 === 0){
            return true
        }else{
            return false
        }
    }else{
        if(year%4 === 0){
            return true
        }else{
            return false
        }
    }
}


function getNextDate(date){
    var day = date.day + 1
    var month = date.month
    var year = date.year

    var noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1
                month++
            }
        }
        else{
            if(day>28){
                day = 1
                month++
            }
        }
    }else{
        if(day > noOfDaysInMonth[month-1]){
            day=1
            month++
        }
    }

    if(month > 12){
        month = 1
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindromeDate(date){
    var count = 0
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalindrome = checkPalindrome(nextDate)
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate)
    }
    return [count,nextDate]
}


 function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 3){
        if(isLeapYear(year)){
            if(day < 1){
                day = 29
                month--
            }
        }
        else{
            if(day < 1){
                day = 28
                month--
            }
        }
    }else{ // 1 2 4 5 6 7 8 9 10 11 12
        if(day < 1){ 
            if(month===1){
                day = 31
                month = 12
                year--
            }else{
                month--
                day = noOfDaysInMonth[month-1]
            }
        }
    }

    return {
        day:day,
        month:month,
        year:year
    }

}
 
function getPreviousPalindromeDate(date){
    var count = 0
    var prevDate = getPreviousDate(date);

    while(1){
        count++
        if(checkPalindrome(prevDate)){
            break;
        }

        prevDate = getPreviousDate(prevDate)
    }
    return [count,prevDate]
}

function btnCheckEventListener(){
    
    var date = dob.value
    
    if(date!==''){
        var dateOfBirth = date.split('-')

        var birthday = {
            day: Number(dateOfBirth[2]),
            month:Number(dateOfBirth[1]),
            year:Number(dateOfBirth[0])
        }

        var isPalindrome = checkPalindrome(birthday)

        if(isPalindrome){
            displayOutput.innerText = "Hurray! your birthday is a palindrome! 🎉✨"
        }else{
            var [countNext, nextDate] = getNextPalindromeDate(birthday)
            var [countPrev, previousDate] = getPreviousPalindromeDate(birthday)
            
            if(countNext < countPrev){
                displayOutput.innerText = `Alas! your birthday is not Palindrome😥.You missed it by ${countNext} days. The nearest Palindrome date is ${nextDate.day} - ${nextDate.month} - ${nextDate.year}`
            }else{
                displayOutput.innerText = `Alas! your birthday is not Palindrome😥.You missed it by ${countPrev} days. The nearest Palindrome date is ${previousDate.day} - ${previousDate.month} - ${previousDate.year}`
            }
            
        }

     }else{
        displayOutput.innerText = "Please choose a valid date."
    } 
}


btnCheck.addEventListener("click",btnCheckEventListener)
