let Recipes  = [];
$('#sur').click(() => {
    let Rname = $('#rn').val();
    let Instructions = $('#instructions').val();
    let Ctime = $('#ct').val();

    if(Rname == '' || Instructions == '' || Ctime == '' || !$('#filepic')[0].checkValidity()){
        alert("Fill out every input");
        return;
    }else {
        let rInform = {
            Rname : Rname,
            Instructions : Instructions,
            Ctime : Ctime
        }
        
        let pFile = $('#filepic')[0].files[0];
        let read = new FileReader();
        read.readAsDataURL(pFile);
        read.onload = function () {
            let img = read.result;
            rInform.picture = img;
            Recipes.push(rInform);
            localStorage.setItem('Recipes', JSON.stringify(Recipes));
            show();
        }
    }

})


//When the page is loaded, this function is executed
window.onload = function () {
    $('#filepic').change(function (e) { //Event that is triggered when the file changes
        var file = e.target.files[0]; //Variable that targets the file selected by the element selector (fileInput) 
        var imageType = /image.*/; //A variable to filter file type
        
        if (file.type.match(imageType)) { //It creates the instance of FileReader API only if the file type matches
            var reader = new FileReader(); //Creates the reader
            reader.readAsDataURL(file); //Reads the content of the file
            reader.onload = function (e) { //When the file finished loading, we can access the result
                $('#recpic').html(''); //Clears the DIV where the image will be displayed
                var img = new Image(); //Creates a new image
                img.src = reader.result; //Set the img src property using the data URL
                $(img).addClass('img-fluid')
                $('#recpic').append(img); //Add the image to the DIV
            };
        } else {
            $('#recpic').html('File not supported!'); //If the file selected is not supported, a message is displayed
        }
    });
};




function show(){
    if (localStorage.getItem('Recipes') !== null) {
    let Recipes = JSON.parse(localStorage.getItem('Recipes'));
     let bdiv = document.getElementById('recdiv');
     bdiv.style.display = 'block';
     let sdiv = '';
 
     for(i in Recipes){
         sdiv += `<tr>
                     <td>
                         ${Recipes[i].Rname}
                     </td>
                     <td>
                         ${Recipes[i].Instructions}
                     </td>
                     <td>
                         ${Recipes[i].Ctime}
                     </td>
                     <td>
                         <img src = "${Recipes[i].picture}" id = "smpic">
                     </td>
                 </tr>`
     }
 
     document.getElementById('bod').innerHTML = sdiv   
    }
}


$('#nr').click(() => {
    location.reload()
})