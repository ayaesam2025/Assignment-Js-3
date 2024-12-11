var bookmarkName = document.getElementById("bookmarkName");

var bookmarkURL = document.getElementById("bookmarkURL");

var allSites = [];


if(localStorage.getItem("sites") !== null){
    try{
        allSites = JSON.parse(localStorage.getItem("sites"));
    }
    catch(e){
        console.error("Error parsing data from localstorage:",e);
        allSites =[];
    }

    displayData();
}

function addWebsite(){
    
    if(allValidation(bookmarkName , 'msgName') && allValidation(bookmarkURL , 'msgUrl')){
       var website = {
            name: bookmarkName.value,
            url: bookmarkURL.value,
        };
    allSites.push(website);
    localStorage.setItem("sites" , JSON.stringify(allSites));
    displayData();
    clearForm();
    console.log(allSites);
    } 
    else{
        alert('بتعمل اي')
    }
}

function clearForm(){
    bookmarkName.value="";
    bookmarkURL.value="";


    bookmarkName.classList.remove('is-valid');
    bookmarkURL.classList.remove('is-valid')
}


function displayData(){
    var cartona = "";
    if(!allSites || allSites.length ==0){
        document.getElementById("tableContent").innerHTML = "<tr><td colspan='4'>No data available</td></tr>";
        return;
    }


    for(var i = 0 ; i < allSites.length ; i++){
        if(allSites[i] && allSites[i].name){

            cartona +=`
            <tr>
      <td>${i}</td>
      <td>${allSites[i].name}</td>
      <td><button ondblclick="visitSite(${i})" class="btn btn-outline-success btn-sm">Visit</button></td>
      <td><button ondblclick="deleteSite(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>`;

        }

     
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function deleteSite(index){
    console.log(index);
    allSites.splice(index, 1);
    localStorage.setItem("sites" , JSON.stringify(allSites));
    displayData();
    
}
function visitSite(index) {
    if(allSites[index].url){
        window.open(allSites[index].url,"_blank");
    } else{
        alert('الرابط غير متاح')
    }
   
}

function allValidation(element , msgId) {
    var msg = document.getElementById(msgId);
    var regex = {
        bookmarkName:/^[A-Z][a-z]{3,8}$/i,
        bookmarkURL:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    };
    if(regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none');

        return true;
    }
    else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove('d-none');

        return false;
    }
}



