import React from "react";

/*
 * @Author: your name
 * @Date: 2020-03-17 16:49:06
 * @LastEditTime: 2020-03-17 16:50:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/bubble.ts
 */

const Fizz: React.FC = () => {
  const fizzp = () => {
    const Bubble = (function() {
      class Bubble {
        r: number;
        static MAX_V: number;
        rising: any;
        static MAX_R: number;
        static GROWTH_RATE: number;
        createdAt: any;
        x: any;
        y: any;
        startedRisingAt: any;
        constructor(x: any, y: any, r: any, createdAt: any) {
          this.x = x;
          this.y = y;
          this.r = r;
          this.createdAt = createdAt;
        }

        velocity() {
          return (this.r / 20) * Bubble.MAX_V;
        }

        grow(now: number) {
          if (!this.rising && this.r <= Bubble.MAX_R) {
            return (this.r += Bubble.GROWTH_RATE * (now - this.createdAt));
          }
        }

        move(now: number) {
          if (this.rising) {
            return (this.y -= (now - this.startedRisingAt) * this.velocity());
          }
        }

        rise() {
          if (!this.rising && this.r > 2) {
            this.rising = Math.random() < 0.15 * (this.r / Bubble.MAX_R);
            if (this.rising) {
              return (this.startedRisingAt = new Date().getTime());
            }
          }
        }
      }

      Bubble.MAX_R = 20;

      Bubble.MAX_V = 0.02;

      Bubble.GROWTH_RATE = 0.00005;

      return Bubble;
    })();

    const RisingBubbles = (function() {
      var rand: {
          (arg0: number, arg1: number): any;
          (min: any, max: any): number;
        },
        randInt: {
          (arg0: number, arg1: number): any;
          (min: any, max: any): number;
        };

      class RisingBubbles {
        maxBubbles: number;
        canvas: HTMLElement | any;
        ctx: any;
        bubbles: any;
        lastFrame: number;
        constructor(id: string, maxBubbles: number) {
          var elem, i, j, ref;
          this.maxBubbles = maxBubbles;
          this.canvas = document.getElementById(id);
          elem = document.getElementById(id);
          this.canvas.width = this.canvas.clientWidth;
          this.canvas.height = this.canvas.clientHeight;
          this.ctx = this.canvas.getContext("2d");
          this.ctx.fillStyle = "#FFFFFF";
          this.bubbles = [];
          this.lastFrame = new Date().getTime();
          for (
            i = j = 1, ref = randInt(0, this.maxBubbles);
            1 <= ref ? j <= ref : j >= ref;
            i = 1 <= ref ? ++j : --j
          ) {
            this.bubbles.push(
              new Bubble(
                randInt(0, this.canvas.width),
                randInt(0, this.canvas.height),
                rand(0, Bubble.MAX_R),
                new Date().getTime()
              )
            );
          }
        }

        draw() {
          return this.run(new Date().getTime());
        }

        run(now: number): any {
          var bubble, j, len, ref;
          this.update(now);
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          ref = this.bubbles;
          for (j = 0, len = ref.length; j < len; j++) {
            bubble = ref[j];
            this.ctx.moveTo(bubble.x, bubble.y);
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
            this.ctx.fill();
          }
          return requestAnimationFrame(() => {
            return this.run(new Date().getTime());
          });
        }

        update(now: number) {
          var b, i, j, k, len, ref, ref1, results;
          ref = this.bubbles;
          for (j = 0, len = ref.length; j < len; j++) {
            b = ref[j];
            b.grow(now);
            b.rise();
            b.move(now);
          }
          this.bubbles = (() => {
            var k, len1, ref1, results;
            ref1 = this.bubbles;
            results = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              b = ref1[k];
              if (b.y + b.r >= 0) {
                results.push(b);
              }
            }
            return results;
          })();
          if (this.maxBubbles - this.bubbles.length > 0) {
            results = [];
            for (
              i = k = 1,
                ref1 = randInt(0, this.maxBubbles - this.bubbles.length);
              1 <= ref1 ? k <= ref1 : k >= ref1;
              i = 1 <= ref1 ? ++k : --k
            ) {
              results.push(
                this.bubbles.push(
                  new Bubble(
                    randInt(0, this.canvas.width),
                    randInt(0, this.canvas.height),
                    1,
                    new Date().getTime()
                  )
                )
              );
            }
            return results;
          }
        }
      }

      randInt = function(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
      };

      rand = function(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
      };

      return RisingBubbles;
    })();

    let fizz: any;
    fizz = new RisingBubbles("fizz", 10);
    return fizz;
  };

  fizzp().draw();
  return <canvas id="fizz"></canvas>;
};

export default Fizz;
