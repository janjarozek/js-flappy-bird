const birdElem = document.querySelector("[data-bird]")
const JUMP_DURATION = 125
const BIRD_SPEED = .2
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupBird() {
    // birdElem.style.setProperty("--bird-top", 0)
    setBirdTop(window.innerHeight / 2)
    // first remove the listener not to add too much of the eventlistners ...
    document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)
}

export function updateBird( delta ) {
    // multiply by delta to make if frame consistent in time
    // otherwise speed would be always BIRD_SPEED in different frame loop time
    if (timeSinceLastJump < JUMP_DURATION) {
        setBirdTop(getBirdTop() - BIRD_SPEED * delta)
    } else {
        setBirdTop(getBirdTop() + BIRD_SPEED * delta)
    }
    timeSinceLastJump += delta
    console.log(getBirdTop())
}

export function getBirdRect() {
    return birdElem.getBoundingClientRect()
}

function setBirdTop(top) {
    birdElem.style.setProperty("--bird-top", top)
}

function getBirdTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

function handleJump(e) {
    if (e.code !== 'Space') return
    timeSinceLastJump = 0
}