const container = document.querySelector('.container');
const movieSelect = document.getElementById('select-movie');
const seats = document.querySelectorAll('.row .seat');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

let ticketPrice = movieSelect.value;

// Get data from localStorage
updateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
updateUI();

// Save selected movie and price data to localStorage
setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update seats count and total price
updateCountAndTotal = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsNumber = selectedSeats.length;
    count.innerHTML = (selectedSeatsNumber);
    total.innerHTML = selectedSeatsNumber * ticketPrice;

    // Save data to localStorage
    // Change nodeList to array and find indexes of selected seats
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // Save indexes to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
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
    setMovieData(movieSelect.selectedIndex, movieSelect.value);
    updateCountAndTotal();
});

// Initial count and total set
updateCountAndTotal();