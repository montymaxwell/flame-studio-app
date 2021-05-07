import { get } from "../../lib/lib.js";

let mouseX, mouseY, node, parent, nodeX, nodeY, width, height;

const dom = document.querySelector('.document');
const dom_rect = dom.getBoundingClientRect();
const text = document.querySelector('.mpos');

const top_Offset = (elem) => {
  const node = get.parentRect(elem);
  const calc = node.top - dom_rect.top;
  const value = Math.abs(calc);

  return value;
}

const right_Offset = (elem) => {
  const node = get.parentRect(elem);
  const calc = dom_rect.right - node.right;
  const value = Math.abs(calc);

  return value;
}

const bottom_Offset = (elem) => {
  const node = get.parentRect(elem);
  const calc = dom.scrollHeight - node.height;
  const value = Math.abs(calc);

  return value;
}

const left_Offset = (elem) => {
  const node = get.parentRect(elem);
  const calc = dom_rect.left - node.left;
  const value = Math.abs(calc);

  return value;
}

export default function _node_controls(){
  dom.addEventListener('mousedown', mdown => {
    if(mdown.target.matches('.node-resizer.nw')){
      const node = document.querySelector('#nodeSelected');
      const parent = get.parent(node);
      
      const yOffset = bottom_Offset(node) - top_Offset(node);
      const xOffset = right_Offset(node) - left_Offset(node);

      //console.log(yOffset);
      //console.log(xOffset);

      parent.style.bottom = `${yOffset}px`;
      parent.style.right = `${xOffset}px`;
      parent.style.position = 'absolute';


      dom.addEventListener('mousemove', _northwest_resizer);

      return nodeX = node.clientWidth, nodeY = node.clientHeight;
    }
    else if(mdown.target.matches('.node-resizer.sw')){
      const node = document.querySelector('#nodeSelected');
      const parent = get.parent(node);

      const yOffset = top_Offset(node);
      const xOffset = right_Offset(node);

      parent.style.top = `${yOffset}px`;
      parent.style.right = `${xOffset}px`;
      parent.style.position = 'absolute';

      dom.addEventListener('mousemove', _southwest_resizer);

      return nodeX = node.clientWidth, nodeY = node.clientHeight;
    }
  });

  dom.addEventListener('mouseup', mup => {
    const node = document.querySelector('#nodeSelected');
    const parent = get.parent(node);

    parent.removeAttribute('style');

    dom.removeEventListener('mousemove', _northwest_resizer);
    dom.removeEventListener('mousemove', _southwest_resizer);
  });
}

function _northwest_resizer(mouse){
  node = document.querySelector('#nodeSelected');
  parent = get.parentRect(node);
  const main = get.parent(node);

  mouseX = mouse.clientX - dom_rect.left;
  mouseY = mouse.clientY - dom_rect.top;

  width = Math.abs(nodeX - mouseX);
  height = Math.abs(nodeY - mouseY);

  
  text.innerHTML = `X : ${width} Y: ${height}`;

  main.style.width = `${width}px`;
  main.style.height = `${height}px`;
}

function _southwest_resizer(mouse){
  node = document.querySelector('#nodeSelected');
  parent = get.parentRect(node);
  const main = get.parent(node);

  mouseX = mouse.clientX - dom_rect.left;
  mouseY = mouse.clientY - nodeY;

  width = Math.abs(nodeX - mouseX);
  height = Math.abs(mouseY + parent.bottom);

  text.innerHTML = `X : ${width} Y: ${height}`;

  //main.style.width = `${width}px`;
  //main.style.height = `${height}px`;

}