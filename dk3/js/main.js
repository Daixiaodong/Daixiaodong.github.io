Modernizr.addTest('ipad', function () {
  return !!navigator.userAgent.match(/iPad/i);
});
 
Modernizr.addTest('iphone', function () {
  return !!navigator.userAgent.match(/iPhone/i);
});
 
Modernizr.addTest('ipod', function () {
  return !!navigator.userAgent.match(/iPod/i);
});
 
Modernizr.addTest('appleios', function () {
  return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});

jQuery.extend({
	getQueryParameters : function(str) {
		return (str || decodeURIComponent(document.location.search)).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
	}
});

function initializeTooltips(){
	$('[data-rel="tooltip"]').tooltip({
		container: 'body',
		animation: false,
		delay: { "show": 500, "hide": 0 }
	});
	$('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(function(){
	var navBarSearch = $('#navBarSearch');
	if (navBarSearch.length) {
		navBarSearch.on('shown.bs.dropdown', function (e, i) {
			CenterDrop();
			$('#uncompiledQuery').focus();
		});
	}
	function wireSearch() {
		// $('#uncompiledQuery').autocomplete({
		// 	delay : 0,
		// 	minLength: 1,
		// 	position : { my: 'center top-1', at: 'center bottom', of: '#navBar', collision: 'none' },
		// 	appendTo: '#searchResults',
		// 	create : function() {
		// 		$(this).data('ui-autocomplete')._renderMenu = function(ul, items) {
		// 			ul.addClass('search-results list-group');
		// 			var that = this;
		// 			var count = 0;
		// 			var entryLimit = 10;
		// 			$.each( items, function( index, item ) {
		// 				if(count < entryLimit){
		// 					that._renderItemData( ul, item );
		// 				}
		// 				++count;
		// 			});
		// 		};
		// 		$(this).data('ui-autocomplete')._renderItem = function(ul, item){
		// 			var resultRow = $('<li>').addClass('list-group-item no-border');
		// 			resultRow.append( $('<img>').attr('src', elPaths.amzPath+'/img/GizmoSnap/'+item.resourceID+'tn_42.png'));
		// 			resultRow.append(item.title);
		// 			if(item.HTML5) resultRow.append($('<span>').addClass('label label-danger').append('HTML5'));
		// 			if(item.flag==='U')resultRow.append($('<span>').addClass('label label-warning').append('Updated'));
		// 			if(item.flag==='N')resultRow.append($('<span>').addClass('label label-primary').append('New'));
		// 			if(item.measurementSystem==='M')resultRow.append($('<span>').addClass('label label-success').append('Metric'));
		// 			resultRow.appendTo( ul );
		// 			return resultRow;
		// 		};
		// 	},
		// 	focus: function(event, ui) {
		// 		event.preventDefault();
		// 		$(this).val(ui.item.label);
		// 	},
		// 	source: function (request, response) {
		// 		var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
		// 		response($.grep(lscache.get('resources').gizmos, function(value) {
		// 			return matcher.test(value.title) || matcher.test(value.keywords) || matcher.test(value.resourceID) ;
		// 	}));
		// 	},
		// 	select: function(event, ui) {
		// 		event.preventDefault();
		// 		$(this).val(ui.item.label);
		// 		window.location.href = el.getAjaxBaseUrl()+'method=cResource.dspDetail&ResourceID='+ui.item.resourceID;
		// 	}
		// });

		if (navBarSearch.length) {
						
			var q = $('#uncompiledQuery'),
				navBarSearchButton = $('#navBarSearchButton'),
				navSearchBox = navBarSearch.find('.nav-search-box');
				
			q.on('keyup focus', function() {
				navSearchBox[(q.val() === '' ? 'add' : 'remove') + 'Class']('nav-search-box-cleared');
			}).on('keyup', function(){
				var gIDs = [];
				var suggestions = $('.gizmo-suggestion');
				suggestions.each(function (index, element){
					var elem = $(element);
					var elemID = elem.data('id');
					if($.inArray(elemID,gIDs)===-1){
						gIDs.push(elemID);
					} else {
						elem.remove();
					}
				});
			});
			navBarSearch.find('.nav-search-clear').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				q.val('');
				q.typeahead('val', '');
				q.focus();
			});

			var gSource = lscache.get('resources').gizmos;
			
			var gTitles = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.title;
					return Bloodhound.tokenizers.whitespace(searchData.replace('(','').replace(')',''));
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});

			var gKeywords = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.keywords;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});
			
			var gIDs = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.resourceID;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});

			var browseStrands = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.searchTerms;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.displayName; },
				local: lscache.get('browseStrands')
			});

			/*
			var promise = gKeywords.initialize();

			promise
			.done(function() { console.log('ready to go!'); })
			.fail(function() { console.log('err, something went wrong :('); });
			*/

			var gizmoSuggestionTemplates = {
				// empty: [
				//   '<div class="empty-message">',
				//   'Unable to find Gizmos match the current query',
				//   '</div>'
				// ].join('\n'),
				suggestion: function(data) {
					var labels = data.measurementSystem.length  ? '<span class="labels"><span class="label label-metric">Metric</span></span>' : '';
					return '<div data-id="'+data.resourceID+'" class="gizmo-suggestion">'+labels+'<img src="'+elPaths.imageRoot+'/img/GizmoSnap/'+data.resourceID+'TN.png" class="thumb"><span class="title">'+data.title+'</span></div>';
				}
			};
			var browseStrandSuggestionTemplates = {
				header: '<div class="tt-divider">Grade Bands &AMP; Topics</div>',
				suggestion: function(browseStrand) {
					return '<div data-browseStrand="'+browseStrand.deepLink+'" class="browseStrand-suggestion"><span class="glyphicon glyphicon-th-list"></span>'+browseStrand.displayName+'</div>';
				},
			};
			var taObject = {};
			
			q.typeahead({
				hint: true,
				highlight: true,
				minLength: 1,
				autoselect:true
			},
			{
				name: 'IDs',
				displayKey: 'title',
				source: gIDs,
				templates: gizmoSuggestionTemplates
			},
			{
				name: 'Titles',
				displayKey: 'title',
				source: gTitles,
				templates: gizmoSuggestionTemplates,
			},
			{
				name: 'Keywords',
				displayKey: 'title',
				source: gKeywords,
				templates: gizmoSuggestionTemplates
			},
			{
				name: 'browseStrands',
				displayKey: 'displayName',
				source: browseStrands,
				templates: browseStrandSuggestionTemplates
			}).on('typeahead:selected', function (event, data, dataset) {
				if(data.resourceID) {
					window.location.href = elPaths.myself + 'cResource.dspDetail&ResourceID=' + data.resourceID;
				} else if(data.deepLink) {
					window.location.href = elPaths.myself + 'cResource.dspResourceExplorer&browse=' + data.deepLink;
				}
			});
			$('.tt-menu').append($('<div>').addClass('tt-suggestion tt-selectable tt-footer more text-center').append($('<a>').attr('href','#').text('See Full Search Results')));

			navBarSearchButton.find('.glyphicon').css('color', 'inherit');

			$('.tt-menu').on('click','div.more',function(){
				$(this).parents('form').submit();
			})
			
		 //    $(window).keydown(function(e) {
			// 	if (!($('input').is(':focus') || $('textarea').is(':focus') || $('object').is(':focus'))) {
			//         var code = e.which,
		 //   				key = String.fromCharCode(code);
			// 	   if (!(e.altKey || e.ctrlKey || e.metaKey) && !(code == 116 || code == 117) && key.match(/^[a-z0-9]+$/i)) {
			// 	   		if (!q.is(":focus")) { 
			// 	   			navBarSearchButton.trigger('click.bs.dropdown');
			// 	   			q.val('');
			// 	   			q.focus();			   			
			// 	   		}
			// 	   }
			//     }		   
			// });
		}

		// notify('Typeahead Enabled');
	}	

	try {
		// populate local storage
		if(lscache.get('resources')===null || lscache.get('browseTree')===null || lscache.get('browseStrands')===null || localStorageOutOfDate('resources')){
			$('#navBarSearchButton').find('.glyphicon').css('color', '#555');
			$.ajax({
				method: "POST",
				url: el.getAjaxBaseUrl()+'method=cResource.getResourcesJSON',
				dataType: 'JSON'
			}).success(function(msg) {
				// Build Resources Object
				var searchArray = [];
				$.each(msg.data, function(index,object){
					var searchEntry = {
						title : object.title,
						keywords : object.keywords,
						introText : object.introtext,
						resourceID : Number(object.resourceid),
						flag : object.flag,
						HTML5 : Number(object.html5) && !Number(object.html5isqa),
						resourceType : object.resourcetype,
						measurementSystem : object.measurementsystem
					};
					searchArray.push(searchEntry);
				});
				var resources = {'gizmos': searchArray, 'version': serverLocalStorageVersion};
				lscache.set('resources',resources);

				// Build BrowseTree Object
				$.ajax({
				method: "POST",
				url:  el.getAjaxBaseUrl()+'method=cResource.getBrowseJSON',
				dataType: 'JSON'
				}).success(function(msg) {
					var browseTree = {name : 'root', subjects: {}};
					for(var x in msg.data){
						var node = msg.data[x];
						if(!(node.subjectname in browseTree.subjects)){
							browseTree.subjects[node.subjectname] = {gradeLevels : {}};
						}
						if(!(node.gradelevelname in browseTree.subjects[node.subjectname].gradeLevels)){
							browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname] = {sortOrder : node.gradelevelsortorder, topics : {}};
						}
						if(!(node.topicname in browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics)){
							browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname] = {sortOrder : node.topicsortorder, subtopics : {}};
						}
						if(!(node.subtopicname in browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics)){
							browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname] = {sortOrder : node.subtopicsortorder, resources : []};
						}
						if(browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname].resources.indexOf(node.resourceID)===-1){
							browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname].resources.push(node.resourceid);
						}
					}
					lscache.set('browseTree', {'tree': browseTree, 'version':serverLocalStorageVersion});
					// Build BrowseStrands Object
					lscache.set('browseStrands',  buildBrowseStrands(browseTree, {}, []));
					if (interpretParam) interpretParam();
					wireSearch();
				}).fail(function(request, status, error){
					// getBrowseJSON AJAX Failure
				});
			}).fail(function(request, status, error){
				// getRecourcesJSON AJAX Failure
			});	
		} else {
			// local storage already populated 
			if($('#browse-results').length){
				if (interpretParam) interpretParam();
			}
			wireSearch();
		}
	} catch (e) {
		// lscache failure
		var displayArea = $('#browse-results');
		if(displayArea){
			notifyError('Local storage must be enabled in your browser to make use of this feature.');
		}
	}

	function buildBrowseStrands(treeNode, parentNodeObject, resultsArray){
		if(treeNode.subjects){
			for(var subject in treeNode.subjects){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),subject);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.subjects[subject], nodeObject, resultsArray);
			}
		} else if (treeNode.gradeLevels){
			for(var gradeLevel in treeNode.gradeLevels){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),gradeLevel);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.gradeLevels[gradeLevel], nodeObject, resultsArray);
			}
		} else if (treeNode.topics){
			for(var topic in treeNode.topics){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),topic);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.topics[topic], nodeObject, resultsArray);
			}
		} else if (treeNode.subtopics){
			for(var subtopic in treeNode.subtopics){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),subtopic);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.subtopics[subtopic], nodeObject, resultsArray);
			}
		}
		return resultsArray;
	}

	function amendNodeObject(nodeObject, amendment){
		if(nodeObject.displayName === undefined){
			nodeObject.displayName = amendment;
			nodeObject.searchTerms = amendment;
			nodeObject.deepLink = amendment.replace(/\ /g,'+');
			return nodeObject;
		} else {
			nodeObject.displayName += ' > '+amendment;
			nodeObject.searchTerms = amendment;
			nodeObject.deepLink += '/'+amendment.replace(/\ /g,'+');
			return nodeObject;
		}
	}
	

	$('.theme-nav .btn').on('click', function() {
		$('.home').attr('class', $(this).data('class'));
	});
    $('.dropdown-menu input, .dropdown-header, .dropdown-body').on('click', function (e) {
        e.stopPropagation();
    });
	
    initializeTooltips();
	
	// var $affixedBar = $('#affixedBar');
	// if ($affixedBar.length) {
	// 	$affixedBar.affix({
	// 		offset: {
	// 			top: $('#navBar').height()
	// 		}
	// 	});
	// 	$('#affixedBarWrap').css('min-height', $affixedBar.height());
	// }

	function CenterDrop() {
		var drop = $('.open .dropdown-menu');
		if (drop.length) {
			var p = drop.parent(),
				pR = p.offset().left + p.width(),
				w = drop.width(),
				l = pR - w,
				cL = $(window).width()/2 - (w/2);
			drop.css('right', l < cL ? l - cL : 0);
		}
	}
	$(window).resize(CenterDrop);
	
	$(document.body).on('click', '[data-context-dropdown]', function(e) {
		var clicked = $(this),
			menu = $(clicked.data('context-dropdown'));
		
		//move and show menu
		clicked.dropdown();
		clicked.parent().on('show.bs.dropdown', function () {
		  // do something…
		  menu.data('id', clicked.data('id'));
		  clicked.parent().append(menu);
		  //console.log(clicked.data('id'));
		});
	});

	$(document.body).on('click', '[data-menu]', function(e){
		var menu = $(this).data('menu');

		switch(menu){
			case "support-form" :
				// Activate the "contact us" form on the helpdesk widget
				$('#help-popover').trigger('click');
				$('#help-popover-container #helpdeskContactButton').trigger('click');
				break;
		}

		e.preventDefault();
	});

	$(document.body).on('click', '.unwrap', function(e) {
		e.preventDefault();
		
		var clicked = $(this),
			prop = 'white-space',
			nowrap = clicked.css(prop) == 'nowrap';
		clicked.css(prop, nowrap ? 'normal' : 'nowrap');
	});

	$(document.body).on('click', '.addToClass', function(e) {
		e.preventDefault();

		var clicked = $(this),
			classID = clicked.data('classid'),
			listID = clicked.parents('ul').siblings('a').data('listid'),
			resourceID = clicked.parents('ul').data('id'),
			addToAllClasses = false,
			classTitle = clicked.text().trim(),
			method = 'cResourceSecure.actAddResourceToClass_ajax';

		if(clicked.hasClass('addToAllClasses')) {
			classTitle = "all classes";
			addToAllClasses = true;
		}

		var notifyArgs = {
			icon: elPaths.amzPath + '/img/GizmoSnap/' + resourceID + 'TN.png',
			title: 'Gizmo added to ' + classTitle,
			message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Gizmo in Class',
			url: el.getAjaxBaseUrl() + 'cUserSecure.dspClass&ClassID=' + classID,
			target: '_self'
		}

		if(typeof listID === 'number'){
			method = 'cResourceSecure.actAddResourcesToClasses_ajax';
			notifyArgs = {
				title: 'Gizmo List added to ' + classTitle,
				message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Class',
				url: el.getAjaxBaseUrl() + 'cUserSecure.dspClass&ClassID=' + classID,
				target: '_self'
			}
		}

		$.post(
			'index.cfm', 
			{
				method : method,
				resourceID : resourceID,
				SharedGizmoListID : listID,
				classID : classID,
				classIDs : classID
			},
			function( data ) {
				if (data.trim() == '1') {
					if(addToAllClasses){
						$.notify({
							icon: elPaths.imageRoot + '/img/GizmoSnap/' + resourceID + 'TN.png',
							title: 'Gizmo added to ' + classTitle,
						},{
							type: 'el',
							delay: 5000,
							placement: { align : 'left', from : 'bottom'  },
							icon_type: 'image',
							mouse_over: 'pause',
							template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
								'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
								'<img data-notify="icon" class="pull-left">' +
								'<span data-notify="title">{1}</span>' +
							'</div>'
						});
					} else {

						$.notify({
							icon: elPaths.imageRoot + '/img/GizmoSnap/' + resourceID + 'TN.png',
							title: 'Gizmo added to <span class="classname">' + classTitle+'</span>',
							url: el.getAjaxBaseUrl() + 'method=cUserSecure.dspClass&ClassID=' + classID,
							target: '_self'
						},{
							type: 'el',
							delay: 5000,
							placement: { align : 'left', from : 'bottom'  },
							icon_type: 'image',
							mouse_over: 'pause',
							template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
								'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
								'<img data-notify="icon" class="pull-left">' +
								'<span data-notify="title">{1}</span>' +
								'<a href="{3}" target="{4}" data-notify="url"></a>' +
							'</div>'
						});
					}	
				} else if(data.trim() == '2'){
					$.notify({
						title: 'Gizmo List added to ' + classTitle,
						message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Class',
						url: el.getAjaxBaseUrl() + 'method=cUserSecure.dspClass&ClassID=' + classID,
						target: '_self'
					},{
						type: 'el',
						delay: 5000,
						placement: { align : 'left', from : 'bottom'  },
						icon_type: 'image',
						mouse_over: 'pause',
						template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
								'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
							    '<span data-notify="title">{1}</span>' +
							'<span data-notify="message">Click to see updated class.</span>' +
							'<a href="{3}" target="{4}" data-notify="url"></a>' +
						'</div>'
					});
				}
			}
		);
	});
	
	if ($('#bc1').length) {
		$(window).resize(function() {
	        ellipses1 = $("#bc1 :nth-child(2)");
	        if ($("#bc1 a:hidden").length >0) {
				ellipses1.show();
			} else {
				ellipses1.hide();
			}
	    });
	}
	$('.user-submitted-list .description').each(function(){
		if($(this).find('span.desc-hidden').length !== 0){
			$(this).on('click', function(){
				$(this).find('span.desc-hidden').removeClass('hidden');
				$(this).find('a.more-link').addClass('hidden');
			});
		}
	});

	$('.user-submitted-list a.more-link').on('click', function(event){
		$(this).addClass('hidden');
		$(this).siblings('span.desc-hidden').removeClass('hidden');
		event.preventDefault();
	});

	$('.user-submitted-list a.overflow-link').on('click', function(event){
		$(this).closest('div').find('.user-submitted-list').removeClass('hidden');
		$(this).addClass('hidden');
		event.preventDefault();
	});


	$('.best-for-popover').popover({
		content : function(){
			return $(this).siblings('.best-for-content').html();
		},
		html : true,
		container : ".user-submitted-list",
		placement : "top"
	});

	// Flash Messages
	$('#flashNotifications .notification').each(function(){
		notify($(this).html());
	});

	$('#expirationDialogue').modal('show');

	$('#dismissWelcomeAlert').on('click', function(event){
		$(this).parents('#affixedBarWrap').hide();
		dismissAlert(1, $('#welcomeAlertUserID').val());
	});

	$('.read-more-link').on('click', function(event){
		event.preventDefault();
		$(this).parents('.read-more-row').hide().next('.read-more-content').show();
	});

	// This is to hide the title bar that went over the video.
	// The best cross browser solution I could find.
	$(document).on('click touchstart', '#introVideo', function(){
		$('#videoModal').modal('show');
	});

	// pause video when modal closed/hidden
	$('#videoModal').on('hide.bs.modal', function(){
		$('#videoModal').find('video')[0].pause();
	});

	// Play video when modal opened
	$('#videoModal').on('shown.bs.modal', function(){
		$('#videoModal').find('video')[0].play();
	});

	initializeCommonValidatorMethods();

	checkUTMCodes();

}); // document.ready

