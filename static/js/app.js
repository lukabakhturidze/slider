//mouse drag variables>
const wrapper = document.querySelector(".wrapper");
const buttons = document.querySelectorAll(".buttons-wrapper button");
let isDragging = false;
let startX = 0;
let dragDistance = 0;
let currentDragDistance = 0;
let isOver = false;
let scrollLine = wrapper.scrollWidth - wrapper.clientWidth;
//<mouse drag variables

//buttons drag variables>
let buttonHoldChecker = false;
let isOverButton = false;
let directionChecker = false;
//<buttons drag variables

//for buttons computer version>
buttons.forEach((button, index) => {
    button.addEventListener('mousedown', () => {
        buttonMousedownHandler(index);
    })
    button.addEventListener('mouseup', buttonMouseUp);
    button.addEventListener('mouseleave', buttonMouseleave);
    button.addEventListener('touchstart', function(e){
        buttonMousedownHandler(index);
    }, {passive : true});
    button.addEventListener('touchend', buttonMouseUp);
})
function buttonMousedownHandler(index){
    scrollLine = wrapper.scrollWidth - wrapper.clientWidth;
    buttonHoldChecker = true;
    isOverButton = true;
    if(index == 0){
        directionChecker = false;
    }
    else if(index == 1){
        directionChecker = true;
    }
    buttonActiveHandler();
}
function buttonMouseUp(){
    buttonHoldChecker = false;
}
function buttonMouseleave(){
    isOverButton = false;
}

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
    buttonActiveHandler();
}, 5)

function buttonActiveHandler(){
    if(dragDistance <= 0){
        buttons[0].disabled = true;
        buttons[1].disabled = false;
    }else if(dragDistance >= scrollLine){
        buttons[1].disabled = true;
        buttons[0].disabled = false;
    }else{
        buttons[1].disabled = false;
        buttons[0].disabled = false;
    }
}
//<for buttons computer version





//for mouse drag computer version>
wrapper.addEventListener('mousedown', mousedownHandler);
function mousedownHandler(e){
    scrollLine = wrapper.scrollWidth - wrapper.clientWidth;
    isDragging = true;
    startX = e.clientX;
}

wrapper.addEventListener('mouseenter', mouseenterHandler);
function mouseenterHandler(){
    isOver = true;
}

wrapper.addEventListener('mousemove', mousemoveHandler)
function mousemoveHandler(e){
    if(isDragging && isOver && (dragDistance + currentDragDistance) >= 0 && (dragDistance + currentDragDistance) <= scrollLine){
        currentDragDistance = (startX - e.clientX)
        wrapper.scrollLeft = dragDistance + currentDragDistance
        buttonActiveHandler();
    }
    else if((dragDistance + currentDragDistance) < 0){
        dragDistance = 0;
        currentDragDistance = 0;
        startX = e.clientX;
        buttonActiveHandler();
    }
    else if((dragDistance + currentDragDistance) > scrollLine){
        dragDistance = scrollLine;
        currentDragDistance = 0;
        startX = e.clientX;
        buttonActiveHandler();
    }
}


wrapper.addEventListener('mouseleave', mouseleaveHandler)
function mouseleaveHandler(e){
    isOver = false;
    isDragging = false;
    dragDistance += currentDragDistance;
    currentDragDistance = 0;
}


wrapper.addEventListener('mouseup', mouseupHandler);
function mouseupHandler(e){
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
}
//<for mouse drag computer version

// for touch drag mobile version>
wrapper.addEventListener('touchstart', (e) => {
    scrollLine = wrapper.scrollWidth - wrapper.clientWidth;
    isDragging = true;
    isOver = true;
    startX = e.touches[0].clientX;
}, {passive : true})

wrapper.addEventListener('touchmove', (e) => {
    if(isDragging && isOver && (dragDistance + currentDragDistance) >= 0 && (dragDistance + currentDragDistance) <= scrollLine){
        currentDragDistance = (startX - e.touches[0].clientX)
        wrapper.scrollLeft = dragDistance + currentDragDistance
        buttonActiveHandler();
    }
    else if((dragDistance + currentDragDistance) < 0){
        dragDistance = 0;
        currentDragDistance = 0;
        startX = e.touches[0].clientX;
        buttonActiveHandler();
    }
    else if((dragDistance + currentDragDistance) > scrollLine){
        dragDistance = scrollLine;
        currentDragDistance = 0;
        startX = e.touches[0].clientX;
        buttonActiveHandler();
    }
}, {passive : true})
wrapper.addEventListener('touchend', (e) => {
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
// <for touch drag mobile version
