const carCanvas=document.getElementById("carCanvas");
carCanvas.width= window.innerWidth - 330;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;
const miniMapCanvas=document.getElementById("miniMapCanvas");
miniMapCanvas.width=300;
miniMapCanvas.height=300;
let manual = false;

carCanvas.height=window.innerHeight;
networkCanvas.height=window.innerHeight - 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const worldString = localStorage.getItem("world");
const worldInfo = worldString ? JSON.parse(worldString) : null;
const world = worldInfo ? World.load(worldInfo) : new World(new Graph());
const graph = world.graph;



const viewport = new Viewport(carCanvas);
const miniMap = new MiniMap(miniMapCanvas, world.graph, 300);



let N=100;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

const traffic=[];
const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2]);

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(myCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}


function generateCars(N){
    const startPoints = world.markings.filter((m) => m instanceof Start);
    const startPoint = startPoints.length > 0 ? startPoints[0].center : new Point(100,100);
    const dir = startPoints.length > 0 ? startPoints[0].directionVector : new Point(100,100);
    const startAngle = -angle(dir) + Math.PI / 2;

    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(startPoint.x,startPoint.y,30,50,"AI", startAngle, 4.6));
    }
    //     document.getElementById('keys').addEventListener('click', function(){
    //         if(manual){
    //             cars.push(new Car(startPoint.x,startPoint.y,30,50,"KEYS", startAngle));
    //             this.textContent = '🎮';
    //             window.location.reload;
    //         }
    //         else{
    //             // N = 100;
    //             cars.push(new Car(startPoint.x,startPoint.y,30,50,"AI", startAngle));
    //             this.textContent = '🖥️';
    //             window.location.reload;

    //         }

    //         manual = !manual;
    //     })
    // }
    // document.getElementById('keys').addEventListener('click', function(){
    //     if(manual){
    //         cars.push(new Car(startPoint.x,startPoint.y,30,50,"KEYS", startAngle));
    //         this.textContent = '🎮';
    //     }
    //     else{
    //         N = 100;
    //         for(let i=1;i<=N;i++){
    //             cars.push(new Car(startPoint.x,startPoint.y,30,50,"AI", startAngle));
    //         }
    //         this.textContent = '🖥️';
    //     }
    //     manual = !manual;
    // });
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(roadBorders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(roadBorders,traffic);
    }
    myCar=cars.find(
        c=>c.fitness==Math.max(
            ...cars.map(c=>c.fitness)
        ));

    world.cars = cars;
    world.bestCar = myCar;

    // let userView = true;

    // document.getElementById("viewportangle").addEventListener('click', () => {
    //     userView = !userView;
    // });

    viewport.angle = myCar.angle;
    viewport.offset.x = -myCar.x;
    viewport.offset.y = -myCar.y;

    viewport.render();
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(carCtx, viewPoint, false);
    miniMap.angle = myCar.angle;
    miniMap.update(viewPoint);

    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }

    networkCtx.lineDashOffset=-time/50;
    networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    Visualizer.drawNetwork(networkCtx,myCar.brain);
    requestAnimationFrame(animate);
}