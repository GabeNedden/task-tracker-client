function Typewriter() {

let text = 'Please register to start a project!';
let i = 0;

setInterval(function() {
    let cursor = ( i%4===0 || i%3===0 ? "_" : "" );
    let displayText = text.substring(0, i);
    document.getElementById("typespace").innerHTML = displayText + cursor;
    i++;
}, 100);

}

export default Typewriter;