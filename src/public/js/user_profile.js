const modal = document.querySelectorAll('.modal')
const modalContent = document.querySelectorAll('.modal__content')
const edit = document.querySelectorAll(".profile__section__edit")
const modalClose = document.querySelectorAll('[data-modal-close]')
const addModal = document.querySelectorAll('.profile__section__add')

for(let i = 0;i < edit.length; i++) {
    edit[i].addEventListener("click", (e) => {
        modal[i].classList.remove("d-none")
        modal[i].classList.add("d-block")
    })
}
for(let a = 0; a < modalClose.length; a++) {
    modalClose[a].addEventListener("click", (e) => {
        console.log(true)
        for(let i = 0;i < modal.length; i++) {
            modal[i].classList.add("d-none")
            modal[i].classList.remove("d-block")
        }
    })
}
  
for(let i = 0; i < addModal.length; i++) {
    
    addModal[i].addEventListener("click", (e) => {
        console.log(addModal)
        modal[i + 5].classList.remove("d-none")
        modal[i + 5].classList.add("d-block")
    })
}


// let bio_edit = document.querySelectorAll("#bio_edit")
// let bio_input = document.querySelectorAll("#bio_input")
// let bio_close = document.querySelectorAll("#bio_close")
// let bio_close_button = document.querySelectorAll("#bio_close_button")
// let update = document.querySelectorAll("#update")

// for(let i = 0; i < bio_edit.length; i ++) {
//     bio_edit[i].addEventListener("click", async (e) => {
//         bio_input[i].classList.remove("d-none")
//         bio_input[i].classList.add("d-block")
//     })

//     bio_close[i].addEventListener("click", (e) => {
//         bio_input[i].classList.remove("d-block")
//         bio_input[i].classList.add("d-none")
//     })

//     bio_close_button[i].addEventListener("click", (e) => {
//         bio_input[i].classList.remove("d-block")
//         bio_input[i].classList.add("d-none")
//     })

//     update[i].addEventListener("click", async (e) => {
//         console.log(e.target)
        
        
//     })
// }

// // fullname_edit.addEventListener("click", async (e) => {
// //     fullname_input.classList.remove("d-none")
// //     fullname_input.classList.add("d-block")
// // })

// // fullname_close.addEventListener("click", (e) => {
// //     fullname_input.classList.remove("d-block")
// //     fullname_input.classList.add("d-none")
// // })

// // fullname_close_button.addEventListener("click", (e) => {
// //     fullname_input.classList.remove("d-block")
// //     fullname_input.classList.add("d-none")
// // })