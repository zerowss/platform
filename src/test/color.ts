interface NumberArray {
    [index: number]: number;
}
export class color {
    /**
     * r通道
     */
    r: number;
    /**
     * g通道
     */
    g: number;
    /**
     * b通道
     */
    b: number;
    /**
     * a通道
     */
    a: number;
    /**
     * 红色
     */
    static readonly Red: color = new color(1, 0, 0, 1);

    constructor(r: number = 1, g: number, b: number = 1, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * 复制 color
     * @param from clone from
     * @returns 返回 new instanced Color
     */
    public static clone(from: color): color {
        let item = new color(from.r, from.g, from.b, from.a);
        return item;
    }

    /**
     * Copy the values from one color to another
     *
     * @param out the receiving vector
     * @param a the source vector
     * @returns out
     */
    public static copy(a: color, out: color): color {
        out.r = a.r;
        out.g = a.g;
        out.b = a.b;
        out.a = a.a;
        return out;
    }
}
