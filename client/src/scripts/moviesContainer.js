
// Drag items slider
export const handleDrag = (sliderRef, leftRef, rightRef) => {

    // Check slider exists
    const slider = sliderRef.current;
    if (!slider) return console.warn("Slider not found");

    slider.style.scrollBehavior = "smooth";
    const numItems = slider.children.length;    

    const getItemWidth = () => {
        return (slider.offsetWidth - (4 * 20)) / 5;
    };


    // Variables
    let isDown = false;
    let startX;
    let scrollLeft;


    // Functions
    const startDrag = (e) => {        
        isDown = true;
        slider.style.cursor = "grabbing";
        slider.style.scrollBehavior = "auto";
        startX = e.pageX;
        scrollLeft = slider.scrollLeft;
    };

    const stopDrag = (e) => {
        if (!isDown) return;
        isDown = false;
        slider.style.scrollBehavior = "smooth";
        slider.style.cursor = 'grab';
        // Auto align tween
    };
    
    const drag = (e) => {
        if (!isDown) return;   
        e.preventDefault();        

        const change = (e.pageX - startX) * 1.1;
        slider.scrollLeft = scrollLeft - change;      
    };

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mouseup", stopDrag);
    slider.addEventListener("mouseleave", stopDrag);
    slider.addEventListener("mousemove", drag);

    // Scroll buttons
    const leftButton = leftRef.current;
    const rightButton = rightRef.current;

    const leftButtonClicked = (e) => {
        slider.scrollLeft = Math.max(0, slider.scrollLeft - getItemWidth());
    };

    const rightButtonClicked = (e) => {
        slider.scrollLeft = Math.min(getItemWidth() * numItems, slider.scrollLeft + getItemWidth());
    };

    leftButton.addEventListener("click", leftButtonClicked)
    rightButton.addEventListener("click", rightButtonClicked)
}