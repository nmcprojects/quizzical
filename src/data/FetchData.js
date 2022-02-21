export default  function getData(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            let questions = data.results.map(item => {
                return {
                    "question": item.question,
                    "correctAnswer": item.correct_answer,
                    "incorrectAnswers": item.incorrect_answers,
                    "posAnswer": Math.floor(Math.random() * (item.incorrect_answers.length + 1))
                }
            })
            return questions;
        })
        .catch(err => {
            console.log(err)
            return []
        })
}