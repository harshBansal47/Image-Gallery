//Base url 
let baseUrl = "https://api.pexels.com/v1/curated?page=2&per_page=9";

//prev and Next Url
let prev_url = '';
let next_url = '';

//initial search value
let search_value = '';

// Default Content on web page
// on loading 
let loadContent = ()=>{
    document.addEventListener('DOMContentLoaded',async()=>{
        let data = await fetchData(baseUrl);
        generateHTML(data.photos);
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
    prev_url = data.prev_page;
    next_url = data.next_page;
    return data;         
}

// Function For generating html
let gallery = document.querySelector('.gallery');
let generateHTML = (data)=>{
    gallery.innerHTML="";
    //here data is a array of photos object
    console.log(data);
    data.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
        <a href = "${element.url}"><img src = "${element.src.original}"></a>
        <div class = "imgbottom">
            <h4><a href="${element.photographer_url}">${element.photographer}</a></h4>
            <h4><a  download="img1"><span class="material-symbols-outlined">download</span></a></h4>
        </div>`;
        gallery.appendChild(div);
    });
}

//Function for search query
const input = document.querySelector('.search');
//For Button
document.getElementById('sr').addEventListener('click',()=>{performSearch(input.value)});
input.addEventListener('submit', (e)=>{performSearch(e)});
let performSearch =async(event)=>{
        search_value = event.target.querySelector('input').value;
        baseUrl= `https://api.pexels.com/v1/search?query=${search_value}&per_page=9`;
        let jdata = await fetchData(baseUrl);
        generateHTML(jdata.photos);
}

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