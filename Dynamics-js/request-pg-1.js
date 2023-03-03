const userurl = localStorage.getItem('userurl');
let userdata = null ,
Customer = null , Requests = null, CustomerGuide = null ,RType=0;


// functions 
async function GetUserData() {
    const response = await fetch(userurl).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    userdata = data ;
    document.querySelector("#username").innerHTML = userdata.UserInfo[0].CustomerName;
    
}


async function GetUserRequests() {
    let url = `http://95.81.85.240:9080/api/crm/GetRequestResponsibleWork?UserGuid=${userdata.UserInfo[0].UserGuid}&TypeRequest=${RType}&Token=dzU391krCycA2NOLqypEQ==`;
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    Requests = data;
    


}



async function GetCustomerInfo(CustomerGuid) {
    CustomerGuide = CustomerGuid ;
    let url = `http://95.81.85.240:9080/api/crm/GetCustomerInfo?CustomerGuid=${CustomerGuide}&Token=dzU391krCycA2NOLqypEQ==`
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    Customer = data;


}

async function addRow(){
    let i = 0;

    while (i < Requests.RequestResponsibleWork.length) {
       await GetCustomerInfo(Requests.RequestResponsibleWork[i].CustomerGuid);

            
            let table = document.getElementById("myTable");

            
            let row = table.insertRow(1); 
            // Create table cells
            let c1 = row.insertCell(0);
            let c0 = row.insertCell(0);
            let c2 = row.insertCell(0);
            let c3 = row.insertCell(0);
            let c4 = row.insertCell(0);
            let c5 = row.insertCell(0);
            c2.colSpan = "2"


            
            c0 = null;
            c1.innerHTML = `<a class=\"more\" id = \"${i}\"  onClick=\"reply_click(this.id)\">جزئیات</a>`;
            c2.innerText = Requests.RequestResponsibleWork[i].title;
        c3.innerText = new Date(Requests.RequestResponsibleWork[i].RequestDate).toLocaleString('fa-IR');;
            c4.innerText = Customer.CustomerInfo[0].JobName;
            c5.innerText = Customer.CustomerInfo[0].FName + " " + Customer.CustomerInfo[0].Lname;
        


        i++;
    }
}



async function loadpage() {
    await GetUserData();
    await GetUserRequests();
    addRow();

    
    
}

loadpage();


function reply_click(clicked_id) {
    localStorage.setItem('customerid', clicked_id);
    location.replace("./req.html");
}



// document.addEventListener('click', function (e) {
//     if (e.target.tagName == "A") {
//         alert(this);
//     }
// })



