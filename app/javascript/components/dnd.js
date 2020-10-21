import pieces from "./pieces.json"

const dnd = () => {
  const ta = document.getElementById("target-area1");
  if (ta) {
    let numClones = 0;
    let dragPiece = null;
    let rotatePiece = null;
    let offX = 0;
    let offY = 0;
    let rotating = false;
    let rotateInit = 0;
    let startX = 0;
    let startY =0;
    let fulcrumX = 0;
    let fulcrumY = 0;
    const rotateBreak = 42; // distance from center of rotated div where rotated div needs to be 'sped up' or 'slowed down' to track cursor
    const rotateDisc = `<div id='disc'></div>`;

    document.addEventListener('keydown', logKey);
    document.addEventListener('keyup', unlogKey);


    function selectColor (ev) {
      const bg = ev.target.value.replace("$", "").replace(" ", "-").toLowerCase();
      console.log('bg' + bg);
      // ev.target.parentNode.querySelector(".draggable").style = `backgroundColor: ${ev.target.value};`;
      // ev.target.parentNode.querySelector(".draggable").classList.remove("draggable camel");
      ev.target.parentNode.querySelector(".draggable").className = "draggable";
      ev.target.parentNode.querySelector(".draggable").classList.add(`${bg}`);
    }


    const selects = document.querySelectorAll(".color-select");
    selects.forEach(select => {
      select.addEventListener('change', selectColor);
    })


    function logKey(e) {


      // e.preventDefault();
      if(e.code === "AltLeft" ||  e.code === "AltRight") {
        ta.removeEventListener('dragover', dragover_handler);
        ta.removeEventListener('drop', drop_handler);
        const clones = Array.from(document.querySelectorAll(".clone"));
        clones.forEach(clone => {
          clone.draggable=  false;
          clone.removeEventListener('dragstart', dragstart_handler);
          // clone.removeEventListener('mouseover', setRotatePiece);
        });
        console.log('logKey' + rotatePiece);
        rotating = true;
        if (rotatePiece) {
          console.log(rotateInit);
          showDisc();
        };
      }
    }

    function unlogKey(e) {
      if(e.code === "AltLeft" ||  e.code === "AltRight") {
      ta.addEventListener('dragover', dragover_handler);
      ta.addEventListener('drop', drop_handler);
      const clones = Array.from(document.querySelectorAll(".clone"));
      clones.forEach(clone => {
        clone.draggable =  true;
        clone.addEventListener('dragstart', dragstart_handler);
        clone.addEventListener('mouseover', setRotatePiece);
        clone.addEventListener('mouseout', clearRotatePiece);
        // clone.removeEventListener('mouseover', showDisc);
        // clone.removeEventListener('mouseout', hideDisc);
      });
        rotating = false;
        console.log('something');
        if (rotatePiece) {
          rotatePiece.querySelector('#disc').remove();
          // hideDiscRemote();  //  function does not set currentRotate = null
        };
      }
    }


//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////     R O T A T E    /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


    function setRotatePiece(ev) {  // piece rollover function

      // ev.preventDefault();

      rotatePiece = ev.target;
        if (rotating) {
          showDisc();
        }
        pieces.pieces.forEach(piece => {
        if (piece.name === ev.target.dataset.name) {
          ;
          // piece.colors.forEach( clr => {
            if (ev.target.dataset.color in piece.colors) {
             const newImg  = piece.colors[ev.target.dataset.color];
             const oldSrc = document.querySelector("#big-image").src
             const urlArray = oldSrc.split("/");
             const oldImg =  (urlArray[urlArray.length - 1]);
             const newSrc = oldSrc.replace(oldImg, newImg);
             console.log (oldSrc);
             document.querySelector("#big-image").src = newSrc;
              document.querySelector("#big-image").classList.add("big-image-show");
            }
          // });
        }
        });
    }

    function clearRotatePiece(ev) {
      document.querySelector("#big-image").classList.remove("big-image-show");
      if (rotating) {
        hideDisc();
      }

      rotatePiece = null;
    }


    function showDisc (ev) {
      rotateInit = getCurrentRotation(rotatePiece);

      // fulcrumX = rotatePiece.getBoundingClientRect().x + ( rotatePiece.getBoundingClientRect().width / 2 );
      // fulcrumY = rotatePiece.getBoundingClientRect().y + ( rotatePiece.getBoundingClientRect().height / 2 );

      rotatePiece.removeEventListener('mouseover', setRotatePiece)
      rotatePiece.removeEventListener('mouseout', clearRotatePiece)
      rotatePiece.insertAdjacentHTML('beforeend', rotateDisc);
      const disc = rotatePiece.querySelector("#disc");
      const diameter = parseFloat(rotatePiece.style.width)
      disc.style.setProperty('--disc-diam', diameter + 20 + 'px');
      // const newTop = ((((disc.getBoundingClientRect().height / 2) * -1) + rotatePiece.getBoundingClientRect().height /2 ) + (trigOffsetX * trigMultiplier) + 'px');
      // const newLeft = ((((disc.getBoundingClientRect().width / 2) * -1) + rotatePiece.getBoundingClientRect().width /2 ) + (trigOffsetY * trigMultiplier) +  'px');

      const xMidpoint = rotatePiece.getBoundingClientRect().x + (rotatePiece.getBoundingClientRect().width/2) - rotatePiece.parentNode.getBoundingClientRect().x;

      const yMidpoint = rotatePiece.getBoundingClientRect().y + (rotatePiece.getBoundingClientRect().height/2) - rotatePiece.parentNode.getBoundingClientRect().y;

      const newLeft = -10 + 'px';
      const newTop =  (((diameter / 2) * -1) + (parseFloat(rotatePiece.style.height)/2) - 10 ) + 'px';

      console.log('(disc.style.width / 2)  '  + disc.style.cssText);
      console.log('newLeft '  + newLeft);


      disc.style.setProperty('--disc-top', newTop);
      disc.style.setProperty('--disc-left', newLeft);
      const rgba = window.getComputedStyle(rotatePiece).backgroundColor.replace("rgb", "rgba");
      const strokeColor = rgba.replace(")" , ", 0.3)");
      disc.style.setProperty('--disc-stroke', strokeColor);
      rotatePiece.removeEventListener('mouseout', hideDiscRemote);
      rotatePiece.removeEventListener('mouseover', showDisc);
      disc.addEventListener('mouseout', hideDisc);
      disc.addEventListener('mousedown', clickRotate);
      document.addEventListener('mouseup', unclickRotate);
    }

    function hideDiscRemote() {
      if (rotatePiece) {
        const disc = rotatePiece.querySelector("#disc");
        if (disc) {
        // disc.removeEventListener('mouseover', showDisc);
          console.log ("hideDiscRemote "  );
          disc.remove();
        }
      }

      document.removeEventListener('mousemove' , trackRotation);
    }

    function hideDisc () {
      hideDiscRemote();
          console.log ("hideDisc rollout " );
      rotatePiece = null;
    }




    function getCurrentRotation(el){
      var st = window.getComputedStyle(el, null);
      var tm = st.getPropertyValue("-webkit-transform") ||
               st.getPropertyValue("-moz-transform") ||
               st.getPropertyValue("-ms-transform") ||
               st.getPropertyValue("-o-transform") ||
               st.getPropertyValue("transform") ||
               "none";
      if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        /*
        a = values[0];
        b = values[1];
        angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
        */
        //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
        var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
        return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
      }
      return 0;
    }

    function clickRotate(ev) {
      startX = ev.clientX;
      startY = ev.clientY;
      rotateInit = getCurrentRotation(rotatePiece);
      document.addEventListener('mousemove' , trackRotation);
    }

    function unclickRotate(ev) {
      // ev.target.removeEventListener('mousedown', clickRotate);
      // ev.target.removeEventListener('mouseup' , unclickRotate);
      document.removeEventListener('mousemove' , trackRotation);
      if (ev.shiftKey) {
      const myRotate = getCurrentRotation(rotatePiece);
      const rotateToSnap = myRotate % 45;
      let snappedRotate = 0;
      if (rotateToSnap < 22.5 ) {
        snappedRotate = myRotate - rotateToSnap;
      } else {
        snappedRotate  = myRotate + (45 - rotateToSnap);
      }
      rotatePiece.transform = `rotate(${snappedRotate}deg`;
      }
    }

    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }

    function trackRotation (ev) {
      fulcrumX = rotatePiece.getBoundingClientRect().x + ( rotatePiece.getBoundingClientRect().width / 2 );
      fulcrumY = rotatePiece.getBoundingClientRect().y + ( rotatePiece.getBoundingClientRect().height / 2 );
      // console.log('fulcrumX '  + fulcrumX);
      // console.log('fulcrumY '  + fulcrumY);
      const compStyle = window.getComputedStyle(ev.target);
      const matrix = compStyle.transform.split("(");
      if (matrix[1]) {
        const matrixArray =  matrix[1].split(",");
        const rotation = ((180/Math.PI) * Math.atan2( ((0*matrixArray[2])+(1*matrixArray[3])),((0*matrixArray[0])-(1*matrixArray[1]))) - 90);
      };
//
      const xDiff = ev.clientX - fulcrumX;
      const yDiff = ev.clientY - fulcrumY;
      const hypotenuse = Math.sqrt((xDiff**2) + (yDiff**2));
      const hypMultiplier = .5;
      // console.log(hypotenuse);
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;

      const verticalBorder = (ev.target.getBoundingClientRect().x) +
      (ev.target.getBoundingClientRect().width / 2 );

      const horizontalBorder = ev.target.getBoundingClientRect().y +
      (ev.target.getBoundingClientRect().height / 2);

      let quadrant = 1;

      if (ev.clientX > verticalBorder) {
        quadrant += 1;
      }

      if (ev.clientY > horizontalBorder) {
        quadrant += 2;
      }

      let compositeDelta = 0;

      switch (quadrant) {
        case 1 :
          compositeDelta = deltaX + (deltaY * -1 );
          break;
        case 2 :
          compositeDelta = deltaX + deltaY;
          break;
        case 3 :
          compositeDelta = (deltaX + deltaY) * -1;
          break;
        case 4 :
          compositeDelta = (deltaX * -1 ) + deltaY;
          break;
      }
      // ev.target.style.transform = `rotate(30deg)`;
      // console.log("-------------------");
      // console.log(compositeDelta);
      if (hypotenuse > rotateBreak) {
          // compositeDelta = compositeDelta * (((hypotenuse - rotateBreak)**12) * hypMultiplier);
         }  else {
          // compositeDelta = compositeDelta * (((rotateBreak - hypotenuse)**12) * hypMultiplier);
         };



      const newRotate = rotateInit + compositeDelta;
      ev.target.style.transform = `rotate(${newRotate}deg)`;
      rotatePiece.style.transform = `rotate(${newRotate}deg)`;
        // console.log("rotateInit " + rotateInit);

      startX = ev.clientX;
      startY = ev.clientY;
      rotateInit = getCurrentRotation(ev.target);
    }


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////    DRAG AND DROP    /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


    const dragstart_handler = (ev) => {
        rotateInit = getCurrentRotation(ev.target);
        console.log(rotateInit);
      // ev.preventDefault();
      dragPiece = ev.target;
        dragPiece.style.transform = "rotate(${rotateInit}deg)";
        ev.dataTransfer.setData("application/my-app", dragPiece.id);
        // dragPiece.addEventListener("onMouseUp", dropChord(event), false);
        setMouseOffsets();

        // function handleDragStart(e) {

        //   this.style.opacity = '0.3';
        //   this.style.transition = "opacity .5s";
        // }


        // function handleDragEnd(e) {
        //   this.style.opacity = '1';
        //   this.style.transition = "none";
        //   this.removeEventListener('dragend', handleDragEnd, false);
        // }
    };



    function setMouseOffsets() {
      offX = event.offsetX;
      offY = event.offsetY;
    }

    document.querySelectorAll('.draggable').forEach( dr => {
      dr.addEventListener('dragstart', dragstart_handler);
    })



    const dragover_handler = (ev) => {
      // console.log("dragover_handler");
      ev.preventDefault();

      checkBoundaries(ev);


      let overlap = 0;
      Array.from(ev.target.children).forEach(function(element) {
        if (element != dragPiece && dragIntersection(ev, element)) {
          console.log('true');
        }
      });

    };

    document.querySelector('#target-area1').addEventListener('dragover', dragover_handler);

    function checkBoundaries (ev) {
      if (ev.clientX - offX <= ta.getBoundingClientRect().x) {
        // dragPiece.style.position = 'absolute';
        // dragPiece.style.left = ta.getBoundingClientRect().x + 'px';
        console.log('dragPiece.id' + dragPiece.id);
      };
      // if (ev.currentTarget.getBoundingClientRect().x + el.getBoundingClientRect().width >= ta.getBoundingClientRect().x + ta.getBoundingClientRect().width) {
      //   // (el);
      // };
    };

    function dragIntersection(ev, element) {
        // console.log('element.getBoundingClientRect().x + element.getBoundingClientRect().width > (ev.clientX - offX)   '  + (element.getBoundingClientRect().x + element.getBoundingClientRect().width > (ev.clientX - offX)));
        // console.log(' (ev.clientX - offX) + dragPiece.getBoundingClientRect().width > element.getBoundingClientRect().x)    '  +  (ev.clientX - offX) + dragPiece.getBoundingClientRect().width > element.getBoundingClientRect().x);
        // console.log('(element.getBoundingClientRect().y + element.getBoundingClientRect().height < (ev.clientY - offY)   '  + (element.getBoundingClientRect().y + element.getBoundingClientRect().height < (ev.clientY - offY)));
        // console.log('(ev.clientY - offY) + dragPiece.getBoundingClientRect().height > element.getBoundingClientRect().y)   '  + (ev.clientY - offY) + dragPiece.getBoundingClientRect().height > element.getBoundingClientRect().y);



       return ( element.getBoundingClientRect().x + element.getBoundingClientRect().width > (ev.clientX - offX) &&
          (ev.clientX - offX) + dragPiece.getBoundingClientRect().width > element.getBoundingClientRect().x) &&
          (element.getBoundingClientRect().y + element.getBoundingClientRect().height > (ev.clientY - offY) &&
          (ev.clientY - offY) + dragPiece.getBoundingClientRect().height > element.getBoundingClientRect().y);
    }

    function dragLeftOverlap(ev, element) {
        return ((element.getBoundingClientRect().x + element.getBoundingClientRect().width) - (ev.clientX - offX));
    }

    function dragRightOverlap(ev, element) {
        return ((ev.clientX - offX) + dragPiece.getBoundingClientRect().width) - (element.getBoundingClientRect().x );
    }

    function arrayIntersection(element1, element2) {
     return ( element2.getBoundingClientRect().x + element2.getBoundingClientRect().width > element1.getBoundingClientRect().x &&
        element1.getBoundingClientRect().x + element1.getBoundingClientRect().width > element2.getBoundingClientRect().x  &&
        element2.getBoundingClientRect().y + element2.getBoundingClientRect().height > element1.getBoundingClientRect().y &&
        element1.getBoundingClientRect().y + element1.getBoundingClientRect().height > element2.getBoundingClientRect().y
        );
    }

    function arrayOverlap(element1, element2) {
      return (((element2.getBoundingClientRect().x + element2.getBoundingClientRect().width) - element1.getBoundingClientRect().x) + 4);
    }


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    ////////////////////                     /////////////////////////////////
    //////////////////////     D R O P     ///////////////////////////////////
    ///////////////////////              /////////////////////////////////////
    //////////////////////////        ////////////////////////////////////////
    ////////////////////////////    //////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////




    function drop_handler(ev) {

      ev.preventDefault();

      const data = ev.dataTransfer.getData("application/my-app");
      let el;
      // console.log("document.getElementById(data).parentNode.id  " + document.getElementById(data))
      const clone = document.getElementById(data).parentNode.parentNode.id == "library" ? true : false;
      if (clone) {
        el  = document.getElementById(data).cloneNode([true]);
        el.id = "clone" + numClones;
        numClones ++ ;
        el.classList.add('clone');
        // el.style.left = (((el.dataset.roomwidth - parseInt(el.style.width))/2) * -1) + "px";
        // el.style.top = (((el.dataset.roomheight - parseInt(el.style.height))/2) * -1) + "px";
        el.style.width = el.dataset.roomwidth + "px";
        el.style.height = el.dataset.roomheight + "px";
        el.style.transition = "height .5s";


        // console.log('el.dataset.roomwidth  ' +  el.dataset.roomwidth);
        el.addEventListener("dragstart", dragstart_handler);
        el.addEventListener("mouseover", setRotatePiece);
        el.addEventListener("mouseout", clearRotatePiece);
        // console.log ("clone " + el)
        // const tr = el.querySelector(".trash");
        // tr.addEventListener('click', deleteChord);
        // tr.insertAdjacentHTML("beforeend", '<div class="delete-chord"><i class="fas fa-trash"></i></div> ')
      } else {
        el  = document.getElementById(data);
      }

      rotatePiece  = el;

      if (el.id != dragPiece.id) {
        ev.target.appendChild(el);
      }
      el.style.position = 'absolute';
      let newX = ((ev.screenX - window.screenX) - document.getElementById('target-area1').parentNode.offsetLeft)
      - document.getElementById('target-area1').offsetLeft - offX;
      let newY =  ev.pageY - document.getElementById('target-area1').getBoundingClientRect().y - offY;
      if (newX < 0) {
        newX = 0;
      }
      if (newY < 0) {
        newY = 0;
      }
  if (newX + parseFloat(el.style.width) > document.getElementById('target-area1').getBoundingClientRect().width) {
        newX = document.getElementById('target-area1').getBoundingClientRect().width - parseFloat(el.style.width) - 2;
      }
 if (newY + parseFloat(el.style.height) > document.getElementById('target-area1').getBoundingClientRect().height) {
        newY = document.getElementById('target-area1').getBoundingClientRect().height - parseFloat(el.style.height) - 2;
      }

      el.style.left = newX + "px";
      el.style.top = newY + "px";
    }

    document.querySelector('#target-area1').addEventListener('drop', drop_handler);


  }

  };

export { dnd };
