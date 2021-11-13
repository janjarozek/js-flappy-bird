import { updateBird, setupBird, getBirdRect } from "./bird.js"
import { setupPipes, updatePipes, getPassedPipesCount, getPipeRects } from "./pipe.js"

document.addEventListener("keypress", handleStart, {once: true});
// select element by query selector and data-id
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(eventTimeFromRequest) {
    console.log(eventTimeFromRequest)
    // we need to skip first loop
    if (lastTime == null) {
        lastTime = eventTimeFromRequest
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = eventTimeFromRequest - lastTime
    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = eventTimeFromRequest
    // instead of setInterval window.requestAnimationFrame is more accurate and performant
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdPosition = getBirdRect()
    const insidePipe = getPipeRects().some( wall => isCollision(wall, birdPosition))

    // when the element if above the window screen it's top value is negative ...
    const birdAtTheTop = birdPosition.top < 0
    const birdAtTheBottom = birdPosition.bottom > window.innerHeight
    return (birdAtTheTop || birdAtTheBottom || insidePipe)
}

function isCollision(wall, ball) {
    return (
        ball.left < wall.right &&
        ball.top < wall.bottom &&
        ball.right > wall.left &&
        ball.bottom > wall.top
    )
}

// start the game
function handleStart() {
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

// when you lose the game
function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipesCount()} pipes`
        document.addEventListener("keypress", handleStart, {once: true});
    }, 100);
}