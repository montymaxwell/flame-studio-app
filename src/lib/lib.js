export const flame = {
  this : (query, selector) => {
    const commands = {
      attr : (type, value) => {
        let target;
        if(query == 'all'){
          target = document.querySelectorAll(selector);
          target.forEach(targ => {
            targ.setAttribute(type, value);
          })
        }
        else if(query == 'first'){
          target = document.querySelector(selector);
          target.setAttribute(type, value);
        }
      }
    }
    return commands;
  },
  event : (type, selector, callback) => {
    document.addEventListener(type, ev => {
      if(ev.target.matches(selector)) callback(ev);
    });
  }
}

export const create = {
  node : (element, id, target) => {
    const domElement = document.createElement(element);
    domElement.id = id;

    target.appendChild(domElement);
    
    const extend = {
      class : (...classes) => {
        for(let i = 0; i < classes.length; i++){
          domElement.classList.add(classes[i]);
        }

        return domElement;
      }
    }
    return extend;
  },
  // might be useful someday
  nodes : (...elements) => {
    const extend = {
      at : (target) => {
        for(let i = 0; i < elements.length; i++){
          target.appendChild(document.createElement(elements[i]));
        }
      }
    }
    return extend;
  }
}

export const get = {
  parent : (elem) => {
    let elem1 = elem.parentElement;
    let elem2 = elem1.parentElement;
    let elem3 = elem2.parentElement;

    return elem3;
  },
  parentRect : (elem) => {
    const thisElem = get.parent(elem);
    const rect = thisElem.getBoundingClientRect();

    return rect;
  }
}