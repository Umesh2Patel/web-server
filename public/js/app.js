console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageO = document.querySelector('#message-0')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const myLocation = document.querySelector('#my-location')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    

    const location = search.value
    

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        latitude = position.coords.latitude
        longitude = position.coords.longitude
    })
    messageO.textContent = ''
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

myLocation.addEventListener('click', (e) => {
    e.preventDefault()

    messageO.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/weather?lat=' + position.coords.latitude + '&log=' + position.coords.longitude).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        messageO.textContent = data.error
                    } else {
                        messageO.textContent = data.location
                        messageTwo.textContent = data.forecast
                    }
                })
            })
    })

    

})
