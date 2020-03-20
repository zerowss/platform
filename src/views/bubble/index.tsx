import React, { useEffect } from "react";
import './index.less';
/*
 * @Author: your name
 * @Date: 2020-03-17 16:49:06
 * @LastEditTime: 2020-03-18 16:21:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/bubble.ts
 */

const COLOR = "#666979";
const R = 10;
const H = 2;
const g = -0.03; //重力

let canvas: any, ctx: any, width: number, height: number, bubbles: Bubble[];
interface Pos {
  x: number;
  y: number;
  alpha: number;
  alphaChange: number;
  scale: number;
  scaleChange: number;
  speed: number;
}

class Bubble {
  pos!: Pos;
  type!: number;
  constructor(type: number) {
    this.type = type;
    this.init();
  }
  init() {
    this.pos = {
      x: Math.random() * width,
      y: height/2 + Math.random() * 400,
      alpha: 0.8 + Math.random() * 0.3,
      alphaChange: 0.002 + Math.random() * 0.0005,
      scale: 0.2 + Math.random() * 0.5,
      scaleChange: Math.random() * 0.002,
      speed: 0.6 + Math.random() * 0.8
    };
  }
  draw() {
    const { alphaChange, scaleChange, speed } = this.pos;
    if (this.pos.alpha <= 0) {
      this.init();
    }
    this.pos.y -= speed;
    this.pos.alpha -= alphaChange;
    this.pos.scale += scaleChange;
    switch (this.type) {
      case 0:
        this.drawCircle();
        break;
      case 1:
        this.drawRing();
        break;
      default:
        this.drawRect();
        break;
    }
  }
  drawCircle() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.pos.scale * R, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(102,105,121," + this.pos.alpha + ")";
    ctx.fill();
    ctx.restore();
  }
  drawRing() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      this.pos.x,
      this.pos.y,
      this.pos.scale * R * 0.8,
      0,
      Math.PI * 2,
      true
    );
    ctx.arc(this.pos.x, this.pos.y, this.pos.scale * R, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(102,105,121," + this.pos.alpha + ")";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  drawRect() {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos.x - R / 2, this.pos.y - H / 2, R, H);
    ctx.rect(this.pos.x - H / 2, this.pos.y - R / 2, H, R);
    ctx.fillStyle = "rgba(102,105,121," + this.pos.alpha + ")";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

const initHeader = () => {
  canvas = document.getElementById("fizz");
  windowResize();
  ctx = canvas.getContext("2d");
  //建立泡泡
  bubbles = [];
  const num = 20; //气泡数量
  for (let i = 0; i < num; i++) {
    const c = new Bubble(i % 3);
    bubbles.push(c);
  }
  animate();
};

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (const i in bubbles) {
    bubbles[i].draw();
  }
  window.requestAnimationFrame(() => {
    animate();
  });
}

function windowResize() {
  width = window.innerWidth;
  height = window.innerHeight - 200;
  canvas.width = width;
  canvas.height = height;
}

window.onresize = function() {
  windowResize();
};

const Fizz: React.FC = () => {
  useEffect(() => {
    initHeader();
  }, []);
  return <canvas id="fizz" />;
};

export default Fizz;
