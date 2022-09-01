// fiz no corridão depos passo a limpo e crio os objetos seguindo os padrões

var myModal = new bootstrap.Modal(document.getElementById('myModal'), {});

//@return string validadtion number
function numberValidation(arg){
    let res =  arg.replace(/\D/gi, "");

    if(res.length < 8){
        alert("Numero de telefone invalido");
    }

    return res;
}

//@return the text encoded
function encodeText(arg){
    return window.encodeURIComponent(arg);
}

//@return string the zap urilink + msg text
function uriLink(number, text){
    return `https://api.whatsapp.com/send?phone=+55${number}&text=${text}`;
}

// async function shorUrl(url) {
//     const response =  await fetch('https://is.gd/create.php?format=simple&url='+url,{
//         mode: 'no-cors',
//         method: 'POST',
//         headers: { 'accept': 'application/json',
//                    'Content-Type': 'application/json'
//                 },
//         body: JSON.stringify()
//     });

//     console.log(response);
    
// }

function copyEvent(id)
    {
        var str = document.getElementById(id);
        window.getSelection().selectAllChildren(str);
        document.execCommand("Copy")
    }

//convert to base64qrcode this fix donwload bug
async function getBase64FromUrl(url) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }
  getBase64FromUrl('http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100').then((res)=>{
  console.log(res);    
  return res});
  //event btn generate link
document.getElementById('btn').addEventListener('click', function(){
    
    let number = document.getElementById('number').value;
    let text = document.getElementById('texto').value;
    let code = document.getElementById('code'); 
    let res = document.getElementById('res');
    let modalHeader = document.getElementById('myModalLabel');
     
    //create a highlight container code block
    let highlight = `<div id='tag' style="background: #f8f8f8; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #008000; font-weight: bold">&lt;a</span> <span style="color: #BB4444">href=&quot;${uriLink(numberValidation(number),encodeText(text))}&quot;</span><span style="color: #008000; font-weight: bold">&gt;</span>whatzapp<span style="color: #008000; font-weight: bold">&lt;/a&gt;</span></div>`;
    //create a link cointainer block
    let normal = `<div class="row"><pre id="normal">${uriLink(numberValidation(number),encodeText(text))}</pre></div>`;
    //create only link 
    let link = uriLink(numberValidation(number),encodeText(text));
   

    code.innerHTML = highlight + normal + '<div class="row"><div class="col-6 cod2"></div><div class="col-6 cod2"></div></div>';
    //after cod2 created get the className
    let code2 = document.getElementsByClassName('cod2');

    //create ellement btn copy link
    const btnCopy = document.createElement('button');
    btnCopy.innerHTML = 'Copiar link';
    btnCopy.classList.add('btn-info', 'btn-sm', 'btn')
    btnCopy.setAttribute('id', 'copy');
    btnCopy.setAttribute('data-mdb-toggle', 'modal');
   
    //add evento to btn
    btnCopy.addEventListener('click', function(){
        copyEvent('normal');
        modalHeader.innerHTML='Link copiado com sucesso!'
        myModal.show();
        
    });
    

    //create ellement btn copy tag
    const btnCopy2 = document.createElement('button');
    btnCopy2.innerHTML = 'Copiar tag';
    btnCopy2.classList.add('btn-info', 'btn-sm','btn')
    btnCopy2.setAttribute('id', 'copy');
    //add evento to btn
    btnCopy2.addEventListener('click', function(){
        copyEvent('tag');
        modalHeader.innerHTML='Tag HTML copiado com sucesso!'
        myModal.show();
        
    });
    // create element btn donwload
    const btnCopy3 = document.createElement('a');
    btnCopy3.innerHTML = 'Baixar Qr-code';
    btnCopy3.classList.add('btn-info', 'btn-sm', 'btn')
    btnCopy3.setAttribute('id', 'download');
    btnCopy3.setAttribute('role', 'buttom')
    btnCopy3.download = 'qrcode';
    //push data64 to link for download
    getBase64FromUrl(`http://api.qrserver.com/v1/create-qr-code/?data=${uriLink(numberValidation(number)+encodeText(text))}&size=100x100.png`).then((res)=>{
        btnCopy3.setAttribute('href',res);
    });
    
    //add evento to btn
    
    btnCopy3.addEventListener('click', function(){
        
        modalHeader.innerHTML='Imagem baixada!'
        myModal.show();
    });

    //create element qrcod img
    let qr_img = document.createElement('img');
    qr_img.classList.add('img-fluid','p-2');
    getBase64FromUrl(`http://api.qrserver.com/v1/create-qr-code/?data=${uriLink(numberValidation(number) + encodeText(text))}&size=100x100.png`).then((res)=>{
        qr_img.setAttribute('src', res);
    });
    
    qr_img.setAttribute('id','qcode')

    code2[0].appendChild(btnCopy);
    code2[1].appendChild(btnCopy2);
    
    res.appendChild(qr_img);
    res.appendChild(btnCopy3);

    

})


//shorUrl('https://www.google.com.br');

//REFERENCES FOR LEARNING
//https://stackoverflow.com/questions/22172604/convert-image-from-url-to-base64
//https://velhobit.com.br/desenvolvimento/api-do-whatsapp-como-quebrar-linhas-e-passar-parametros-em-links.html
//https://pt.stackoverflow.com/questions/491477/como-estilizar-texto-dentro-da-tag-code