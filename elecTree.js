class ElecTree {
    constructor(s1, s2, sp, scale, minForward, s3) {
        if (s1 <= 0)
            return;

        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3 == undefined ? 0 : s3;
        this.sp = sp;
        this.scale = scale;
        this.mf = minForward;

        this.generate();
    }

    generate() {
        let c = 1 / this.s2;

        if (this.mf > 0)
            this.growForward();
        else if (Math.round(Math.random() * c) == 0)
            this.growForward();

        if (Math.round(Math.random() * c) == 0)
            this.growUp();

        if (Math.round(Math.random() * c) == 0)
            this.growDown();
    }

    growUp() {
        this.grow(vector(this.sp.x + this.scale, this.sp.y + this.scale / 1.2));
    }

    growDown() {
        this.grow(vector(this.sp.x + this.scale, this.sp.y - this.scale / 1.2));
    }

    growForward() {
        this.grow(vector(this.sp.x + this.scale, this.sp.y), this.mf - 1);
    }

    grow(newP, mf) {
        if (!nodes.find(val => val.x == newP.x && val.y == newP.y)) {
            connectors.push(new Connector(this.sp, newP, this.s3));
            new ElecTree(this.s1 - 1, this.s2, newP, this.scale,
                mf == undefined ? Math.round(Math.random() * 5) : mf,
                this.s3 - 1);
            nodes.push(newP);
        }
    }
}

class Connector {
    constructor(p1, p2, t) {
        this.p1 = p1;
        this.p2 = p2;
        this.t = t;
    }

    display() {
        if (this.t <= 0)
            return;

        let t = Math.max(this.t, 0);
        let p = vector((this.p2.x - this.p1.x) * t + this.p1.x, (this.p2.y - this.p1.y) * t + this.p1.y)
        line(this.p1.x, this.p1.y, p.x, p.y);
    }
}