var TRACKED_UTM_VALUES = ['utm_source','utm_medium','utm_term','utm_content','utm_campaign'];

function checkUTMCodes(){

	addUTMCodesToSession();

	addUTMCodesToExternalLinks();

	addUTMCodesToForms();
}

function addUTMCodesToExternalLinks(){

 	var utmParams = getUTMParams();

 	if(utmParams.length > 0){

		$('a[href*="blog.explorelearning.com"], a[href*="info.explorelearning.com"], a[href*="help.explorelearning.com"], a[href*="explorelearning.zendesk.com"], a[href*="reflexmath.com"] ').each(function() {

	        var hrefParts = $(this).attr('href').split('?');    

	        if (hrefParts.length == 1){
	        	var newHREF = hrefParts[0] + "?" + utmParams;
	        }
	        else {
	        	var newHREF = hrefParts[0] + "?" + hrefParts[1]+"&"+utmParams;
	        }

	        //update link href
			$(this).attr('href', newHREF.replace(/%2B/ig, '+'));
		});
	}
}

function addUTMCodesToForms(){
	var trackingForm = $('.utmCodeTracking');

	if(trackingForm.length > 0){

		$.each(TRACKED_UTM_VALUES, function(index, value){
			var cookieValue = readCookie(value)

			if(cookieValue){
				trackingForm.append('<input type="hidden" name="'+value+'" value="'+cookieValue+'">')
			}
		});
	}
}

