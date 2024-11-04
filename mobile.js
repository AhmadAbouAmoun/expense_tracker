function updatePlaceholder() {
    const noteI = document.querySelector('#income-note');
    const amountI = document.querySelector('#income-amount');
    const noteE = document.querySelector('#expenses-note');
    const amountE = document.querySelector('#expenses-amount');
    if (window.innerWidth < 600) {
        noteI.placeholder = "Note"; 
        amountI.placeholder = "Amount"; 
        noteE.placeholder = "Note"; 
        amountE.placeholder = "Amount"
    } else {
        noteI.placeholder = ""; 
        noteE.placeholder = ""; 
        amountI.placeholder = ""; 
        amountE.placeholder = ""; 
    }
}


updatePlaceholder();


window.addEventListener('resize', updatePlaceholder);