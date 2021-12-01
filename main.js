let connectors = [], nodes = [];
let treeScale, lastFrameTime = new Date().getTime(), startPoint;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    startPoint = vector(width / 10, height / 2);
    treeScale = width / 20;
    nodes.push(startPoint);
    new ElecTree(16, .5, startPoint, treeScale, 8);

    console.log('Setup done');
}

function draw() {
    background('black');

    let newTime = new Date().getTime();
    let deltaTime = newTime - lastFrameTime;
    lastFrameTime = newTime;

    stroke('steelblue');
    strokeWeight(3);
    for (let i = 0; i < connectors.length; i++){
        connectors[i].display();
        connectors[i].t = Math.min(deltaTime / 500 + connectors[i].t, 1);
    }

    strokeWeight(2.5);
    fill(0);
    circle(startPoint.x, startPoint.y, treeScale / 1.8);
}

function vector(x, y) {
    return { x: x, y: y };
}