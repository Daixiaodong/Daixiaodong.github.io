// gizmo-display.js
// Description: The JS needed for gizmo display (resize, presentation mode, etc)
// Author: Jordan Marshall
// Created: September 2015 (some content created earlier)

var windowWidth;

$(document).ready(function(){

	// Initialize Gizmo
	if($('#gizmoHolder').length){

		if($('#g.html5').length){
			initializeHTML5Gizmo();
		}

		// Initial gizmo resize
		resizeGizmo();

		// iPad was calling resize too often
		windowWidth = $(window).width();
		$(window).resize(function(){
			if($(window).width() != windowWidth){
				resizeGizmo();
				windowWidth = $(window).width();
			}

			// Why was this here?  It was the cause of GIZ-8015.
			// resizeGizmo();
		});

		var shockwaveGizmo = $('#g.shockwave');

        if (shockwaveGizmo.length && (detectIE() || (BrowserDetect.browser==='Firefox' && BrowserDetect.OS==='Windows'))) {
			var gizmoHolder = $('#gizmoHolder');
			var backgroundImg = gizmoHolder.children('img');
			var lessonInfoPaneVisible = false;
			var modalOpening = false;
			$('#lessonInfoBtn, #closeLessonInfo').on('click', function(){
				lessonInfoPaneVisible = !lessonInfoPaneVisible;
			});
			$('a[data-toggle=modal]').on('click', function(){
				modalOpening = true;
			});
			$(document.body).on('show.bs.dropdown show.bs.modal show.bs.collapse',function(){
				backgroundImg.css('display', 'block');
				gizmoHolder.addClass('hideGizmo');
				shockwaveGizmo.css('display', 'none');
			});
			$(document.body).on('hide.bs.dropdown hide.bs.modal hidden.bs.collapse',function(event){
				if((event.namespace == 'bs.modal' && !lessonInfoPaneVisible) || (!modalOpening && !lessonInfoPaneVisible)){
					gizmoHolder.removeClass('hideGizmo');
					shockwaveGizmo.css('display', 'block');
					backgroundImg.css('display', 'none');
				}
				modalOpening = false;
			});
		}
	}

	// Enable presentation mode
	$('.launch-presentation-mode').on('click', enterPresentationMode);

	// Exit presentation mode
	$('body').on('click', '#exitPresentationMode', exitPresentationMode);
	$('body').keyup(function(event){
		if (event.keyCode == 27 ){
			exitPresentationMode();
		}
	});

	// The "Gizmo Info" popover that is shown in presentation mode
//	$('#openGizmoInfo').popover({ html : 'true'});
	$('#openGizmoInfo').on('show.bs.popover', function(){
		$(this).tooltip('hide');
		$(this).tooltip('disable');
		$('#openGizmoInfo').removeClass('glyphicon-info-sign').addClass('glyphicon-remove-circle');
	});
	$('#openGizmoInfo').on('hidden.bs.popover', function(){
		$(this).tooltip('enable');
		$('#openGizmoInfo').removeClass('glyphicon-remove-circle').addClass('glyphicon-info-sign');
	});

//	$('#openGizmoInfo').tooltip({ title : 'View Gizmo Info'});

	$('#enterFullScreenMode').on('click', function(event){
		enterFullScreen();
	});
});


function enterFullScreen(){
	$('#openGizmoInfo').popover('hide');

	var element = $('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled')[0];
	$('#enterFullScreenMode').hide();
	if(element.requestFullscreen){
		element.requestFullscreen();
	} else if (element.msRequestFullscreen){
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen){
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen){
		element.webkitRequestFullscreen();
	}
	resizeGizmo();
}

function exitFullScreen(){
	if(document.exitFullscreen){
		document.exitFullscreen();
	} else if (document.msExitFullscreen){
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen){
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen){
		document.webkitExitFullscreen();
	}
}

function exitPresentationMode(){
	exitFullScreen();

	$('#gizmoHolder').closest('.bg-panel').removeClass('full-screen-enabled');
	$('#belowGizmoButtons').show();
	$('body').css('overflow', 'scroll');

	$('#presentationModeToolbar').hide();

//	$('#openGizmoInfo').popover('hide');

	resizeGizmo();
}

function enterPresentationMode(){
	window.scrollTo(0,0); // Scroll to top of page.
	$('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled');

	// For iPad.  The tooltip sometimes lingers.
//	$('.launch-presentation-mode').tooltip('hide');

	$('#presentationModeToolbar').show();

	$('#enterFullScreenMode').show();

	$('#belowGizmoButtons').hide();
	$('body').css('overflow', 'hidden'); // Hide scroll bar
	resizeGizmo();
}

//Modified by dk 20160604
function initializeHTML5Gizmo(){
	var gizmoHolder = $('#gizmoHolder');
	var iframeHolder = $('#g.html5');
	var resourceID = gizmoHolder.data('resourceid');

    var ifrm = $('<iframe>', {
		src: '../'+ resourceID +'/main.html',	
		id:  'myFrame',
		frameborder: 0,
	    scrolling: 'no'
	});

	iframeHolder.append(ifrm);

	// Initializing the Gizmo to any other size (smaller or larger) seems to cause problems.
	ifrm.css({'width': 1024,'height': 740});

}

function resizeIframe(){

	iframeHolder = $('#gizmoHolder #g');
	iframe = $('#g.html5 iframe');

	var oldHeight = Number(iframe.height());
	var oldWidth = Number(iframe.width());

	// This is set by the "ResizeGizmo" function
	var newHeight = iframeHolder.height();

console.log(iframeHolder.height)

	var scale = (oldHeight/newHeight).toFixed(2);

	iframe.css({
		"transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-ms-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
		"-webkit-transform": "translate(-"+(oldWidth/2)+"px,-"+(oldHeight/2)+"px) scale("+(1/scale)+","+(1/scale)+") translate("+(oldWidth/2)+"px,"+(oldHeight/2)+"px)",
	});
}

function resizeGizmo(){
	var holder = $('#gizmoHolder'),
		g = $('#g.scale');


	if(holder.length && g.length){
		var gRatio = parseFloat(g.data('ratio'));
		var windowHeight = $(this).height();
		var displayOffset = g.offset().top;
		var maxHeight = windowHeight - displayOffset-30;

		// var newHeight = holder.width() / gRatio;
		// var newWidth = holder.width();

		var gPadding = 5;
		var newHeight = (holder.width() - 2*gPadding) / gRatio;
		var newWidth = holder.width()-2*gPadding;

		if(newHeight > maxHeight){
			newHeight = maxHeight;
			newWidth = maxHeight * gRatio;
		}

		g.height(newHeight).width(newWidth);

		if($(this).scrollTop()>g.offset().top){
			$(this).scrollTop($('#affixedBarWrap').offset().top );
		}
		
		if(g.hasClass('html5')){
			resizeIframe();
		}

		if((g.width()+90) < $(window).width()){
			$('#presentationModeToolbar').removeClass('fullscreen-toolbar-portrait').addClass('fullscreen-toolbar-landscape');
		}
		else {
			$('#presentationModeToolbar').removeClass('fullscreen-toolbar-landscape').addClass('fullscreen-toolbar-portrait');
		}
	}
}