import { flame as app, create, get } from '../lib/lib.js';
import Settings from './settings.js';
import _virtual_dom from './dom/dom.js';
import _auto_arrange from './node/node_auto_arrange.js';
import _node_controls from './node/node_controls.js';
import _node_editing from './node/node_editing.js';
import _dom_node from './node/node.js';

let target;
const item = '.item';
const node = '.node';
const dropArea = '.document';

window.addEventListener('load', main);

function main(){
  const { ipcRenderer } = require('electron');
  const form = ipcRenderer;

  minimize.addEventListener('click', () => {
    form.send('minimize');
  });
  
  maximize.addEventListener('click', () => {
    form.send('maximize');
  });
  
  exit.addEventListener('click', () => {
    form.send('close');
  });

  settings.addEventListener('click', () => {
    const popupWindow = document.querySelector('.popup-win');
    popupWindow.classList.add('active');
    popupWindow.id = 'popupWinOpen';

    Settings(true);
  });

  exitSettings.addEventListener('click', () => {
    const popupWindow = document.querySelector('.popup-win');
    popupWindow.classList.remove('active');
    popupWindow.id = 'popupWinClosed';

    Settings(false);
  });

  _app_process();
}

function _app_process(){
  _virtual_dom();
  _eventDraggableItems();
  _eventDropableAreas();
  _dom_node();

  document.addEventListener('click', click => {
    target = click.target;

    if(target.matches('.item-manager')){
      if(!target.classList.contains('active')){
        target.classList.add('active');
      } else {
        target.classList.remove('active');
      }
    }
  });
}

function _eventDraggableItems(){
  app.this('all', item).attr('draggable', 'true');

  app.event('dragstart', item, dragstart => {
    target = dragstart.target;
    target.id = 'itemDragging';
  });

  app.event('dragend', item, dragend => {
    target = dragend.target;
    target.removeAttribute('id');
  });

  app.event('dragstart', node, dragstart => {
    target = dragstart.target;
  });

  app.event('dragend', node, dragend => {
    target = dragend.target;
  });
}

function _eventDropableAreas(){
  const dropDefaults = (param) => {
    param.preventDefault();
    param.stopPropagation();
  }

  app.event('dragover', dropArea, dragover => {
    dropDefaults(dragover);
    target = dragover.target;

    const autoArrange = _auto_arrange(dropArea, dragover.clientY);
  });

  app.event('drop', dropArea, drop => {
    dropDefaults(drop);
    target = drop.target;

    _nodeStructure(target);
  });

  app.event('dragover', node, dragover => {
    dropDefaults(dragover);
    target = dragover.target;

    const autoArrange = _auto_arrange(node, dragover.clientY);
  });

  app.event('drop', node, drop => {
    dropDefaults(drop);
    target = drop.target;

    //_nodeStructure(target);
  });
}

function _nodeStructure(target){
  const main = create.node('div', 'nodeContainer', target).class('node-container');
  const controlmain = create.node('div', 'nodeControlContainer', main).class('node-control-container');
  const controls = create.node('div', 'nodeControls', controlmain).class('node-control');

  const control_nw = create.node('div', 'nodeResizerNW', controls).class('node-resizer', 'nw');
  const control_ne = create.node('div', 'nodeResizerNE', controls).class('node-resizer', 'ne');

  _nodeData(controls);

  const control_sw = create.node('div', 'nodeResizerSW', controls).class('node-resizer', 'sw');
  const control_se = create.node('div', 'nodeResizerSE', controls).class('node-resizer', 'se');
}

function _nodeData(drop){
  const itemBeingDragged = document.querySelector('#itemDragging');
  const getElementType = itemBeingDragged.getAttribute('data-elem');
  const getClassComponent = itemBeingDragged.getAttribute('data-class');

  if(itemBeingDragged){
    const node = create.node(getElementType, 'node', drop).class('node', getClassComponent);
  }
}