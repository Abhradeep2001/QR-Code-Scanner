const cont = document.querySelector(".wrapper");
form = document.querySelector("form");
input = document.querySelector("input");
info = document.querySelector("p");
closeBtn = document.querySelector(".close");
copyBtn = document.querySelector(".copy");


function fetchRequest(file,formData){
    info.innerText= "Wait! Scanning QR Code......";
    // JavaScript Method to fetch data using API
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: 'POST',
        body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        info.innerText=  result?"Upload QR Code to Scan its contents":"Couldn't Scan QR Code";
        if(!result)
            return;
        document.querySelector("textarea").innerText= result;
        form.querySelector("img").src= URL.createObjectURL(file);
        cont.classList.add("active");
    }).catch(function(){
        info.innerText="Couldn't Scan QR Code!!";
    });
}


input.addEventListener("change", async e =>{
    let file=e.target.files[0];
    if(!file)
        return;
    let formData = new FormData();
    formData.append('file',file);
    fetchRequest(file,formData);
});


copyBtn.addEventListener("click",function(){
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});


form.addEventListener("click", () => input.click());
closeBtn.addEventListener("click", () =>
cont.classList.remove("active"));

