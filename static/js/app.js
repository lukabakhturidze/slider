const wrapper = document.querySelector(".wrapper");
const buttons = document.querySelectorAll(".buttons-wrapper button");
let isDragging = false;
let startX = 0;
let dragDistance = 0;
let currentDragDistance = 0;
let isOver = false;
let scrollLine = wrapper.scrollWidth - wrapper.clientWidth;

let buttonHoldChecker = false;
let isOverButton = false;
let directionChecker = false;

buttons.forEach((button, index) => {
    button.addEventListener('mousedown', () => {
        buttonHoldChecker = true;
        isOverButton = true;
        if(index == 0){
            directionChecker = false;
            console.log(directionChecker);
        }
        else if(index == 1){
            directionChecker = true;
            console.log(directionChecker);
        }
    })
    button.addEventListener('mouseup', () => {
        buttonHoldChecker = false;
    })
    button.addEventListener('mouseleave', () => {
        isOverButton = false;
    })
})

setInterval(function() {
    if(buttonHoldChecker == true && isOverButton == true & dragDistance >= 0 & dragDistance <= scrollLine){
        if(directionChecker == false){
            dragDistance -= 5;
        }
        else if(directionChecker == true){
            dragDistance += 5;
        }
        wrapper.scrollLeft = dragDistance;
    }
    else if(dragDistance < 0){
        dragDistance = 0;
    }
    else if(dragDistance > scrollLine){
        dragDistance = scrollLine;
    }
}, 5)




wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
})
wrapper.addEventListener('mouseenter', (e) => {
    isOver = true;
})
wrapper.addEventListener('mousemove', (e) => {
    if(isDragging & isOver){
        currentDragDistance = (startX - e.clientX)
        if((dragDistance + currentDragDistance) >= 0 && (dragDistance + currentDragDistance) <= scrollLine){
            wrapper.scrollLeft = dragDistance + currentDragDistance
        }
        else if((dragDistance + currentDragDistance) < 0){
            dragDistance = 0;
            currentDragDistance = 0;
            startX = e.clientX;
        }
        else if((dragDistance + currentDragDistance) > scrollLine){
            dragDistance = scrollLine;
            currentDragDistance = 0;
            startX = e.clientX;
        }

    }
})
wrapper.addEventListener('mouseleave', (e) => {
    isOver = false;
    isDragging = false;
    dragDistance += currentDragDistance;
    currentDragDistance = 0;
})
wrapper.addEventListener('mouseup', (e) => {
    isDragging = false;
    if(isOver){
        dragDistance += currentDragDistance;
    }
    currentDragDistance = 0;
    switch(true){
        case (wrapper.scrollLeft <= 50):
            wrapper.scrollLeft = 0;
            break;
        case (wrapper.scrollLeft >= (scrollLine - 50)):
            wrapper.scrollLeft = scrollLine;
            break;
        default:
            break;
    }
})
wrapper.addEventListener('dragend', (e) => {
    isDragging = false;
})
