//Base url 
let baseUrl = "https://api.pexels.com/v1/curated?page=2&per_page=9";

//prev and Next Url
let prev_url = '';
let next_url = '';

//initial search value
let search_value = '';

// Default Content on web page
let loadContent = ()=>{
    document.addEventListener('DOMContentLoaded',async()=>{     
        let data = await fetchData(baseUrl);
        generateHTML(data.photos);
        for(let i=0; i<loader2.length;i++){
            loader2[i].style.display = 'none';
        }
    });
}
loadContent();

//Function for fetching data
let api_key  = '563492ad6f917000010000014451af9b5078438da13a0233271e7aa0';
let fetchData = async(url)=>{
    let res = await fetch(url,{
                 method:'GET',
                 headers:{
                     'Content-type':'application/json',
                      Authorization:api_key }}
                      );
    let data = await res.json();
    //getting prev and next url from json object
    prev_url = data.prev_page;
    next_url = data.next_page;
    return data;         
}
let loader2;
// Function For generating html
let gallery = document.querySelector('.gallery');
let generateHTML = (data)=>{
    gallery.innerHTML="";
    //here data is a array of photos object
    data.forEach(element => {
        let div = document.createElement('div');
        //loader
        div.classList.add('item');
        div.innerHTML = `
        <div class="loader2"><iframe src="https://embed.lottiefiles.com/animation/99571"></iframe></div>
        <a href = "${element.url}"><img src = "${element.src.original}"></a>
        <div class = "imgbottom">
            <h4><a href="${element.photographer_url}">${element.photographer}</a></h4>
            <h4><a  download="img1"><span class="material-symbols-outlined">download</span></a></h4>
        </div>`;
        gallery.appendChild(div);     
    });
    loader2 = document.getElementsByClassName('loader2'); 
}
//Function for search query
const input_Element = document.getElementById('inputSearch');
// Search Function
let performSearch =async(event)=>{
    event.preventDefault();
    search_value = input_Element.value;
    baseUrl= `https://api.pexels.com/v1/search?query=${search_value}&per_page=9`;
    let jdata = await fetchData(baseUrl);
    generateHTML(jdata.photos);
}
// adding event onPressEnter after writing query
document.querySelector('.search').addEventListener('submit',(e)=>{
    performSearch(e);
})
// //For Button
// document.getElementById('sr').addEventListener('click',()=>{performSearch(input.value)});

//previous button next button
let prev = document.querySelector('.previous');
let next = document.querySelector('.next');
prev.addEventListener('click',()=>{
    handleprev();
});
next.addEventListener('click',()=>{
    handleNext();
});
const handleprev = async()=>{
    baseUrl = prev_url;
    let jsonData = await fetchData(baseUrl);
    generateHTML(jsonData.photos);
}
handleNext=async()=>{
    baseUrl = next_url;
    let jsonData = await fetchData(baseUrl);
    generateHTML(jsonData.photos);
}

//hideloader function
const hideloader = ()=>{
    document.querySelectorAll('.loader2').style.display = "none";
}