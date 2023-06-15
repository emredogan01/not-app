let students = []

let varMiLocalde = localStorage.getItem("students")
    if(varMiLocalde){
    students = JSON.parse(localStorage.getItem("students"));        
    }else{
        students = [];
    }
    
const studentForm = document.querySelector("#student-form")
const studentList = document.querySelector("#student-list")
const addButton = document.querySelector(".ekle")
viewStudentList()

studentForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const name = document.querySelector("#name").value;
    const surName = document.querySelector("#surname").value;
    const number = document.querySelector("#number").value;
    const vize = document.querySelector("#vize").value;
    const final = document.querySelector("#final").value;

    const newStudent = {
        name: name,
        surName: surName,
        number: number,
        vize: Number(vize),
        final: parseInt(final),
    }
    students.push(newStudent)
    studentForm.reset()
    saveToLocalStorage()
    viewStudentList()
})

function viewStudentList(){
    const emptyList = document.querySelector(".empty")
    if(students.length){

        if(emptyList){
            emptyList.style.display = 'none'
        }

        studentList.innerHTML = ''
        students.forEach((keys, index) => {
            const studentCard = `
                <div class="student-item-info">
                    <h3>${keys.name} ${keys.surName} - ${keys.number}</h3>
                    <span>Vize: ${keys.vize} Final: ${keys.final} </span>
                    <p>Ortalama: ${((keys.vize + keys.final) / 2.).toFixed(2)} </p>
                </div>
                <div class="student-item-process">
                    <i class="bi bi-pencil-square edit-btn" onclick="editStudent(${index})"></i>
                    <i class="bi bi-trash3-fill delete-btn" onclick="deleteStudent(${index})"></i>
                </div>
            `
            const studentItem = document.createElement("div")
            studentItem.classList.add("student-item")
            studentItem.innerHTML= studentCard

            const ortalama = ((keys.vize + keys.final) / 2.).toFixed(2)

            if(ortalama > 80){
                studentItem.style.background = "#4cd137" 
            }else if(ortalama > 60){
                studentItem.style.background = "#0097e6"
            }else if(ortalama > 45){
                studentItem.style.background = "#e84118"
            }else{
                studentItem.style.background = "#2f3640"
            }

            studentList.appendChild(studentItem)
        })
    }else{
        const forEmpty = `<p class="empty">Listenizde Öğreci Bulunmamaktadır.</p>`
        studentList.innerHTML= forEmpty;
    }
}

function deleteStudent(gelenIndex){
    console.log("students =>",students)
    const sonuc = students.filter((keys, index)=> {

        if(index === gelenIndex){
            Toastify({

                text: `${keys.name} adlı öğrenci listeden silindi`,
                duration: 3000
                
            }).showToast();
        }

        return index !== gelenIndex
    })
    
    students = sonuc

    saveToLocalStorage()
    viewStudentList()
}

function editStudent(gelenIndex){
    const editStudent = students.find((keys, index)=> index === gelenIndex)
    console.log("es",editStudent)

    document.querySelector('#name').value = editStudent.name
    document.querySelector("#surname").value = editStudent.surName
    document.querySelector("#number").value = editStudent.number
    document.querySelector("#vize").value = editStudent.vize
    document.querySelector("#final").value = editStudent.final

    deleteStudent(gelenIndex)
    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

