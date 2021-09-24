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

function convertNumberToStr(date){

    var dateStr = { day: '', month: '', year: '' };

    if(date.day<10){
        dateStr.day = '0' + date.day
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month
    }

    dateStr.day = date.day.toString()
    dateStr.month = date.month.toString()
    dateStr.year = date.year.toString()

    return dateStr
}

function datesAllFormats(date){

    var dateStr = convertNumberToStr(date)

    var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year
    var mmddyyyy = dateStr.month+dateStr.day+dateStr.year
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
        }else{
            nextDate = getNextDate(nextDate)
        }
    }
    return [count,nextDate]
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

        console.log(isPalindrome)
        if(isPalindrome){
            displayOutput.innerText = "Hurray! your birthday is a palindrome! 🎉✨"
        }else{
            var [count, nextDate] = getNextPalindromeDate(birthday)
            console.log(count,nextDate)
            displayOutput.innerText = `Alas! your birthday is not Palindrome😥.You missed it by ${count} days. The next Palindrome date is ${nextDate.day} - ${nextDate.month} - ${nextDate.year}`
        }

    } else{
        displayOutput.innerText = "Please choose a valid date."
    } 
}


btnCheck.addEventListener("click",btnCheckEventListener)
