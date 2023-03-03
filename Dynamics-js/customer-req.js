const userurl = localStorage.getItem('userurl');
const customerid = localStorage.getItem('customerid');
const addForm = document.querySelector("#booking-form");
let userdata = null,
    Customer = null, Requests = null, CustomerGuide = null, CustomerProducts = null,CustomerAssignesProducts=null, RType = 0;


// functions 
async function GetUserData() {
    const response = await fetch(userurl).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    userdata = data;
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
    CustomerGuide = CustomerGuid;
    let url = `http://95.81.85.240:9080/api/crm/GetCustomerInfo?CustomerGuid=${CustomerGuide}&Token=dzU391krCycA2NOLqypEQ==`
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    Customer = data;


}


async function GetCustomerProducts(CustomerGuid) {
    CustomerGuide = CustomerGuid;
    let url = `http://95.81.85.240:9080/api/crm/GetInvoiceDetailCustomer?CustomerGuid=${CustomerGuide}&Token=dzU391krCycA2NOLqypEQ==`
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    CustomerProducts = data;


}


async function GetCustomerAssignedProducts(CustomerGuid) {
    CustomerGuide = CustomerGuid;
    let url = `http://95.81.85.240:9080/api/crm/GetProductSuggestToCustomer?CustomerGuid=${CustomerGuide}&Token=dzU391krCycA2NOLqypEQ==`
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });

    let data = await response.json();
    CustomerAssignesProducts = data;


}

function AddInfo(){
    document.querySelector("#Fname").innerHTML = Customer.CustomerInfo[0].FName;
    document.querySelector("#Lname").innerHTML = Customer.CustomerInfo[0].Lname;
    document.querySelector("#number").innerHTML = Customer.CustomerInfo[0].NoCustomer;
    document.querySelector("#toggler-1").checked = Customer.CustomerInfo[0].StatusConsentLetter;
    document.querySelector("#birth").innerHTML = Customer.CustomerInfo[0].BirthDatePersian;
    //if (Customer.CustomerInfo[0].Meliat == "0")
    document.querySelector("#nationality").innerHTML = Customer.CustomerInfo[0].Meliat;
    document.querySelector("#job").innerHTML = Customer.CustomerInfo[0].JobName;
    document.querySelector("#address").innerHTML = Customer.CustomerInfo[0].AddressHome;

}

async function AddRowToProducts() {
    let i = 0;
    await GetCustomerProducts(Requests.RequestResponsibleWork[customerid].CustomerGuid);

    while (i < CustomerProducts.InvoiceDetailCustomer.length) {




        let table = document.getElementById("table-P");


        let row = table.insertRow(1);


        // Create table cells


        let c1 = row.insertCell(0);
        let c2 = row.insertCell(0);
        let c3 = row.insertCell(0);
        let c4 = row.insertCell(0);
        



        c1.innerHTML = CustomerProducts.InvoiceDetailCustomer[i].Quantity;
        c2.innerText = CustomerProducts.InvoiceDetailCustomer[i].productname; 
        c3.innerText = "-";
        c4.innerText = CustomerProducts.InvoiceDetailCustomer[i].inv_PersianDateFact;



        i++;
    }
}



async function AddRowToAssignedProducts() {
    let i = 0;
    await GetCustomerAssignedProducts(Requests.RequestResponsibleWork[customerid].CustomerGuid);

    while (i < CustomerAssignesProducts.AssignProductToCustomer.length) {




        let table = document.getElementById("table-AP");


        let row = table.insertRow(1);


        // Create table cells


        let c1 = row.insertCell(0);
        let c2 = row.insertCell(0);
        let c3 = row.insertCell(0);
        let c4 = row.insertCell(0);




        c1.innerHTML = "<ol dir=\"rtl\">" + "<li>" + CustomerAssignesProducts.AssignProductToCustomer[i].Description + "</li>" + "<li>" + CustomerAssignesProducts.AssignProductToCustomer[i].Description2 + "</li>"+"<li>" + CustomerAssignesProducts.AssignProductToCustomer[i].Description3 + "</li>"+"</ol>";
        c4.innerText = CustomerAssignesProducts.AssignProductToCustomer[i].ProductName;
        c2.innerText = CustomerAssignesProducts.AssignProductToCustomer[i].MeetingCount; 
        c3.innerText = new Date(CustomerAssignesProducts.AssignProductToCustomer[i].PresentationDate).toLocaleDateString('fa-IR') ;



        i++;
    }
}



// addForm.addEventListener("submit", (e) => {
//     let Productname = document.getElementById("nameofproduct").value,
//         description = document.getElementById("Description").value;

//     let data = { ProductName: Productname, Description: description};

//     fetch("http://localhost:3000", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     }).then(res => {
//         console.log("Request complete! response:", res);
//     });

//     // handle submit
// });

// 100000000
// page loading 

async function loadpage() {
    await GetUserData();
    await GetUserRequests();
    await GetCustomerInfo(Requests.RequestResponsibleWork[customerid].CustomerGuid);
    AddInfo();
    AddRowToProducts();
    AddRowToAssignedProducts();


}

loadpage();
