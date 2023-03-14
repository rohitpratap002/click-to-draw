window.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    const particleArray = [];
    let hsl = 0;
    let clicked= false;
    window.addEventListener('resize',()=>{
        canvas.height=window.innerHeight;
        canvas.width=window.innerWidth;
    });
    const mouse = {
        x:undefined,
        y:undefined
    }

    class particle{
        constructor(){
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random()*5 +10;
            this.speedX = Math.random()*3 - 1.5;
            this.speedY = Math.random()*3 - 1.5;
            this.color= "hsl("+hsl+", 100%, 50%)";
        }
        update(){
            this.x += this.speedX
            this.y += this.speedY
            if(this.size >0.4){
                this.size -= 0.1;
            }
        }
        drawGole(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x , this.y, this.size, 0, Math.PI*2)
            ctx.fill();
        }
    }

    canvas.addEventListener('mousemove',(e)=>{
        if(clicked){
            mouse.x= e.clientX;
            mouse.y= e.clientY;
            for(let i = 0; i < 10; i++){
                particleArray.push(new particle());
            }
        }
    })
    const start = (e)=>{
        mouse.x= e.touches[0].clientX;
        mouse.y= e.touches[0].clientY;
        for(let i = 0; i < 10; i++){
            particleArray.push(new particle());
        }
    }
    canvas.ontouchmove = start;
  

    canvas.addEventListener('mousedown',()=>{
        clicked=true;
    })

    canvas.addEventListener('mouseup',()=>{
        clicked= false;
    })

    const handleParticle = () => {
        for(let i=0;i< particleArray.length;i++){
            particleArray[i].update();
            particleArray[i].drawGole();
            if(particleArray[i].size< 0.3){
                particleArray.splice(i, 1);
                i--;
            }
        }
    }

    const animate = () =>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        handleParticle();
        hsl++;
        requestAnimationFrame(animate);
    }
    
    animate();
});