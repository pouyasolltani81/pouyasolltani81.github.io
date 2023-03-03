






let username = document.querySelector("#username").value,
    password = document.querySelector("#password").value;




function search() {
    
     username = document.querySelector("#username").value;
     password = document.querySelector("#password").value;

}



async function getdata() {
    search();
    let url = `http://95.81.85.240:9080/api/crm/LoginToPortal?UserName=${username}&Password=${password}&Token=dzU391krCycA2NOLqypEQ==`;
    const response = await fetch(url).catch(function (error) {
        console.log("somthing went wrong");
    });
    localStorage.setItem('userurl', url);

     let data = await response.json().catch(function (error) {
       document.querySelector(".page").classList.add("blur");
       document.querySelector(".modal").classList.remove("hidden");
       document.querySelector(".card").classList.remove("hidden");
       
    });

    
}

async function login(){
    await getdata();
    if (document.querySelector(".page").classList.contains("blur")) { } else {
        
        location.replace("./page1.html");
    }
}

// event listeners 


document.querySelector("#submit").addEventListener("click" , () => {
   
    login();
    
    
})

document.querySelector("#m-close").addEventListener("click", () => {

    document.querySelector(".page").classList.remove("blur");
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".card").classList.add("hidden");
})

