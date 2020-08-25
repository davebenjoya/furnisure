const dnd = () => {
console.log("00000000");
  const ta = document.getElementById("target-area1");
    let numClones = 0;
    let currentDrag = null;
    let offX = 0;
    let offY = 0;



    const dragstart_handler = (ev) => {
      currentDrag = ev.currentTarget;
      console.log("currentDrag " + currentDrag);
      ev.dataTransfer.setData("application/my-app", currentDrag.id);
      currentDrag.addEventListener("onMouseUp", dropChord(event), false);

      if (currentDrag.parentNode.id != "library" ) {
        currentDrag.addEventListener('dragstart', handleDragStart, false);
        currentDrag.addEventListener('dragend', handleDragEnd, false);
      }
      function handleDragStart(e) {

        this.style.opacity = '0.3';
        this.style.transition = "opacity .5s";
      }


      function handleDragEnd(e) {
        this.style.opacity = '1';
        this.style.transition = "none";
        this.removeEventListener('dragend', handleDragEnd, false);
      }

      function dropChord(event) {
          offX = event.offsetX;
          offY = event.offsetY;
      }
    }

    document.querySelectorAll('.draggable').forEach( dr => {
      dr.addEventListener('dragstart', dragstart_handler);
    })

    const dragover_handler = (ev) => {
      ev.preventDefault();

      const clones =  Array.from(ev.target.children);
      const sortedClones = clones.sort((a, b) => parseInt(a.style.left) - parseInt(b.style.left));
      let leftClones = [];
      let rightClones = [];
      sortedClones.forEach(function(element) {
          if (element != currentDrag) {
          if (parseInt(element.style.left) < parseInt(ev.clientX - ta.getBoundingClientRect().x)) {
            leftClones.unshift(element); // from center to left
          } else {
            rightClones.push(element); // from center to right
          }
        }
      });

      let overlap = 0;
      if (leftClones.length > 0) {
        if (dragIntersection(ev, leftClones[0]) == true ) {
          overlap = dragLeftOverlap(ev, leftClones[0]);
          ripple(leftClones, overlap, 'left');
        }
      }

      if (rightClones.length > 0) {
        if (dragIntersection(ev, rightClones[0]) == true ) {
          overlap = dragRightOverlap(ev, rightClones[0]);
          rippleRight(rightClones, overlap);
          // ripple(rightClones, overlap, 'right');
        }
      }
    };

    Array.from(document.querySelectorAll('.target-area')).forEach( tgt => {
      tgt.addEventListener('dragover', dragover_handler);
    });


    function ripple(array, overlap, direction) {
      let ovr = overlap;
      let colliding = true;
      let oldX = parseInt(array[0].style.left);
      let newX = direction == 'left' ? (oldX - (ovr + 4)) : oldX + (ovr + 4) ;
      array[0].style.left = newX + 'px';
      checkBoundaries(array[0]);

      for (let i = 0; i < array.length - 1; i++) {
        const chord1 = direction === 'left' ? array[i] : array[i + 1];
        const chord2 = direction ==='left' ? array[i + 1] : array[i];
        if (arrayIntersection(chord1, chord2)) {
        ovr = arrayOverlap(chord1, chord2);
        oldX = parseInt(chord2.style.left);
        newX = direction == 'left' ? (oldX - ovr) -4 : oldX + (ovr + 4) ;
        chord2.style.left = newX + 'px';
        checkBoundaries(chord2);
        }
      }
    };

    function rippleRight(array, overlap) {
      let ovr = overlap;
      let colliding = true;
      let oldX = parseInt(array[0].style.left);
      let newX = oldX + (ovr + 4) ;
      array[0].style.left = newX + 'px';
      checkBoundaries(array[0]);

      for (let i = 0; i < array.length - 1; i++) {
        const chord1 = array[i];
        const chord2 = array[i + 1];
        if (arrayIntersection(chord2, chord1)) {
        ovr = arrayOverlap(chord2, chord1);
        oldX = parseInt(chord2.style.left);
        newX = oldX + (ovr + 4);
        chord2.style.left = newX + 'px';
        checkBoundaries(chord2);
        }
      }
    };

    function checkBoundaries (el) {
      if (el.getBoundingClientRect().x <= ta.getBoundingClientRect().x) {
        deleteLeft(el);
      };
      if (el.getBoundingClientRect().x + el.getBoundingClientRect().width >= ta.getBoundingClientRect().x + ta.getBoundingClientRect().width) {
        deleteLeft(el);
      };
    };

    function dragIntersection(ev, element) {
      return !(
       ( element.getBoundingClientRect().x > (ev.clientX - offX) + currentDrag.getBoundingClientRect().width ||
            element.getBoundingClientRect().x + element.getBoundingClientRect().width < (ev.clientX - offX))
      );
    }

    function dragLeftOverlap(ev, element) {
        return ((element.getBoundingClientRect().x + element.getBoundingClientRect().width) - (ev.clientX - offX));
    }

    function dragRightOverlap(ev, element) {
        return ((ev.clientX - offX) + currentDrag.getBoundingClientRect().width) - (element.getBoundingClientRect().x );
    }

    function arrayIntersection(element1, element2) {
      return !(element2.getBoundingClientRect().x + element2.getBoundingClientRect().width < element1.getBoundingClientRect().x);
    }

    function arrayOverlap(element1, element2) {
      return (((element2.getBoundingClientRect().x + element2.getBoundingClientRect().width) - element1.getBoundingClientRect().x) + 4);
    }

    function drop_handler(ev) {
      ev.preventDefault();

      console.log("ev " + ev);
      const data = ev.dataTransfer.getData("application/my-app");
      let el;
      const clone = document.getElementById(data).parentNode.id == "library" ? true : false;
      if (clone) {
        el  = document.getElementById(data).cloneNode([true]);
        el.id = "clone" + numClones;
        numClones ++ ;
        el.class = 'clone';
        el.addEventListener("dragstart", dragstart_handler);
        // const tr = el.querySelector(".trash");
        // tr.addEventListener('click', deleteChord);
        // tr.insertAdjacentHTML("beforeend", '<div class="delete-chord"><i class="fas fa-trash"></i></div> ')
      } else {
        console.log ("no clone")
        el  = document.getElementById(data);
      }

      if (el.id != currentDrag.id) {
        ev.target.appendChild(el);
      }
      el.style.position = 'absolute';
      el.style.left = ( (ev.screenX - window.screenX) - document.getElementById('target-area1').parentNode.offsetLeft) - document.getElementById('target-area1').offsetLeft - offX + "px";
// el.style.top = '0px';
console.log('window.screenY' + window.screenY);
console.log("ev.pageY  " + ((ev.pageY)));
const newY =  (ev.pageY- document.getElementById('target-area1').getBoundingClientRect().y) -offY
// console.log("  " + ((ev.screenY - window.screenY) - document.getElementById('target-area1').offsetTop));
      el.style.top = newY + "px";
    // el.style.top = ( (ev.screenY - window.screenY) - document.getElementById('target-area1').parentNode.offsetTop) - document.getElementById('target-area1').offsetTop - offY + "px";

    }

    document.querySelector('#target-area1').addEventListener('drop', drop_handler);

    const deleteChord = (ev) => {
      const chord = (ev.target.parentNode.parentNode.parentNode.parentNode);
      console.log('el');
      chord.parentNode.removeChild(chord);
    }

    const deleteLeft = (el) => {
      el.remove();
      // const left =  el.style.left;
      // el.addEventListener('transitionend', () => el.remove());
      // // el.style = 'transform: scale(0, .5); opacity:0; transition: all .5s;';
      // el.style = 'opacity:0; left:${left}; transition: all .5s;';
    }
  };

export { dnd };
