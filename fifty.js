//here we make a function called makeMarquee
function makeMarquee() {
  const title = 'FIFTY Music Festival - November 10-12, Desert Valley'

  //an array is a list of things
  ////here we create a new empty array with 50 spaces in it
  ////then we fill it with the text from the title (50 times)
  ////we then join it together as one text string using a ' -- '
  const marqueeText = new Array(50).fill(title).join(' — ')

  // 1. we want to grab our marquee span from the HTML
  // 2. we want to set our repeating title as the content

  // querySelector and querySelectorAll ar the same as $ in jQuery
  const marquee = document.querySelector('.marquee span')

  //using inner HTML lets us set the content inside an element
  marquee.innerHTML = marqueeText
  console.log(marquee)
}

//here we actually run the makeMarquee function
makeMarquee()

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//here we grab all of the circles from the HTML
const circles = document.querySelectorAll('.circle')

//circles returns us an array so we need to loop through it
//// inside of the forEach we get access to individual element
// along with its index
circles.forEach((circle, index) => {
  //in here we get access to each one as 'circle
  circle.animate(
    [
      //keyframes
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ],
    {
      // here we use the index to create a staggered animation delay
      delay: 300 * index,
      duration: 3000,
      iterations: Infinity
    }
  )
})

const squiggles = document.querySelectorAll('.squiggle')

squiggles.forEach((squiggle, index) => {
  //get a random number between 0 - 45 using our random function from stack overflow
  // create a bit of randomness for our animation delay

  const randomNumber = random(0, 45)

  squiggle.animate(
    [
      //keyframes
      { transform: 'rotate(0deg)' },
      // how we join our random number into our rotate property
      //{transform: 'rotate(' + randomNumber + 'deg)'},
      { transform: `rotate(${randomNumber}deg)` },
      { transform: 'rotate(0deg)' }
    ],
    {
      // here we use the index to create a staggered animation delay
      delay: 300 * index,
      duration: 5000,
      iterations: Infinity
    }
  )
})

//here we want to detect when our section enters the viewport
////when it does, we want to add a class of "in-viewport"
//when it exits, we want to remove the class again
inView('.section')
  .on('enter', section => {
    //classList.add is the same as jQuery's .addClass() method, but the vanilla javascript version
    section.classList.add('in-viewport')
  })
  .on('exit', section => {
    section.classList.remove('in-viewport')
  })

// here we set the class only to add once we have scrolled 0.2 of our section into the viewport
inView.threshold(0.2)

// select each section on our page and loop through them
// in each section, grab the artists and shapes
// to add transition delay effects
// we want to make sure our shapes only fade in after our artists

const sections = document.querySelectorAll('.section')

sections.forEach((section, index) => {
  const artists = section.querySelectorAll('.lineup li')
  const shapes = section.querySelectorAll('.shape')

  artists.forEach((artist, index) => {
    const delay = index * 100
    artist.style.transitionDelay = delay + 'ms'
  })

  shapes.forEach((shape, index) => {
    //we are setting our delay up to only start once all of our artists have faded in, using the .length property
    const delay = (artists.length + index) * 100
    shape.style.transitionDelay = delay + 'ms'
  })
})


//whenever we click a .js-scroll link, we want to run a function
//we want to stop the link from jumping straight to our section (its default behaviour)
//we want to find out the href attribute, and then grab that element
//then scroll to it using scroll into view
//
const scrollLinks = document.querySelectorAll('.js-scroll')

scrollLinks.forEach(link => {

  //addEventListener is jus the same as jQuery's .on()
  //we can listen for events and then run a function
  link.addEventListener('click', (event) => {
    //using the event keyword, we. get access to a snapshot of what happened when we clicked on the lin

    //this will block default browser behaviour of the link jumping to the href attribute
    event.preventDefault()

    //here we grab the href from our link
    const href = link.getAttribute('href')
    //here we use the new scrollIntoView feature to scroll to our desired element in a smooth fashion
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
  })
})