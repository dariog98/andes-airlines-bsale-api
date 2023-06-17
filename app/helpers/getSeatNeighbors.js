const getSeatNeighbors = (seats, seatIndex) => {
    const currentSeat = seats[seatIndex]
    const neighbors = []

    const DOWN = seats.find(seat => seat.seatRow === currentSeat.seatRow && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() - 1))
    if (DOWN) {
        neighbors.push({ seatId: DOWN.seatId, weight: 2 })
    } 
    //else {
    //    const DOWN2 = seats.find(seat => seat.seatRow === currentSeat.seatRow && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() - 2))
    //    if (DOWN2) {
    //        neighbors.push({ seatId: DOWN2.seatId, weight: 1 })
    //    }
    //}

    const UP = seats.find(seat => seat.seatRow === currentSeat.seatRow && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() + 1))
    if (UP) {
        neighbors.push({ seatId: UP.seatId, weight: 2 })
    }
    //else {
    //    const UP2 = seats.find(seat => seat.seatRow === currentSeat.seatRow && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() + 2))
    //    if (UP2) {
    //        neighbors.push({ seatId: UP2.seatId, weight: 1 })
    //    }
    //}
    
    //const LEFTDOWN = seats.find(seat => seat.seatRow === currentSeat.seatRow - 1 && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() - 1))
    //if (LEFTDOWN) {
    //    neighbors.push({ seatId: LEFTDOWN.seatId, weight: 1 })
    //}
    
    const LEFT = seats.find(seat => seat.seatRow === currentSeat.seatRow - 1 && seat.seatColumn === currentSeat.seatColumn)
    if (LEFT) {
        neighbors.push({ seatId: LEFT.seatId, weight: 1 })
    }
    
    //const LEFTUP = seats.find(seat => seat.seatRow === currentSeat.seatRow - 1 && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() + 1))
    //if (LEFTUP) {
    //    neighbors.push({ seatId: LEFTUP.seatId, weight: 1 })
    //}

    //const RIGHTDOWN = seats.find(seat => seat.seatRow === currentSeat.seatRow + 1 && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() - 1))
    //if (RIGHTDOWN) {
    //    neighbors.push({ seatId: RIGHTDOWN.seatId, weight: 1 })
    //}
    
    const RIGHT = seats.find(seat => seat.seatRow === currentSeat.seatRow + 1 && seat.seatColumn === currentSeat.seatColumn)
    if (RIGHT) {
        neighbors.push({ seatId: RIGHT.seatId, weight: 1 })
    }

    //const RIGHTUP = seats.find(seat => seat.seatRow === currentSeat.seatRow + 1 && seat.seatColumn === String.fromCharCode(currentSeat.seatColumn.charCodeAt() + 1))
    //if (RIGHTUP) {
    //    neighbors.push({ seatId: RIGHTUP.seatId, weight: 1 })
    //}

    return neighbors
}

export { getSeatNeighbors }