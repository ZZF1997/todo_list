const array = [];

function addTodoItem() {
    try {
        const name = getName();
        array.push(new TodoItem(name, array.length));
        fillTodoListContent();
        resetName();
    } catch (error) {
        showErrorMessage();
    }
}

function fillTodoListContent() {
    array.sort((a, b) => a.displayOrder - b.displayOrder);
    let html = '';
    for (let i = 0; i < array.length; i++) {
        let id = array[i].displayOrder;
        html += `<li id ="${id}"><input type="checkbox" onclick="done(${id})"><label>${array[i].name}</label></li>`;
    }
    document.querySelector('#tasks').innerHTML = html;
    let clickedButton = getClickedButton();
    if (clickedButton === 'Active') {
        ActiveView();
    } else if (clickedButton === 'Finished') {
        FinishedView();
    }
}
function ActiveView(){
    let html='';
    for (let i = 0; i < array.length; i++) {
        if(!array[i].doneState) {
            let id=array[i].displayOrder;
            html += `<li id ="${id}"><input type="checkbox" onclick="done(${id})"><label>${array[i].name}</label></li>`;
        }
    }
    document.querySelector('#tasks').innerHTML = html;
}
function FinishedView(){
    let html='';
    for (let i = 0; i < array.length; i++) {
        if(array[i].doneState) {
            let id=array[i].displayOrder;
            html += `<li id ="${id}"><input type="checkbox" onclick="done(${id})" checked="checked"><label style="text-decoration: line-through solid rgb(128, 128, 128)">${array[i].name}</label></li>`;
        }
    }
    document.querySelector('#tasks').innerHTML = html;
}
function AllView(){
    let html = '';
    for (let i = 0; i < array.length; i++) {
        let id = array[i].displayOrder;
        if(array[i].doneState){
            html += `<li id ="${id}"><input type="checkbox" onclick="done(${id})" checked="checked"><label style="text-decoration: line-through solid rgb(128, 128, 128)">${array[i].name}</label></li>`;
        }else {
            html += `<li id ="${id}"><input type="checkbox" onclick="done(${id})"><label>${array[i].name}</label></li>`;
        }
    }
    document.querySelector('#tasks').innerHTML = html;
}
function getName() {
    let nameElement = document.querySelector('#new-task');
    const name = nameElement.value.trim();
    if (!name) {
        throw new Error('no name');
    } else {
        hideErrorMessage();
        return name;
    }
}

function resetName() {
    let nameElement = document.querySelector("#new-task");
    nameElement.value = "";
}

function hideErrorMessage() {
    document.querySelector("#error_message").innerHTML = "";
}

function showErrorMessage() {
    document.querySelector("#error_message").innerHTML = " <span  class=\"error-message\">Please input something first.</span>";
}

function getClickedButton() {
    let button;
    let temp = document.querySelector("#filter_element");
    for (let i=0;i<3;i++){
        if(temp.getElementsByTagName("input")[i].checked){
            button = temp.getElementsByTagName("input")[i].value;
        }
    }
    console.log("a");
    return button;
}

function done(displayOrder) {
    let temp = document.getElementById(displayOrder);
    array[displayOrder].doneState=temp.childNodes[0].checked;
    temp.childNodes[0].checked
        ? temp.childNodes[1].style.textDecoration = 'line-through solid rgb(128, 128, 128)'
        : temp.childNodes[1].style.textDecoration = 'none';
    let clickedButton = getClickedButton();
    if (clickedButton === 'Active') {
        ActiveView();
    } else if (clickedButton === 'Finished') {
        FinishedView();
    }
}


class TodoItem {
    constructor(name, displayOrder) {
        this.name = name;
        this.displayOrder = displayOrder;
        this.doneState = false;
    }
}
