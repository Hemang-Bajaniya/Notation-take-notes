let btn = document.getElementById('btn')

function find(i)
{
    let svalue = document.getElementById(i).value
    Array.from(document.getElementsByClassName('card')).forEach(function(ele)
    {
        let p = ele.getElementsByTagName('p')[0]
        if(p.innerText.includes(svalue))
        {
            ele.style.display = 'inline'
            console.log(p.innerText.indexOf(svalue)); 
            console.log(p.innerText.indexOf(svalue.size)); 
        }
        else{
            ele.style.display = 'none'
        }
    })
}

function check(str)
{
    return str.trim().length === 0;
}

function add()
{
    let txt = document.getElementById('note')
    let flag = check(txt.value);
    if(flag==true)
    {
        alert('Please enter a note!')
    }

    else
    {
    let note = localStorage.getItem('note')
    if(note==null)
    {
        noteObj = [];
    }
    else
    {
        noteObj = JSON.parse(note)
    }
    noteObj.push(txt.value)
    localStorage.setItem('note',JSON.stringify(noteObj))
    createNote()
    txt.value = ''
    }
}

function createNote()
{
    let note = localStorage.getItem('note')
    if(note==null)
    {
        noteObj = [];
    }
    else
    {
        noteObj = JSON.parse(note)
    }
    let html = ""
    noteObj.forEach(function(ele,i)
    {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        html+= `<div class="card hidden" id="edit">
        <img src="img/pen-solid.svg" alt="" title="Edit" id='${i+1}' onclick="edit(this.id)">
        <h3>Notes-${i+1}</h3>
        <div class='pt' style="overflow-y: auto;">
        <p id='card-txt' class='txt' style="word-wrap: break-word">${ele}</p>
        </div>
        <button onclick="remove(this.id)" id='${i}'>Delete</button>
        <button class='sve' id='save-${i-1}' onclick='save(this.id)'>Save</button>
    </div>`
    });

    let notele = document.getElementById('notesection')
    if(note.length!=0)
    {
        notele.innerHTML = html
    }
}

function remove(i){
    let note = localStorage.getItem('note')
    if(note==null)
    {
        noteObj = [];
    }
    else
    {
        noteObj = JSON.parse(note)
    }
    noteObj.splice(i,1)
    localStorage.setItem('note',JSON.stringify(noteObj))
    createNote()
}

function edit(i)
{
        Array.from(document.querySelectorAll('.txt')).forEach(function(ele)
        {
            if(ele.parentElement.parentElement.querySelector('img').id===i)
            {
                ele.setAttribute('contenteditable','true')
                ele.style.outline = 'none'
                ele.focus()
            }
        })
        document.getElementById(i).parentElement.classList.add('save')
}

function save(i)
{
    let note = localStorage.getItem('note')
    noteObj = JSON.parse(note)
    let ind = document.getElementById(`${i}`).previousSibling.previousSibling.id
    ind = parseInt(ind);
    ind =ind+1
    if(check(document.getElementById(ind).parentNode.children[2].innerText))
    {
        alert("Please enter some notes!!")
    }

    else
    {
        document.querySelector(`#${i}`).parentNode.querySelector('.txt').setAttribute('contenteditable','false')
        noteObj[ind-1] = document.getElementById(ind).parentNode.children[2].innerText
        localStorage.setItem('note',JSON.stringify(noteObj))
        document.getElementById(i).parentElement.classList.remove('save')
    }
}

function clean(i)
{
    document.getElementById('sbox').value =''
    createNote()
}


