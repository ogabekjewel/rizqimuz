function fetch_init() {
   
    document.querySelector("body").addEventListener("click", async (e) => {
        let item =  e.target.parentElement

        if(item.id === "admin_fetch") {
            let response = await fetch(`/admin/users/make-admin/${item.value}`, {
                method: "PATCH",
            })

            response = await response.json()
            if(response.ok) {
                window.location.reload()
            }
        }  
        if(item.id === "user-delete") {
            let response = await fetch(`/admin/users/delete/${item.value}`, {
                method: "DELETE",
            })

            response = await response.json()
            if(response.ok) {
                window.location.reload()
            }
        }
        // if(item.id === "update-category") {
        //     let update_category_input = document.querySelectorAll("#update_category_input")
        //     update_category_input.forEach((e) => {
        //         e.style.display = "block"
        //     })
        //     // let response = await fetch(`/admin/categories/update/${item.value}`, {
        //     //     method: "PATCH",
        //     // })

        //     // response = await response.json()
        //     // if(response.ok) {
        //     //     window.location.reload()
        //     // }
        // }

        if(item.id === "delete-category") {
            let response = await fetch(`/admin/categories/delete/${item.value}`, {
                method: "DELETE",
            })
            console.log(response)

            response = await response.json()
            if(response.ok) {
                window.location.reload()
            }
        }

        
        
    })

    
}

window.addEventListener("DOMContentLoaded", fetch_init)