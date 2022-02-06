const loadBtn = document.querySelector('.button')
const pizzaWrapper = document.querySelector('.pizza-wrapper')
const pizza = document.querySelector('.pizza')
const guests = document.querySelector('.guests')
const loadingText = document.querySelector('.loading-text')


loadBtn.addEventListener('click', () =>{ 
    loadingText.classList.toggle('loading-text--active')
    loadBtn.classList.toggle('loading')
    
    getGuests().then(data => {
        loadingText.classList.toggle('loading-text--active')
        loadBtn.classList.toggle('loading')
        
        let allGuests = 0
        let eatPizza = 0
        pizza.innerHTML = ''
        pizzaWrapper.classList.add('pizza-wrapper--active')
        allGuests = data.party.length

        data.party.forEach(item => item.eatsPizza == true ? eatPizza++ : null)
        let sliсeStep = 360/eatPizza;
        
            for(let i = 0; i < eatPizza/2; i++){ 
            let div = document.createElement('div')
            div.classList.add('sliсe-line')
            pizza.appendChild(div)
            div.style.transform = `rotate(${sliсeStep * i}deg)`  
        }
        guests.innerHTML = `
            <p class="guests__all">Всего гостей: ${allGuests}</p>
            <p class="guesta__eat">Пиццу едят: ${eatPizza}</p>
            `
    })    
})
    


async function getGuests () {    
    const url = 'https://gp-js-test.herokuapp.com/pizza';
    const response = await fetch(url)
    const data = await response.json()
    return data
}
