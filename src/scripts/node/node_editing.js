import { get } from "../../lib/lib.js";

let inp, value;

export default function _node_editing(){
  const node = document.querySelector('#nodeSelected');
  const parent = get.parent(node);

  document.addEventListener('input', input => {
    inp = input.target;
    value = inp.value;

    console.log(node);

    if(inp.matches('#nameEditor')){
      node.setAttribute('data-name', value);
    }
    else if(inp.matches('#posX')){
      parent.style.left = value;
    }
    else if(inp.matches('#posY')){
      parent.style.top = value;
    }
    else if(inp.matches('#scaleX')){
      parent.style.width = value;
    }
    else if(inp.matches('#scaleY')){
      parent.style.height = value;
    }
    else if(inp.matches('#rotX')){
      parent.style.transform = `rotateX(${value})`;
    }
    else if(inp.matches('#rotY')){
      parent.style.transform = `rotateY(${value})`;
    }
    else if(inp.matches('#fontSize')){
      node.style.fontSize = `${value}`; 
    }
    else if(inp.matches('#fontWeight')){
      node.style.fontWeight = value;
    }
    else if(inp.matches('#fontColor')){
      node.style.color = value;
    }
    else if(inp.matches('bgColor')){
      node.style.backgroundColor = value;
    }

  });

}