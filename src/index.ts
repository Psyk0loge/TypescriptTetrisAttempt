/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const playerBlock = document.querySelector<HTMLDivElement>("#color-box")

if(playerBlock != null){

  console.log(playerBlock.offsetTop)
  for(let i = 0; i<100; i++){
    playerBlock.style.top +=1
  }

  
}

console.log("HI")