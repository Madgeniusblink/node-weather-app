const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchData = (location) => {
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (location) {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
    } 

    fetchData(location)


})