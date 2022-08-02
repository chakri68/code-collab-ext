function dragElement(elmnt, iframe) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    iframe.style.pointerEvents = "none";
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    iframe.style.pointerEvents = "all";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function addBox() {
  let div = document.createElement("div");
  div.id = "code-collab";
  let move = document.createElement("header");
  move.id = "code-collab-header";
  move.classList.add("modal-card-head");
  move.innerHTML = "<p class='modal-card-title'>codeCollab</p>";
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("delete");
  closeBtn.id = "code-collab-delete";
  closeBtn.ariaLabel = "close";
  move.appendChild(closeBtn);
  div.appendChild(move);
  let iframe = document.createElement("iframe");
  iframe.id = "code-frame";
  iframe.src = "https://code-collab.vercel.app/embed/min";
  div.appendChild(iframe);
  document.body.appendChild(div);
  dragElement(div, iframe);

  // Add an eventlistener to closeBtn to remove the div (#code-collab)
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(div);
  });
}

if (document.getElementById("code-collab")) {
  document.getElementById("code-collab").remove();
} else {
  addBox();
}
