let target;

export default function _virtual_dom(){
  const virtualDOM = document.querySelector('.document');
  const controls = document.querySelector('.dom-editing-nav');
  const dom_width = document.getElementById('dom-width');
  const dom_height = document.getElementById('dom-height');
  const zoomValue = document.getElementById('dom-zoom');

  zoomValue.innerHTML = '100%';
  virtualDOM.style.transform = 'scale(1.0)';

  const DOMListen = new ResizeObserver(elems => {
    for(let elem of elems){
      const DOMElement = elem.contentRect;
  
      let final_width = Math.ceil(DOMElement.width);
      let final_height = Math.ceil(DOMElement.height);
  
      dom_width.innerHTML = `W : ${final_width}px`;
      dom_height.innerHTML = `H : ${final_height}px`;
    }
  });

  let DOMdimensions = DOMListen.observe(virtualDOM);

  controls.addEventListener('click', click => {
    target = click.target;

    if(target.matches('.zoom-in')){
      DOMEvent_ZoomIn(virtualDOM);
    }
    else if(target.matches('.zoom-out')){
      DOMEvent_ZoomOut(virtualDOM);
    }
    else if(target.matches('.flip')){
      const domX = virtualDOM.clientWidth;
      const domY = virtualDOM.clientHeight;

      if(target.classList.contains('flipped')){
        target.classList.remove('flipped');
        const newDOMX = `${domY}px`;
        const newDOMY = `${domX}px`;
        
        virtualDOM.style.width = newDOMX;
        virtualDOM.style.height = newDOMY;
      }
      else {
        target.classList.add('flipped');
        const newDOMX = `${domY}px`;
        const newDOMY = `${domX}px`;

        virtualDOM.style.width = newDOMX;
        virtualDOM.style.height = newDOMY;
      }
    }
    else if(target.matches('.emulate-screen')){
      const getValue = target.querySelector('.screen-size').innerHTML;
      virtualDOM.style.width = `${getValue}px`;
    }

  });
}

// he made my life a whole lot easier, thanks!
// https://stackoverflow.com/users/6328636/sumit-ghewade
let zoomScale = 
[
  0.25,
  0.5,
  0.75,
  1.0,
  1.25,
  1.5,
  1.75,
  2
];
let index = 4;
let value;

function DOMEvent_ZoomIn(target){
  if(index < zoomScale.length - 1){
    index += 1;
    value = zoomScale[index];
    Visuals_ZoomValue(value);
    
    target.style.transform = `scale(${value})`;
  }
}

function DOMEvent_ZoomOut(target){
  if(index > 0){
    index -= 1;
    value = zoomScale[index];
    Visuals_ZoomValue(value);
    
    target.style.transform = `scale(${value})`;
  }
}
// https://stackoverflow.com/users/6328636/sumit-ghewade

function Visuals_ZoomValue(value){
  const zoomValue = document.getElementById('dom-zoom');
  
  switch(value){
    case 0.25:
      zoomValue.innerHTML = '25%';
    break;
    
    case 0.5:
      zoomValue.innerHTML = '50%';
    break;

    case 0.75:
      zoomValue.innerHTML = '75%';
    break;

    case 1:
      zoomValue.innerHTML = '100%';
    break;

    case 1.25:
      zoomValue.innerHTML = '125%';
    break;

    case 1.5:
      zoomValue.innerHTML = '150%';
    break;

    case 1.75:
      zoomValue.innerHTML = '175%';
    break;

    case 2:
      zoomValue.innerHTML = '200%';
    break;
  }
}