function addUTMCodesToSession(){
	if (document.location.search.length) {

	    // get qs vars as obj
		var qs = $.getQueryParameters();

		for(var key in qs){
			if(key.indexOf('utm_') === 0){
				setCookie(key, qs[key], 180);
			}
		}
	}
}

function getUTMParams(){

	paramString = "";

	$.each(TRACKED_UTM_VALUES, function(index, value){
		var cookieValue = readCookie(value)

		if(cookieValue){

			if(paramString.length > 0) paramString += "&";

			paramString += value+"="+cookieValue;
		}
	});

	return paramString;
}

var COMMON_VALIDATION_PARAMETERS;

function initializeCommonValidatorMethods(){
	jQuery.validator.addMethod('checkHTMLChars', function(value, element){
		var re = /<+|>+|\/+/;
		return this.optional(element) || !(re.test(value));
	}, "Invalid characters found.  Characters &gt;, &lt;, and / not allowed.");

	jQuery.validator.addMethod('forbidCharacter', function(value, element, params){
		return this.optional(element) || value.indexOf(params[0]) == -1;
	}, function(params, element){
		return "The "+params[0]+" character is not allowed."
	});

	jQuery.validator.addMethod('emailWithDot', function(value, element, params){
		var regex = /^[_'a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([a-zA-Z]{2,})|(aero|coop|info|museum|name|ae))$/;
		return this.optional(element) || regex.test(value);
	}, "Please enter a valid email address.");

	jQuery.validator.addMethod('multipleEmails', function(value, element, params){
		var singleEmail = "[_'a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.(([a-zA-Z]{2,})|(aero|coop|info|museum|name|ae))";
		var regex = new RegExp('^'+singleEmail+'(\\s*,\\s*'+singleEmail+')*\\s*$', 'g');
		return this.optional(element) || regex.test(value);
	}, "An address above does not follow a valid email address format.");

	jQuery.validator.addMethod('nameFormatCheck', function(value, element){
		return this.optional(element) || /^[a-zA-Z\s'-]+$/.test(value)
	}, "Invalid Characters.");

	COMMON_VALIDATION_PARAMETERS = {
		errorClass : 'text-danger',
		errorElement : 'em',
		highlight: function(element, errorClass, validClass){
			$(element).closest('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).closest('div').removeClass('has-error');
		}
	};
}

el = {
	gizmoHelper : {
		displayGizmos : function(gizmos, parentElement, templateID, sortProperty){
			try {
				var template = document.getElementById(templateID).firstChild.textContent;
				if($.type(parentElement)==='string'){
					parentElement = $('#'+parentElement);
				}
				var gizmosToDisplay = [];
				if(typeof gizmos[0] === 'number' || typeof gizmos[0] === 'string'){
					gizmosToDisplay = this.getGizmosByID(gizmos, lscache.get('resources').gizmos);
				} else if(typeof gizmos[0] === 'object') {
					gizmoIDs = [];
					for(var index in gizmos){
						gizmoIDs.push(Number(gizmos[index].id));
					}
					gizmosToDisplay = this.getGizmosByID(gizmoIDs, lscache.get('resources').gizmos);
					for(var i in gizmos){
						var gizmoData = gizmos[i];
						for(var j in gizmosToDisplay){
							var gizmoObject = gizmosToDisplay[j];
							// if(gizmoData.id === gizmoObject.resourceID){
							// for some reason, sometime the gizmoData.id is a string, I have to replace the if condition.	
							if(parseInt(gizmoData.id) == gizmoObject.resourceID){
								gizmosToDisplay[j] = $.extend(true, gizmoObject, gizmoData);
							}
						}
					}
				}
				if(sortProperty !== undefined){
					if (typeof gizmosToDisplay[0][sortProperty] === 'string'){
						gizmosToDisplay.sort(function(a,b){
							return a[sortProperty].localeCompare(b[sortProperty]);
						});
					} else if (typeof gizmosToDisplay[0][sortProperty] === 'number'){
						gizmosToDisplay.sort(function(a,b){
							return a[sortProperty]-b[sortProperty];
						});
					}
				}
				$(gizmosToDisplay).each(function(){
					parentElement.append(Mark.up(template,this));
				});
			} catch (e) {
				throw 'lscache not available.';
			}
		},
		getGizmosByID : function(gizmoIDs, gizmoLibrary){
			var gizmos = [];
			$.each(gizmoLibrary, function(){
				if($.inArray(this.resourceID, gizmoIDs)>=0){
					gizmos.push(this);
				}
			});
			return gizmos;
		}
	},
	getAjaxBaseUrl : function(){
		return elPaths.secureBasePath;		
	}
};

function localStorageOutOfDate(itemToCheck){
	var localVersion = lscache.get(itemToCheck).version;
	return serverLocalStorageVersion > localVersion;
}


// Copied from http://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};

// http://10.214.8.135:50122/index.cfm?method=cResource.dspDetail&ResourceID=615&utm_source=facebook&utm_medium=social&utm_content=007dyf8sbzy2thg&utm_campaign=Generous

// Adapted from http://www.w3schools.com/js/js_cookies.asp
function setCookie(name, value, exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = name + "=" + value + "; " +expires+";path=/;";
}

// Adapted from http://www.quirksmode.org/js/cookies.html
function readCookie(cookieName){
	var nameEQ = cookieName + "=";
	var cookieList = document.cookie.split(';');
	for(var i=0;i < cookieList.length;i++) {
		var c = cookieList[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ)===0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Add a character counter to a textarea.  Enforces limit of maxChars.
function addCharacterCounter(originalElement, maxChars){
	originalElement.on('keyup paste', function(e){
		// The paste event fires before text is actually entered
		var element = $(this);
		setTimeout(function() {
			var currentLength = element.val().length;

			if(currentLength > maxChars){
				element.val(element.val().substring(1,maxChars));
			}

			var charsLeft = maxChars - currentLength;

			if (charsLeft <= 0){
				element.siblings().find('.characters-left').text('No ');
			} else {
				element.siblings().find('.characters-left').text(charsLeft);
			}
		}, 0);
	});

	// Fire event just to initialize with correct value
	originalElement.trigger('keyup');
}

function notifySuccess(message){
	$.notify({
		message: message,
		target: '_self'
	}, {
		placement : {align : 'center'},
		type : 'success',
		z_index : 99999
	});
}

function notifyError(message){
	$.notify({
		message: message,
		target: '_self'
	}, {
		placement : {align : 'center'},
		type : 'danger',
		z_index : 99999
	});
}

function notify(message){
	$.notify({
		message: message,
		target: '_self'
	}, {
		placement : {align : 'center'},
		type : 'warning'
	});
}

function printPage(){
	if (window.print) {
		window.print();  
	}else{
		var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
		document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
		WebBrowser.ExecWB(6, 2);//Use a 1 vs. a 2 for a prompting dialog box    WebBrowser1.outerHTML = "";  
	}
}

var AJAX_CHECK_USERNAME = 'ut';
var AJAX_URL = 'index.cfm';
var AJAX_GET_METHOD = 'cPromo.actAJAXMDR';

function usernameIsTaken(username, successFunction){
	$.getJSON(AJAX_URL,
		  {
		  	method : AJAX_GET_METHOD,
		  	a : AJAX_CHECK_USERNAME,
		  	id : username,
		  },
		  function(data){
		  	var isTaken = data.isTaken;

		  	successFunction(isTaken);
		  });
}

function dismissAlert(alertID, userID){
	$.ajax({
	  type: 'POST',
	  url: 'index.cfm',
	  dataType : 'json',
	  data: {
	  	method: 'cUserSecure.actUserAlertDismiss',
	  	AlertID : alertID,
	  	UserID : userID			  	
	  },
	  success: function(data) {
		// Do nothing on success or failure 
	  }
	});
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}