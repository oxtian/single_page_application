/* ======================================== Public Methods ========================================= */
function changePage(elementId) {
    var pages = ['homePage', 'seasonPage'];
    // window.location.hash = (elementId !== 'home' || elementId != 'seasonPage') ? elementId : null;
    pages.forEach(function(element){
        if(element == elementId) {
            document.getElementById(element).style = '';
        } else {
            document.getElementById(element).style = 'display:none;';
        }
    });
}

function scrollTowards(elementId) {
    if(elementId !== 'home') {
        window.location.hash = elementId;
        changePage('homePage');
    }

    var startYPos = currentYPosition();
    var targetYPos = targetYPosition(elementId);
    // bla bla bla? if yes : if no
    var distance = targetYPos > startYPos ? (targetYPos - startYPos) : (startYPos - targetYPos);
    if (distance < 100) {
        scrollTo(0, targetYPos);
        return;
    }

    var speed = Math.round(distance / 100);
    if (speed >= 20) {
        speed = 20;
    }

    var step = Math.round(distance / 25);
    var leapY = targetYPos > startYPos ? (startYPos + step) : startYPos - step;
    var timer = 0;
    
    if (targetYPos > startYPos) {
        for (var i = startYPos; i < targetYPos; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > targetYPos) leapY = targetYPos;
            timer++;
        }
        return;
    }
    for (var i = startYPos; i > targetYPos; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < targetYPos) {
            leapY = targetYPos;
        }
        timer++;
    }
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var aHttpRequest = new XMLHttpRequest();
        aHttpRequest.onreadystatechange = function() { 
            if (aHttpRequest.readyState == 4 && aHttpRequest.status == 200)
                aCallback(aHttpRequest.responseText);
        }

        aHttpRequest.open( 'GET', aUrl, true );            
        aHttpRequest.send( null );
    };
    this.post = function(aUrl, aCallback) {
        var aHttpRequest = new XMLHttpRequest();
        aHttpRequest.onreadystatechange = function() { 
            if (aHttpRequest.readyState == 4 && aHttpRequest.status == 200)
                aCallback(aHttpRequest.responseText);
        }

        aHttpRequest.open( 'POST', aUrl, true );            
        aHttpRequest.send( null ); // send something
    }
}

/* ======================================== Private Methods ======================================== */

//take the no. of pixels from top of the page to the element with that id 
function targetYPosition(elementId) { // id must be unique
    var element = document.getElementById(elementId);
    var y = element.offsetTop;
    var node = element;
    while (node.offsetParent && (node.offsetParent != document.body)) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
        return self.pageYOffset; //pageYOffset = number of pixels from top of the page
    }

    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }

    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    }

    return 0; //any of these fail, i will get O (on the top of the page)
}

// if(window.location.hash) {
//   // Fragment exists
// } else {
//   // Fragment doesn't exist
// }
