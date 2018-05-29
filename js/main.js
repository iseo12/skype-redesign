const menu = document.querySelector('.menu')
const toggleClasses = document.querySelectorAll('.menu,.icon-bar,.modal')

menu.addEventListener('click',function(e) {
	e.preventDefault()
	for (let i = 0; i < toggleClasses.length; i++) {
		console.log(toggleClasses)
		toggleClasses[i].classList.toggle('open')
	}
})
