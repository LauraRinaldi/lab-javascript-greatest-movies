// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map((movie) => {
        return movie.director
    })
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter((movie) => {
        return movie.director === 'Steven Spielberg' && movie.genre.includes("Drama")
    }).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length < 1) {
        return 0
    }
    let scores = moviesArray.map((movie) => {
        return movie.score
    })
    let sum = scores.reduce((a, b) => {
        if (b === undefined) {
            return a
        } else {
            return a + b
        }
    }, 0)
    let average = sum/moviesArray.length
    return parseFloat(average.toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaMovies = moviesArray.filter((movie) => {
        return movie.genre.includes("Drama")
    })
    return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let movieCopies = [...moviesArray]
    return movieCopies.sort((a, b) => {
        if (a.year === b.year) {
            return a.title.localeCompare(b.title)
        } else {
            return a.year - b.year
        }
    })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map((movie) => {
        return movie.title
    }).sort((a, b) => a.localeCompare(b)).slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
// function turnHoursToMinutes(moviesArray) {
//     let newArr = [...moviesArray]
//     for (let i = 0; i < newArr.length; i++) {
//         let duration = newArr[i].duration.split(' ')
//         for (let j = 0; j < duration.length; j++) {
//             if (duration[j].includes("h")) {
//                 duration[j] = duration[j].replace(/\D/g, '')
//                 duration[j] *= 60
//             } else {
//               duration[j] = Number(duration[j].replace(/\D/g, ''))
//             }
//         }
//         let reduced = duration.reduce((a,b) => a + b, 0)
//         newArr[i].duration = reduced
//     }
//     return newArr
// }

// function turnHoursToMinutes(moviesArray) {
//     return moviesArray.map(function (m) {
//         let new_m = structuredClone(m);
//         let dur = new_m.duration;                
//         let hour = 0;
//         let min = 0;
//         if (dur.includes('h')){hour+=+dur.match(/(\d+)h/)[1] *60}
//         if (dur.includes('min')){min+=+dur.match(/(\d+)min/)[1]}
//         new_m['duration'] =  hour+min;
//         return new_m;})
//     };

function turnHoursToMinutes(moviesArray) {
    const timeFormatArr = moviesArray.map(function(movie) {
      if (movie.duration.indexOf("h") >= 0 && movie.duration.indexOf("min") >= 0) {
        const hour = Number(movie.duration[0]);
        const minutes = Number(movie.duration[3] + movie.duration[4]);
        const durationInMin = hour * 60 + minutes;
        return {movie, duration: durationInMin};
      } else if (movie.duration.indexOf("h") >= 0) {
        const hour = Number(movie.duration[0]);
        const durationInMin = hour * 60;
        return {movie, duration: durationInMin};
      } else {
        const minutes = Number(movie.duration[0] + movie.duration[1]);
        const durationInMin = minutes;
        return {movie, duration: durationInMin};
      }
    });
    
    return timeFormatArr;
  }

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
// function bestYearAvg(moviesArray) {
//     if(moviesArray.length === 0){
//         return null;
//     }
//     const yearArray = [];
//     for (let i = 0; i < moviesArray.length; i++) {
//         if (yearArray.indexOf(moviesArray[i].year) === -1) {
//             yearArray.push(moviesArray[i].year);
//         }
//     }
  
//     let maxScore = 0;
//     let year = "";
  
//     for (let i = 0; i < yearArray.length; i++) {
//         const currentYear = moviesArray.filter((movie) => movie.year === yearArray[i]);
//         const sum = currentYear.reduce((accumulator, movie) => accumulator + movie.score, 0);
//         const avg = Number((sum / currentYear.length).toFixed(2));
//         if (avg > maxScore) {
//             maxScore = avg;
//             year = yearArray[i];
//         }
//         else if(avg === maxScore){
//             if(yearArray[i]<year){
//                 maxScore = avg;
//                 year = yearArray[i]
//         }
//       }
//     }
//     return `The best year was ${year} with an average score of ${maxScore}`;
//   }

function bestYearAvg(moviesArray) {
    if (moviesArray.length==0){return null}
    let years = Array.from(new Set(moviesArray.map(m => m.year)));
    let avgYears = years.map(function(y) {
      let filteredArray= moviesArray.filter(m => m.year == y);
      let yearAvg = {};
      yearAvg['year']=y
      yearAvg['score']=scoresAverage(filteredArray);
      return yearAvg;
      }); 
    let bestYear = avgYears.sort(function(a,b) {
        if(b.score!=a.score){return b.score-a.score} else{return a.year-b.year};})[0];
    return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`
  }