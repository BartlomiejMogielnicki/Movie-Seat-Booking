const container = document.querySelector('.container');
const movieSelect = document.getElementById('select-movie');
const seats = document.querySelectorAll('.seat');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

let ticketPrice = movieSelect.value;

// Update seats count and total price
updateCountAndTotal = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsNumber = selectedSeats.length;
    count.innerHTML = (selectedSeatsNumber);
    total.innerHTML = selectedSeatsNumber * ticketPrice;
}

// Pick unoccupied seats
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }
    updateCountAndTotal();
})

// Update ticket price after movie change
movieSelect.addEventListener('change', () => {
    ticketPrice = movieSelect.value;
    updateCountAndTotal();
})