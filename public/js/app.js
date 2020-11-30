console.log('Client side javascript called.');
 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = search.value;
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {

        response.json().then((data)=> {
    
            
            if(data.error) {
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                console.log(data.forecast);
            }
    
    
        })
    
    });
    console.log('Testing');

});