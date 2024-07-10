const boxes=document.querySelectorAll(".box");
const dynamictext=document.querySelector(".dynamictext");
const botton=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
   currentPlayer="O";
   gameGrid=["","","","","","","","",""];

   boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";
    box.classList=`box box${index+1}`;
   });
   botton.classList.remove("active");
   dynamictext.innerText=`Current Player-${currentPlayer}`;
}
initGame();

function swap(){
    if (currentPlayer=="O"){
      currentPlayer="X";
    }
    else{
        currentPlayer="O";
    }
    dynamictext.innerText=`Current Player- ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winposition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
            && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]
        ){
            if(gameGrid[position[0]]==="O"){
                answer="O";
            }
            else{ 
                answer="X";
            }

            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
             
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        dynamictext.innerText=`Winner Player-${answer}`;
        botton.classList.add("active");
        return;
    }
    // tie condition
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
    });
    
    if(fillcount===9){
        dynamictext.innerText="Game Tied !";
        botton.classList.add("active");
    }
}

function handleclick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap turn
        swap();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index); 
    })
})

botton.addEventListener("click",initGame);