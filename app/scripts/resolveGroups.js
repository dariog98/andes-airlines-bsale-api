const minorsFirst = (a, b) => {
    const aHasMinors = a.find(passenger => passenger.age < 18)
    const bHasMinors = b.find(passenger => passenger.age < 18)

    if (aHasMinors > bHasMinors) {
        return 1
    } else {
        return -1
    }
}

const resolveGroups = (groups, seats, allPassengers) => {
    const occupiedSeats = allPassengers.filter(passenger => passenger.seatId).map(passenger => passenger.seatId)

    const resolved = groups.sort((a, b) => minorsFirst(a,b)).map((group, index) => {
        const passengersWithoutSeat = []
        const passengersWithSeat = []
        const minors = []
        const adults = []

        group.forEach(passenger => {
            if (passenger.seatId) {
                passengersWithSeat.push(passenger)
            } else {
                passengersWithoutSeat.push(passenger)
            }
            if (passenger.age < 18) {
                minors.push(passenger)
            } else {
                adults.push(passenger)
            }
        })
        
        if (minors.length) {
            for (let index = 0; index < minors.length; index++) {
                const freeSeats = Object.values(seats).map(seat => seat.seatId).filter(seatId => !occupiedSeats.includes(seatId) && seats[seatId].seatTypeId === minors[index].seatTypeId)
                const seatsFounded = []

                while (seatsFounded.length < 2) {
                    const currentSeatId = freeSeats.shift()

                    for (let index = 0; index < seats[currentSeatId].neighbors.length; index++) {
                        const neighbor = seats[currentSeatId].neighbors[index]
                        
                        if (neighbor.weight === 2 && !occupiedSeats.includes(neighbor.seatId)) {
                            seatsFounded.push(currentSeatId, neighbor.seatId)
                            break
                        }
                    }
                }
                const minor = minors[index]
                minor.seatId = seatsFounded.shift()
                const adult = adults.shift()
                adult.seatId = seatsFounded.shift()

                passengersWithSeat.push(minor, adult)
                occupiedSeats.push(minor.seatId, adult.seatId)

                const minorIndex = passengersWithoutSeat.findIndex(passenger => passenger.passengerId === minor.passengerId)
                passengersWithoutSeat.splice(minorIndex, 1)
                const adultIndex = passengersWithoutSeat.findIndex(passenger => passenger.passengerId === adult.passengerId)
                passengersWithoutSeat.splice(adultIndex, 1)
            }
        }

        let freeSeats = Object.values(seats).map(seat => seat.seatId).filter(seatId => !occupiedSeats.includes(seatId))

        const discardedSeats = []
        const selectedSeats = []
        const openSets = passengersWithSeat.map(passenger => passenger.seatId)
        const maxSeatGroup = []
        let mode = true

        while(!(selectedSeats.length >= passengersWithoutSeat.length) && !(!mode && (maxSeatGroup.length + selectedSeats.length) >= passengersWithoutSeat.length)) {
            if (openSets.length > 0) {
                const currentSeatId = openSets.shift()

                for (let index = 0; index < seats[currentSeatId].neighbors.length; index++) {
                    const neighbor = seats[currentSeatId].neighbors[index]
                    
                    if (!selectedSeats.includes(neighbor.seatId) && freeSeats.includes(neighbor.seatId)) {
                        selectedSeats.push(neighbor.seatId)
                        openSets.push(neighbor.seatId)
                    }
                }
            } else {
                /* Update max seat together founded */
                if (mode && maxSeatGroup.length < selectedSeats.length) {
                    maxSeatGroup.length = 0
                    maxSeatGroup.push(...selectedSeats)
                }

                discardedSeats.push(...selectedSeats)
                selectedSeats.length = 0

                const seatIndex = freeSeats.findIndex(seatId => !discardedSeats.includes(seatId) && seats[seatId].seatTypeId === passengersWithoutSeat[0].seatTypeId)
                if (seatIndex >= 0) {
                    openSets.push(freeSeats[seatIndex])
                    selectedSeats.push(freeSeats[seatIndex])
                    freeSeats.splice(seatIndex, 1)
                } else {
                    /* Change mode */
                    freeSeats = Object.values(seats).map(seat => seat.seatId).filter(seatId => !occupiedSeats.includes(seatId) && !maxSeatGroup.includes(seatId))
                    discardedSeats.length = 0
                    if (mode) {
                        mode = false
                    } else {
                        /* Forze find seats */
                        const neededSeats = passengersWithoutSeat.length - maxSeatGroup.length
                        for (let i = 0; i < neededSeats; i++) {
                            const index = freeSeats.findIndex(seatId => seats[seatId].seatTypeId === passengersWithoutSeat[0].seatTypeId)
                            selectedSeats.push(freeSeats[index])
                            freeSeats.splice(index, 1)
                        }
                    }
                }
            }
        }

        const totalSeats = mode ? selectedSeats : [...maxSeatGroup, ...selectedSeats]

        passengersWithoutSeat.forEach(passenger => {
            const seatId = totalSeats.shift()
            passenger.seatId = seatId
            passengersWithSeat.push(passenger)
            occupiedSeats.push(seatId)
        })

        return passengersWithSeat
    })

    return resolved
}

export { resolveGroups }