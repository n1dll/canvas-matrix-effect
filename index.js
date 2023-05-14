const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, 'red')
gradient.addColorStop(0.2, 'yellow')
gradient.addColorStop(0.4, 'blue')
gradient.addColorStop(0.6, 'cyan')
gradient.addColorStop(0.8, 'magenta')
gradient.addColorStop(1, 'aliceblue')

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.text = ''
        this.canvasHeight = canvasHeight
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
            this.y = 0
        } else {
            this.y += 1
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontSize = 10
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
        }
    }

    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }
}

const effect = new Effect(canvas.width, canvas.height)
let lastTime = 0
const fps = 60
const nextFrame = 1000 / fps
let timer = 0

function animate(timeStamp) {
    const detltaTime = timeStamp - lastTime
    lastTime = timeStamp
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = gradient //'#0aff0a'
        ctx.font = effect.fontSize + 'px monospace'
        ctx.textAlign = 'center'
        effect.symbols.forEach(symbol => symbol.draw(ctx))
        timer = 0
    } else {
        timer += detltaTime
    }


    requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    effect.resize(canvas.width, canvas.height)
})

animate(0)

const curry = fn => {
    return curried = (...args) => {
        console.log(args.callee);
        if (fn.length !== args.length) {
            return curried.bind(null, ...args)
        }
        return fn(...args)
    }
}

const add = (x, y, z) => x + y + z

const curriedAdd = curry(add)

console.log(curriedAdd(2)(2)(1));



