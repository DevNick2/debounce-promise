import request from './Promise.js'

const filterUsers = (name) => request(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)

function debounceEvent(time) {
  return function(fn, wait = 1000) {
    clearTimeout(time)

    time = setTimeout(() => {
      fn()
    }, wait)
  }
}

const debounce = debounceEvent()

function handleKeyUp(event){
  const elLoading = document.getElementById('loading')
  elLoading.style.display = 'block'
  debounce(async () => {
    const elDiv = document.getElementById('list')
    const elList = elDiv.querySelectorAll('li')
    if (elList.length) {
      elList.forEach(el => {
        el.remove()
      })
    }
    
    try {
      const users = await filterUsers(event.target.value)
      users.map(user => {
        const elLi = document.createElement('li')
        elLi.innerText = user.name
        elDiv.appendChild(elLi)
      })
      elLoading.style.display = 'none'

      console.log(users.map(user => user.name))
    } catch (error) {
      console.log(error)
      elLoading.style.display = 'none'
    }
    
    // filterUsers(event.target.value).then(users => {      
    //   users.map(user => {
    //     const elLi = document.createElement('li')
    //     elLi.innerText = user.name
    //     elDiv.appendChild(elLi)
    //   })

    //   console.log(users.map(user => user.name))
    // })
  })
}

document.querySelector("input").addEventListener("keyup", handleKeyUp)