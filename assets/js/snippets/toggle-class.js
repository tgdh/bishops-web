// ===========================================================
//
//	$TOGGLE CLASS
//	To use <button data-toggle="nav--main">
//
// ===========================================================

var toggleClass = function(el, className) {
    if(el.hasClass(className + '--open')) {
      el.removeClass(className + '--open');
    } else {
      el.addClass(className + '--open');
    }
}

$('[data-toggle]').on( "click", function() {
  var $className = $( this ).data("toggle");
  toggleClass($('html'), $className);
});

// ===========================================================
//
// PURE JS version
//
// ===========================================================

var dataToggle = document.querySelectorAll('[data-toggle]');

for (var i in dataToggle) {
	if (dataToggle[i].nodeType == 1) dataToggle[i].addEventListener('click', function(event) {
		var $class = this.getAttribute( "data-toggle" );
		toggleClass(html, $class);
	});
}