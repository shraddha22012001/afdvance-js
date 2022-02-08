
$(document).ready(() => {
    $('#nobel-list').hide()
})

async function getrlist() {
    await fetchData()
}

function populateNobelList(data) {
    if (data.length === 0) {
        $('#nobel-list').hide()
    } else {
        $('#nobel-list').empty()
        $('#nobel-list').show()
        for (let i = 0; i < data.length; i++) {
            $('#nobel-list').append(`
            <li class='list-group-item'>
                <div class='d-flex'>
                    <p class='m-2'>${data[i].year}</p>
                    <p class='m-2'>${data[i].category}</p>
                    <p class='m-2'>${data[i].name}</p>
                <div>
            </li>
            `)
        }
    }
}

function findRequired(data){
    let data_list = []
    data_list=data.filter(element=>{
        return element.year>=2000 && element.year<=2019 && element.category==="chemistry"
    })
    let laureates = []
    for(let i=0;i<data_list.length;i++){
        data_list[i].laureates.map(l=>{
            let new_obj = {
                year:data_list[i].year,
                category:data_list[i].category,
                name: l.firstname+" "+l.surname
            }
            laureates.push(new_obj)
        })
    }
    populateNobelList(laureates)
}

function fetchData(){
    fetch('http://api.nobelprize.org/v1/prize.json')
    .then(response => response.json())
    .then(data => {
        findRequired(data.prizes)
    })
    .catch(err=>{
        alert(err)
    })
}