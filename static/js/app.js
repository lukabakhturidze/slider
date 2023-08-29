const wrapper = document.querySelector(".wrapper");
let isDragging = false;
let startX = 0;
let dragDistance = 0;
let currentDragDistance = 0;
let isOver = false;
let scrollLine = wrapper.scrollWidth - wrapper.clientWidth;
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
        if((dragDistance + currentDragDistance).toFixed() >= 0 && (dragDistance + currentDragDistance).toFixed() <= scrollLine){
            wrapper.scrollLeft = dragDistance + currentDragDistance
            console.log("luka");
        }
        else if((dragDistance + currentDragDistance).toFixed() < 0){
            dragDistance = 0;
            currentDragDistance = 0;
            startX = e.clientX;
        }
        else if((dragDistance + currentDragDistance).toFixed() > scrollLine){
            dragDistance = scrollLine;
            currentDragDistance = 0;
            startX = e.clientX;
            console.log("nika");
        }

        console.log(currentDragDistance);
        console.log(dragDistance);
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
    console.log(wrapper.scrollLeft + "up");
    switch(true){
        case (wrapper.scrollLeft <= 50):
            wrapper.scrollLeft = 0;
            break;
        case (wrapper.scrollLeft >= (scrollLine - 50)):
            wrapper.scrollLeft = scrollLine;
            break;
        default:
            console.log("default");
            break;
    }
})
wrapper.addEventListener('dragend', (e) => {
    isDragging = false;
})
