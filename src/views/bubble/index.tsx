import React from "react";

/*
 * @Author: your name
 * @Date: 2020-03-17 16:49:06
 * @LastEditTime: 2020-03-18 08:35:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/bubble.ts
 */

function animateCanvas() {
  const canvas:any = document.getElementById("fizz");
  console.log(canvas);
  const c:any = canvas.getContext("2d");

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  document.documentElement.style.overflow = "hidden";

  // Declarations --------------------
  const mouse = {
    x: 0,
    y: 0
  };
  // Utilities ----------------------

  function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // Bubbles -------------------------
  class Bubbles {
    x: number;
    y: number;
    radius: number;
    color: { bg: string; };
    velocity: { x: number; y: number; };
    opacity: number;
    draw: any;
    update: any;
    constructor(x:number, y:number, radius:number, color:string) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = {
        bg: color || "red"
      };
      //速度
      this.velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: Math.random() * 2
      };
      this.opacity = 1;
    }
  }
  Bubbles.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color.bg;
    c.fill();
    c.closePath();
  };
  Bubbles.prototype.update = function() {
    this.y -= this.velocity.y;
    this.draw();
  };
  
  addEventListener("resize", function() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    init();
  });
  
  init();
}
setTimeout(() => {
  // animateCanvas();
}, 1000);

const Fizz: React.FC = () => {
  return <canvas id="fizz"></canvas>;
};

export default Fizz;
