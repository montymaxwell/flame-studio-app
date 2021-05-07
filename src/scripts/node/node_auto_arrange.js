export default function _auto_arrange(region, y){
  const regions = document.querySelectorAll(region);

  regions.forEach(region => {
    const draggables =  [...region.querySelectorAll('.node:not(#itemDragging)')];

    return draggables.reduce((closest, child) => {
      const BoundingBox = child.getBoundingClientRect();
      const offset = y - BoundingBox.top - BoundingBox.height / 2;

      if(offset < 0 && offset > closest.offset){
        return { offset : offset, element : child };
      }
      else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  });

  return regions;
}