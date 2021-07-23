const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
fifaData.filter(function(item){
    return item.Year === 2014;
})

const finals2014 = fifaData.filter(
    function(item){
        return item.Year === 2014 && item.Stage ==="Final";
    }
);

// console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log("task 1a", finals2014[0]["Home Team Name"]);   
//(b) Away Team name for 2014 world cup final
console.log("task 1b", finals2014[0]["Away Team Name"]);   
//(c) Home Team goals for 2014 world cup final
console.log("task 1c", finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("task 1d", finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("task 1e", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(fifaData) {
   return fifaData.filter (
    (element) => { return element.Stage="Final";}
   );
}

// console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(input_array, getFinals) {
    return getFinals(input_array).map(
        (element) => {return element.Year;}
    );
}

// console.log(getYears(fifaData,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(input_array, getFinals) {
    return getFinals(input_array).map(
        (element) => {
            if (element["Home Team Goals"] > element["Away Team Goals"]) {
                return element["Home Team Name"];
            }else{
                return element["Away Team Name"];
            }
        }
    );
}

// console.log(getWinners(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(input_array, getYears, getWinners) {

    const temp_years = getYears(input_array,getFinals);

    // console.log(temp_years);

    const temp_winners = getWinners(input_array, getFinals);

    // console.log(temp_winners);

    const result_arry = [];

    for (let i = 0; i < temp_years.length; i++){
        let temp_string = `In ${temp_years[i]}, ${temp_winners[i]} won the world cup!`;
        // console.log("temp_string = ", temp_string); 
        result_arry.push(temp_string);
    }
    
    return result_arry;
}

// console.log(getWinnersByYear(fifaData, getYears, getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinals) {
    const initial_value_zero=0;
    const data = getFinals;
    let average = data.reduce(
        //pass in anymous function
        function (accumulator, element) {
            return accumulator += element["Home Team Goals"] + element["Away Team Goals"];
        }
        //pass in initial value
        ,initial_value_zero) 
        //divide by length of array
        / data.length;
        //round to the 2nd decimal and return average
    return parseFloat(average).toFixed(2);   
}

// console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(input_data, input_team_initials) {
    const number_one = 1;
    const initial_value_zero = 0;
    return input_data
        .filter( element => 
            element["Stage"]==="Final")
        .filter( element => 
            element["Home Team Initials"] === input_team_initials || element["Away Team Initials"] === input_team_initials)
        .reduce( (accumulator, element) => {
            
                //case - home team win
                if (element["Home Team Goals"] > element["Away Team Goals"] 
                    && element["Home Team Initials"]===input_team_initials) {
                
                        return accumulator += number_one;}
                
                //case - away team win
                else if (element["Home Team Goals"] < element["Away Team Goals"]
                    && element["Away Team Initials"]===input_team_initials) {
                
                        return accumulator += number_one;}
                
                    //case - no one win
                else {

                    return accumulator += 0;
                }

            }//end anoymous function
            , initial_value_zero);//end reduce
                
}//end function getCountryWins

// console.log(getCountryWins(fifaData, "BRA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(input_data) {

    const initial_value_zero = 0;

    return input_data
        .filter( element => element["Stage"]==="Final")
        // .map()
        

}

console.log("");
console.log("stretch 2 ------------------------")
console.log(getGoals(fifaData).length);

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    return input_data
        .filter( element => element["Stage"]==="Final")

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
