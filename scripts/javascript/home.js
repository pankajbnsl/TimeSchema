// making form visible on the click to edit button
function visbleForm(){
    var div = document.getElementById("update-form")
    div.style.visibility = 'visible';
    // refreshing the page after 60 sec for handling server not responding error
    setTimeout(function(){
        // inbuilt function for reloading the page
        location.reload();
    },60000);
}
// making update form invisible on the click of "X" button on the form
function closeWin(){
    var div = document.getElementById("update-form")
    div.style.visibility = 'invisible';
        // inbuilt function for reloading the page
    location.reload();
}