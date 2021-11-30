/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 15:30:35
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 10:34:47
 */
import { ref, onMounted } from 'vue'

export const drawCanvas = () => {
  const canvas = ref<HTMLCanvasElement>()
  onMounted(() => {
    const canvasDom = canvas.value!
    canvasDom.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    canvasDom.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D
    let canvasBg = new starCanvas(canvasDom.width, canvasDom.height, ctx)
    canvasBg.init()

		canvasDom.onmousemove = function(e){
      canvasBg.update(e)
		}
  })
  return { canvas }
}

const dotsMinDist: number = 2,
  initStarsPopulation: number = 80,
  params = {
    maxDistFromCursor: 50,
    dotsSpeed: 0,
    backgroundSpeed: 0,
  },
  starColor = '33,150,243',
  dotColor = '157,205,244'
let mouseMoveChecker : any;

class starCanvas {
  width: number
  height: number
  ctx: any
  stars: Array<any>
  dots: Array<any>
  mouseMoving: boolean
  mouseX: number
  mouseY: number
  constructor(width: number, height: number, ctx: any) {
    this.width = width
    this.height = height
    this.ctx = ctx
    this.stars = []
    this.dots = []
    this.mouseMoving = false
    this.mouseX = 0
    this.mouseY = 0
  }

  init() {
    this.ctx.strokeStyle = `rgb(${dotColor})`
    this.ctx.shadowColor = `rgb(${dotColor})`
    for (var i = 0; i < initStarsPopulation; i++) {
      this.stars[i] = new Star(
        {
          id: i,
          x: Math.floor(Math.random() * this.width),
          y: Math.floor(Math.random() * this.height),
        },
        { ctx: this.ctx, height: this.height }
      )
      //stars[i].draw();
    }
    this.ctx.shadowBlur = 0
    this.animate()
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height)

    for (let i in this.stars) {
      this.stars[i].move()
    }
    for (let i in this.dots) {
      this.dots[i].move()
    }
    this.drawIfMouseMoving()
    requestAnimationFrame(() => {
			this.animate()
		})
  }

  drawIfMouseMoving() {
    if (!this.mouseMoving) return

    if (this.dots.length == 0) {
      this.dots[0] = new Dot(
        { id: 0, x: this.mouseX, y: this.mouseY },
        { ctx: this.ctx, dots: this.dots }
      )
      this.dots[0].draw()
      return
    }

    let previousDot = getPreviousDot(this.dots.length, 1, this.dots)
    let prevX = previousDot.x
    let prevY = previousDot.y

    let diffX = Math.abs(prevX - this.mouseX)
    let diffY = Math.abs(prevY - this.mouseY)

    if (diffX < dotsMinDist || diffY < dotsMinDist) return

    let xVariation = Math.random() > 0.5 ? -1 : 1
    xVariation =
      xVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1
    let yVariation = Math.random() > 0.5 ? -1 : 1
    yVariation =
      yVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1
    this.dots[this.dots.length] = new Dot(
      {
        id: this.dots.length,
        x: this.mouseX + xVariation,
        y: this.mouseY + yVariation,
      },
      { ctx: this.ctx, dots: this.dots }
    )
    this.dots[this.dots.length - 1].draw()
    this.dots[this.dots.length - 1].link()
  }

	update(e : any) {
    this.mouseMoving = true;
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		clearInterval(mouseMoveChecker);
		mouseMoveChecker = setTimeout(() => {
      this.mouseMoving = false;
    }, 100);
	}
}


class Star {
  id: number
  x: number
  y: number
  r: number
  color: string
  ctx: any
  height: number

  constructor(
    star: { id: number; x: number; y: number },
    canvas: { ctx: any; height: number }
  ) {
    this.id = star.id
    this.x = star.x
    this.y = star.y
    this.r = Math.floor(Math.random() * 2) + 1
    let alpha = (Math.floor(Math.random() * 10) + 1) / 10
    this.color = `rgba(${starColor},${alpha})`

    this.ctx = canvas.ctx
    this.height = canvas.height
  }

  draw(): void {
    this.ctx.fillStyle = this.color
    this.ctx.shadowBlur = this.r * 2
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.fill()
  }

  move(): void {
    this.y -= 0.15 + params.backgroundSpeed / 100
    if (this.y <= -10) this.y = this.height + 10
    this.draw()
  }
}

function getPreviousDot(id: number, stepback: number, dots: any) {
  if (id == 0 || id - stepback < 0) return false
  if (typeof dots[id - stepback] != 'undefined') return dots[id - stepback]
  else return false //getPreviousDot(id - stepback);
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180)
}

class Dot {
  id: number
  x: number
  y: number
  r: number
  maxLinks: number
  speed: number
  a: number
  aReduction: number
  color: string
  linkColor: string
  dir: number
  ctx: any
  dots: Array<any>

  constructor(
    dot: { id: number; x: number; y: number },
    canvas: { ctx: any; dots: Array<any> }
  ) {
    this.id = dot.id
    this.x = dot.x
    this.y = dot.y
    this.r = Math.floor(Math.random() * 5) + 1
    this.maxLinks = 2
    this.speed = 0.5
    this.a = 0.5
    this.aReduction = 0.005
    this.color = `rgba(${dotColor},${this.a})`
    this.linkColor = `rgba(${dotColor},${this.a / 4})`

    this.dir = Math.floor(Math.random() * 140) + 200

    this.ctx = canvas.ctx
    this.dots = canvas.dots
  }

  draw(): void {
    this.ctx.fillStyle = this.color
    this.ctx.shadowBlur = this.r * 2
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.fill()
  }

  link(): void {
    if (this.id == 0) return
    let previousDot1 = getPreviousDot(this.id, 1, this.dots)
    let previousDot2 = getPreviousDot(this.id, 2, this.dots)
    let previousDot3 = getPreviousDot(this.id, 3, this.dots)
    if (!previousDot1) return
    this.ctx.strokeStyle = this.linkColor
    this.ctx.moveTo(previousDot1.x, previousDot1.y)
    this.ctx.beginPath()
    this.ctx.lineTo(this.x, this.y)
    if (previousDot2 != false) this.ctx.lineTo(previousDot2.x, previousDot2.y)
    if (previousDot3 != false) this.ctx.lineTo(previousDot3.x, previousDot3.y)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  move(): void {
    this.a -= this.aReduction
    if (this.a <= 0) {
      this.die()
      return
    }
    this.color = `rgba(${dotColor},${this.a})`
    this.linkColor = `rgba(${dotColor},${this.a / 4})`
    ;(this.x =
      this.x +
      Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100)),
      (this.y =
        this.y +
        Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100))

    this.draw()
    this.link()
  }

  die(): void {
    this.dots[this.id] = null
    delete this.dots[this.id]
  }
}
