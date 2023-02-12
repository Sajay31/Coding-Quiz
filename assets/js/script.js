let qI = 0;
let clockId;
let time = 60;
const start = document.getElementById('start');
const clock = document.getElementById('clock');
const main = document.getElementById('main');
const statusDiv = document.getElementById('status');
let store = localStorage.highscores ? eval(localStorage.highscores) : [];

const runClock = () => {
    if(time<1){
        time = 1;
        clearInterval(clockId);
        done();
    }

    time--;
    clock.innerText = time;

};

const handleAns = function(choice) {


    if(choice == questions[qI].C) {
        statusDiv.innerHTML = '<h1 style="color:green;border-bottom:2px solid green;">Correct!!!</h1>';

        
       
    } 

    else{
        statusDiv.innerHTML = '<h1 style="color:red;border-bottom:2px solid red;">Incorrect!!!</h1>';
        time -= 10;
    }
    
    setTimeout(()=>statusDiv.innerHTML='',1000);
    qI++;
    handleQA();
}

const handleQA = () => {

    if(qI==questions.length) return done();

    let {Q,A} = questions[qI];
    main.innerHTML = `<h1>${Q}</h1><div id='answers'></div>`;

    A.forEach(ans => {
        document.getElementById('answers').innerHTML+= `<button onclick="handleAns('${ans}')">${ans}</button>`;
    });
};

const subFx = () => {
    let initals = document.getElementById('initials').value;
    store.push({initials:initals,score:Math.floor(time*60/100)});
    localStorage.highScore = JSON.stringify(store);
    main.innerHTML=`<h1>Highscores</h1>
    <ul></ul>
    <button>Go Back</button>`;

    store.forEach(player => {
        console.log(player);
        document.querySelector('ul').innerHTML+=`<li>${player.initials}: ${player.score}</li>`
    });
}


const done = () => {
    main.innerHTML=`<h1>All Done!!!</h1>
    <h4>Your final score: ${Math.floor(time*60/100)} </h4>
    <h4>Initials: <input id="initials"></h4>
    <button onclick="subFx()">submit</button>`
};

const highScore = () => {
   
}

start.onclick = () => {

    clearInterval(clockId);
    clockId = setInterval(runClock,1000);    
    
    
    handleQA();
}