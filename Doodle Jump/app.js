document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = '50';
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    const platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatformBottom) { 
            this.bottom = newPlatformBottom;
            this.left = Math.random() * (400 - 85);
            this.visual = document.createElement('div');
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for(let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        // Moves platform only when player reaches certain height
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        upTimerId = setInterval(function (){
           doodlerBottomSpace += 20;
           doodler.style.bottom = doodlerBottomSpace + 'px'; 
           if (doodlerBottomSpace > 350) {
               // Player falls after reaching specific height
               fall();
           }
        }, 30) 
    }

    function fall() {
        clearInterval(upTimerId);
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
        }, 30)
    }

    function gameOver() {
        console.log('Game Over');
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function control(e) {
        if (e.key == "ArrowLeft") {
            //move left
        } else if (e.key == "ArrowRight") {
            //move right
        } else if (e.key == "ArrowUp") {
            //move straight
        }
    }

    function start() {
        if(!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump();
        }
    }
    //create button
    start();
})