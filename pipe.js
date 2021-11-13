const HOLE_HEIGHT = 200
const PIPE_WIDTH = 50
const PIPE_INTERVAL = 3000
const PIPE_SPEED = .15

let pipes = []
let timeSinceLastPipe
let countPassedPipes

export function setupPipes() {
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    countPassedPipes = 0
}

export function updatePipes(delta) {
    // create a pipe every interval
    timeSinceLastPipe += delta;
    if (timeSinceLastPipe > PIPE_INTERVAL) {
        timeSinceLastPipe -= PIPE_INTERVAL
        createPipe()
    }
    // move the pipes
    pipes.forEach( pipe => {
        if (pipe.left + PIPE_WIDTH < 0) {
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

function createPipe() {
    const pipeElem = document.createElement("div")
    const topSegment = createSegment("top")
    const bottomSegment = createSegment("bottom")
    pipeElem.append(topSegment)
    pipeElem.append(bottomSegment)
    pipeElem.classList.add("pipe")

    pipeElem.style.setProperty("--hole-top", randomNumberBetween(
        HOLE_HEIGHT * 1.5,
        window.innerHeight - HOLE_HEIGHT * 0.5)
    )
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        },
        set left(value) {
            pipeElem.style.setProperty("--pipe-left", value)
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe)
            countPassedPipes++
            pipeElem.remove()
        },
        rects() {
            return [
                topSegment.getBoundingClientRect(),
                bottomSegment.getBoundingClientRect()
            ]
        }
    }
    // create on the far right side of the screen ...
    pipe.left = window.innerWidth
    document.body.append(pipeElem)
    // place a new pipe in a array that we're using
    pipes.push(pipe)
}

export function getPassedPipesCount() {
    return countPassedPipes
}

export function getPipeRects() {
    // flatMap takes array of array and make it to single array ...
    return pipes.flatMap(pipe => pipe.rects())
}

function createSegment(position) {
    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min)
}