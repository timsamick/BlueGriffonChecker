/*
 *  @author Tate Asher Baltzly <tate.baltzly@ecotoh.net>
 *	@version 1.0
 *	@updated 2015-05-23
 */

$('#BGQCCResults').remove();
$('.bgqcc_error').remove();
console.log("Executing BGQCC");

//Loaded CSS
$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://dl.dropboxusercontent.com/u/235136859/JS/eca_outline.css') );

var results = [];
var counter = 10001;
var anchors = "bgqcc"+counter;
var base64Img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAM1BMVEXkQgTsnoTkckT0zsTkWiT0tqTsimT85tzkThT0qpTsflT82szkZjT0wrTslnT88uz///91Dp/dAAAAEXRSTlP/////////////////////ACWtmWIAAABOSURBVHjardIxDgAgCAPA4gOQ/7/WxaQ0hjBgJ+QGEgFRZkq4eQgpSpBkYidZekvZE17Cd7KafD6LIdFY7e43pLEo5VL6VSruIDHm82M7vUUYX87QHvIAAAAASUVORK5CYII=";
var b64Warning = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAA9lBMVEX/pQD/////pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQD/pQBbEVHOAAAAUXRSTlMAAAEFBgcJCwwPERYdJigsMDEyNzs+QkNFSU1OT1BTVFZXWGBnaWpscHV2d3l7fX+Bg4WHkJSVlpeYmpucnaWpt8vO09nc4OHi6Ont7vD3+v7yYA0cAAAA2klEQVR4AZ3Sx1KFYAzF8WO/di8WRUXsiqAodrGLvWje/2WcyZnAN4Iu/G9I8puBDej4tb8JrHs6OjxK/BaYQys3ot1t/KBhglaMuzT5JW5hRUO8nLbbGSevpIKHTWCR05vRsrAUWBUWk7qKOr33KU1JnSRQ2m6iPaWzJsqV8iY6V0ptXQNmbd5X8m29jraubF5S6n2SWh8DSuUH7sdGbu19IOGZewB4nD57jEZ5OABiTjMwwgIvlxd8rqMiTDxI2escXEJn8kh4yVqoiPXP7xyf7IaDgNG//sNvuoxkWHZdq4AAAAAASUVORK5CYII=";
var versionNum = 1.5;

//Clear previous results


ckMisc()

function ckMisc(){
	//No "Insert content..." template text
	try{
		$('body').each(function(i){
			if($(this).text().indexOf("This is an example of an Overview.") > 0){
				var  errMsg = "MISC - Template text in the Overview. Please remove."
				$('#overview').next('p').prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else
			{}
			if($(this).text().indexOf("Insert content above this line") > 0){
				var  errMsg = "MISC - Template text in the page footer. Please remove."
				$('#teacherContent').append('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else
			{}
		})
	}
	catch(err){
		console.log("Could Not Execute: No 'Insert content...' template text");
	}

	//find tables
	try{
		$('table').each(function(i){
			if($(this).attr('style') == undefined && $(this).attr('border') == undefined && $(this).attr('height') == undefined && $(this).attr('width') == undefined){
				var  errMsg = "TABLE - WARNING.  Table Found. Please ensure that it displays appropriate tabular data."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "warningImage" src="' + b64Warning + '"></img></a>');
				counter++;
			}
			else{
				var  errMsg = "TABLE - Illegal styling on table. Please remove."
				$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
		})
			}
	catch(err){
		console.log("Could Not Execute: Find Table");
	}

	//find table children and error if style exists
	try{
		$('table').each(function(i){
			$(this).find('td').each(function(k){
				if($(this).attr('style') == undefined && $(this).attr('border') == undefined && $(this).attr('height') == undefined && $(this).attr('width') == undefined){
				}
				else{
					var  errMsg = "TABLE - Illegal styling in table cell. Please remove."
					$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
			})
		})
			}
	catch(err){
		console.log("Could Not Execute: find table children and error if style exists");
	}

ckSections()
}

//Check Sections
function ckSections() {

	//All content inside a section
	try{
		$('article').children().not(".bgqcc_error").each(function(i){
			if($(this).get(0).tagName == "SECTION" || $(this).get(0).tagName == "HR" || $(this).get(0).tagName == "BR"){
			}
			else{
				var  errMsg = "SECTION - Text not inside a section. Please move into a section."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
		})
	}
	catch(err){
		console.log("Could Not Execute: All content inside a section");
	}

	//Check for nested sections
	try{
		$('section').each(function(i){
			if($(this).attr('id') == "contentContainer" && $(this).parent().attr('id') == "contentContainer"){
				if($(this).attr('class') == "selfcheck"){
				}
				else{
					var  errMsg = "SECTION - Section nested inside of another section. Section should belong inside the red area."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					
					counter++;
				}
			}
			else{}
				})
	}
	catch(err){
		console.log("Could Not Execute: Check for nested sections");
	}

	//No consecutive HR
	try{
		$('#teacherContent').find('hr').each(function(i){
			if($(this).html() == $(this).next().html()){
					var  errMsg = "SECTION - Multiple horizontal lines after section. Please remove one of the <hr> from the source view."
          $(this).before('<a class="anchorLoc PageFixer_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
          
          counter++;
			}else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: No consecutive HR");
	}

	//No HR
	try{
		$('section').each(function(i){

			if($(this).attr('id') == "contentContainer"){
				if($(this).next('hr').length < 1){
					var  errMsg = "SECTION - No horizontal line after a section. Add a <hr> after a </section> in the source view"
					$(this).after('<a class="anchorLoc PageFixer_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
				else{}
			}
			else{}			
		})
	}
	catch(err){
		console.log("Could Not Execute: No HR");
	}

	//Verify section has H2
	try{
		$('#teacherContent').find('section').each(function(i){
     if($(this).attr('id')=='contentContainer'){
         if($(this).find('h2') == undefined){
          var  errMsg = "SECTION - Section missing title."
          $(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
          
          counter++;
        }
        else{} 
     }else{}
						
		})
	}
	catch(err){
		console.log("Could Not Execute: Verify section has H2");
	}
	
ckText()
}
	
// Check Text
function ckText(){

	//check for no styles in p
	try{
		$("p").each(function(i){
			if($(this).attr("style") != undefined){
				if($(this).attr("class") == "MathJax" || $(this).attr("class") == "MathJax_Preview"){

				}
				else{
					var  errMsg = "TEXT - <p> contains `style=` code. Please remove from the source view.";
					$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: check for no styles in p");
	}
	
	//check for align in p
	try{
		$("p").each(function(i){
			if($(this).attr("align") == "center"){
				if($(this).attr("class") == "MathJax" || $(this).attr("class") == "MathJax_Preview"){

				}
				else{
					var  errMsg = "TEXT - <p> contains `style=` code. Please remove from the source view.";
					$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: check for no styles in p");
	}

	//check for no styles in span
	try{
		$('span').each(function(i){
			if($(this).hasClass('MathJax_Preview') || $(this).closest('.MathJax').length > 0){

			}else{
				if($(this).attr("style") != undefined && $(this).attr("style") == "text-decoration: underline;" && $(this).attr("style") != "font-weight: bold;" && $(this).attr("style") != "font-style: italic;" && $(this).attr("style") != "font-weight: bold; font-style: italic;"){
	              var  errMsg = "TEXT - Element contains `align=` code. Please remove from the source view.";
		              $(this).append('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
		              counter++;
				}
				else{
					
				}
			}
		})
	}
	catch(err){
		console.log("Could Not Execute: check for no styles in span");
	}

	//check for align in p
	try{
		$("span").each(function(i){
			if($(this).attr("align") == "center"){
				if($(this).attr("class") == "MathJax" || $(this).attr("class") == "MathJax_Preview"){

				}
				else{
					var  errMsg = "TEXT - <span> contains `align=` code. Please remove from the source view.";
					$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: check for no styles in p");
	}


	//verify all links open in new window
	try{
		$('#teacherContent').find('a').each(function(i){
		    if($(this).attr('href')){
		        if($(this).attr('target') == '_top'){
							var  errMsg = "TEXT - Links must be set to open in a new window."
							$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
							
							counter++;
		        }
		        else{}
		    }
		    else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: verify all links open in new window");
	}

	//find ecot passwords
	try{
		$('p').each(function(i){
			var refMatch = $(this).text().match(/ec0t/);
			if(refMatch != null){
				var  errMsg = "TEXT - Illegal password. You can not include 3rd party logins on a this page."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})

		$('li').each(function(i){
			var refMatch = $(this).text().match(/ec0t/);
			if(refMatch != null){
				var  errMsg = "TEXT - Illegal password. You can not include 3rd party logins on a this page."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: find ecot passwords");
	}


	//Check for extra whitespace
	try{
		$('section #contentContainer').find('p').each(function(i){
			var txtContainer = $(this).html(); 
			var  errMsg = "TEXT - Extra spacing found in text. Please remove through the source view."
			if(txtContainer.indexOf('&nbsp;&nbsp;') > 1){
				$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				
				counter++;
			}
			else if(txtContainer.indexOf('&#160;&#160;') > 1){
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: Check for extra whitespace");
	}

	//Check for non blue label links that direct to downloads
	try{
		$('a').each(function(i){
			if($(this).attr("href")){
				if($(this).find('img').length == 0){
					var fileType = $(this).attr("href").split('.').pop();
					if(fileType == "pdf" || fileType == "doc" || fileType == "docx" || fileType == "ppt" || fileType == "pptx" || fileType == "xls" || fileType == "xlm" || fileType == "xlsm" || fileType == "txt"){
						if($(this).parent().find("span").attr("class") != "label default"){
							var  errMsg = "TEXT - Download link is not in blue label. "
							$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
							$(this).parent('p').find('span').attr('title', 'notBlueLabel');
							counter++;
						}
						else{
						}
					}
					else{}
				}
				else{}
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: Check for non blue label links that direct to downloads");
	}


	//find MS Office code
	try{
		$('.docContent').find("*").each(function(i){
			if($(this).html().match(/OfficeDocumentSettings/) != null){
				var  errMsg = "TEXT - MS Office code found. Please remove through source view."
				$(this).parent().find('h2').before('<a class="anchorLoc" name="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: find MS Office code");
	}
	ckBlueLabels ()
}

// Check Labels
function ckBlueLabels (){

	//No file://
	try{
		$(".label.default").each(function(i){
		  if($(this).parent().find('a').attr('href').indexOf("../") > -1 || $(this).parent().find('a').attr('href').indexOf("file://") > -1){
				var  errMsg = 'BLUE LABEL - File path not relative. e.g. "docs/cats.docx"'
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate link to absolute dir and display error ");
	}

	//make sure blue labels have a URL
	try{
		$(".label.default").each(function(i){
			var blURL = $(this).parent().find('a').attr('href');
			if (blURL.length < 1){
				var  errMsg = "BLUE LABEL - No link found. There must be a link to a file."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: make sure blue labels have a URL");
	}

	//Test for too many links
		try{
		$(".label.default").each(function(i){
			if ($(this).parent().find('a:not(.bgqcc_error)').length > 1){
				var  errMsg = "BLUE LABEL - Multiple links found. One link per label."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: Test for too many links");
	}

	//Check for absuolute URL that does not contain "ecot.iqity"
	try{
		$(".label.default").each(function(i){
			var internalSite = $(this).closest('p').find('a').attr('href');
			if(internalSite.indexOf("http")>=0){
				if(internalSite.indexOf("ecot.iqity")<0){
					var  errMsg = "BLUE LABEL - Link not to a file housed in IQity."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					
					counter++;
				}
				else{}
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: Check for absuolute URL that does not contain 'ecot.iqity'");
	}

	//check for a match between file name and file link
	try{
		$(".label.default").each(function(i){
			var labelLink = $(this).closest('p').find('a').attr('href').split('/').pop();
			var labelText = $(this).parent().text().replace(/\s+/g, '%20');
			if(labelText.indexOf(labelLink)<0){
        		var  errMsg = "BLUE LABEL - Filename proceeding label does not match filename in link. Filenames must match exactly."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: check for a match between file name and file link");
	}

	//verify directions exist after file name
	try{
		$(".label.default").each(function(i){
			var labelHTMLstart = $(this).parent().html().split('</span>')[1].split('<a')[0].replace(/\s+/g,' ');
			var errorCaught = 0;
			var linkText = $(this).parent().find('a').text();
			var splitArray = $(this).parent().html().split('</span>')[1].split('<a ')[0].trim().replace(/&nbsp;/g, '');
			var errorCaught = 0;
			if(splitArray.length > 0){
					errorCaught = 1;
					var  errMsg = "BLUE LABEL - Instructions must be after the link."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					
					counter++;
			}
			else{}
			var labelHTML = $(this).parent().html().split('</a>')[1].replace(/\s+/g,' ');
			var words = labelHTML.split(" ");
			if (words.length < 5 && errorCaught == 0){
				var  errMsg = "BLUE LABEL - Insufficient instructions. Please add instructions after link."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			} else {}
			errorCaught = 0;
		})
	}
	catch(err){
		console.log("Could Not Execute: verify directions exist after file name");
	}

	ckGreenLabels ()
}

function ckGreenLabels (){

	//make sure green labels have a URL
	try{
		$(".label.new").each(function(i){
			// var URL = $(this).closest('p').find('a').attr('href');
			if ($(this).closest('p').find('a').attr('href')){
				
			}
			else{
				var  errMsg = "GREEN LABEL - No link to external website."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				
				counter++;
			}
		})
	}
	catch(err){
			console.log("Could Not Execute: make sure green labels have a URL");
		}

	ckOtherLabels()
}

//Check other labels
function ckOtherLabels(){

	//Make sure label links are in green label if not a download
	try{
		$('.label').each(function(i){
			// $(this).prepend(i + " ");

			if($(this).attr('class').indexOf('default') > 0 || $(this).attr('class').indexOf('new') > 0){
				// console.log("Ignore " + i);
			}
			else{

				// console.log("Found red, yellow, or purple label.");
				if($(this).closest('p').find('a').attr('href')){
					
					if($(this).attr('title') == 'notBlueLabel'){
						// console.log(i + ' has already been caught');
					}
					else{
						var linksplit = $(this).closest('p').find('a').attr('href').split('/').pop();
						var lastindex = linksplit[linksplit.length-1].split('.').pop();
						// console.log(i + " info: linksplit= " + linksplit + " & lastindex= " + lastindex);

						if(lastindex == "pdf" || lastindex == "doc" || lastindex == "docx" || lastindex == "ppt" || lastindex == "pptx" || lastindex == "xls" || lastindex == "xlm" || lastindex == "xlsm" || lastindex == "txt"){
							
						}
						else{
							var  errMsg = "LABEL - This label contains a link that should be in a green label"
							$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
							counter++;
						}
					}
					

				}
				else{
					// console.log("Ignore " + i);
				}
			}

		});
	}
	catch(err){
		console.log("Could Not Execute: Make sure label links are in green label if not a download");
	}

	ckSoloLinks()
}

function ckSoloLinks(){
	// try{
		$('#teacherContent').find('a').each(function(i){
			try{
				if($(this).hasClass('anchorLoc') || $(this).hasClass('bgqcc_error') || $(this).prev().attr('class') == "label new" || $(this).parent().attr('class') == 'picture' || $(this).parent().parent().attr('class') == 'media-grid' || $(this).prev().attr('class') == "label default" || $(this).attr('href') == "#"){

				}
				else{
					var  errMsg = 'LINK - Not in green label or on image.'
					$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}

			}
			catch(err){
				console.log("Could Not Execute: Find links not in green label or on image.");
			}			
		})
	// }
	// catch(err){
		// console.log("Could Not Execute: Check for links outside of green label or images.")
	// }
	ckImages ()
}

// Check Images
function ckImages () {

	//locate link to absolute dir and display error 
	try{
		$(".picture").each(function(i){
		  if($(this).find('img').attr('src').indexOf("../") > -1 || $(this).find('img').attr('src').indexOf("file://") > -1){
				var  errMsg = 'IMAGE - File path not relative. e.g. "images/cats.jpg""'
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate link to absolute dir and display error ");
	}

	//locate image and error if not in "figure" tag
	try{
		$("img").each(function(i){
			if($(this).parent().get(0).tagName == "A"){
				if($(this).parent().parent().get(0).tagName !="FIGURE" && $(this).parent().parent().parent().attr("class") != "media-grid" && $(this).attr("src") != base64Img && $(this).attr("src") !=b64Warning){
				if($(this).attr("src") != "images/remove.png"){
					var  errMsg = "IMAGE - Incorrect image embed. Please remove and insert using the 'add a image with caption' button located on the ECOT Toolbar."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					
					counter++;
				}
				else{}
		  }
		  else{}
			}else{
				if($(this).parent().get(0).tagName !="FIGURE" && $(this).parent().parent().attr("class") != "media-grid" && $(this).attr("src") != base64Img && $(this).attr("src") !=b64Warning){
				if($(this).attr("src") != "images/remove.png"){
					var  errMsg = "IMAGE - Incorrect image embed. Please remove and insert using the 'add a image with caption' button located on the ECOT Toolbar."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					
					counter++;
				}
				else{}
		  }
		  else{}
			}
			
		  
		})
	}
	catch(err){
		console.log("Could Not Execute: locate image and error if not in 'figure' tag");
	}


	//locate height and width styles and display error
	try{
		$(".picture").each(function(i){
		  if ($(this).find('img').attr('style') != undefined) {
				var  errMsg = 'IMAGE - Image contains `style=` code. Please remove from the source view.'
				$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else if ($(this).find('img').attr('height') != undefined || $(this).find('img').attr('width') != undefined) {
				var  errMsg = 'IMAGE - Image contains `height=` and/or `width=` code. Please remove from the source view.'
				$(this).prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate height and width styles and display error");
	}

	//locate img grid and error on height and width styles
	try{
		$(".media-grid").each(function(i){
			$(this).find('img').each(function(k){
				var attr = $(this).attr('style');
				  if (typeof attr !== 'undefined' ) {
						var  errMsg = 'IMAGE-GRID - Image-Grid contains `style=` code. Please remove from the source view.'
						$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
						counter++;
				  }
				  else{}
			})
		})
	}
	catch(err){
		console.log("Could Not Execute: locate img grid and error on height and width styles");
	}

	//find base 64 encoded images
	try{
		$("img").each(function(i){
			if($(this).attr('src').indexOf('data:') > 0 && $(this).attr("src") != base64Img && $(this).attr("src") !=b64Warning){
				var  errMsg = "IMAGE - Incorrect image format. Image should be jpg, jpeg, gif, png."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: find base 64 encoded images:");
	}
					

					
	//confirm linked images have a caption.
// 	try{
// 	$('#teacherContent').find('img').each(function(i){
// 		if($(this).attr("src") != base64Img && $(this).attr("src") != b64Warning && $(this).parent().prop('tagName') == 'A'){
// 			if(($(this).parent().next().prop('tagName') != 'FIGCAPTION')){
// 		 		var  errMsg = "IMAGE - Image caption code has been disrupted.  Please remove this figure and redo."
// 				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
// 				counter++;
// 			}
// 			else{
// 				if($(this).parent().next().prop('tagName') == 'FIGCAPTION'){
// 					if($(this).parent().next().html().length > 0){
						
// 								var words = $(this).parent().next().find('p').text().split(" ");
// 								if (words.length < 4){
// 									var  errMsg = "IMAGE - Insufficient instructions. Please add more than three words."
// 									$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
// 									counter++;
// 								} 
// 								else {}
// 					}
// 					else{
// 						var  errMsg = "IMAGE - No <p> found in figure caption.  Linked images require instructions in the caption."
// 						$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
// 						counter++;
// 					}
// 				}
// 				else{
// 					if($(this).parent().parent().parent().attr("class") == "media-grid"){

// 					}
// 					else{
// 						var  errMsg = "IMAGE - No figure caption <figcaption> found after </figure> in source view.  Please remove and insert using the 'add a image with caption' button located on the ECOT Toolbar."
// 						$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
// 						counter++;
// 					}
// 				}
// 			}				
// 		}
// 		else{}
// 	})
// }
// catch(err){
// 	console.log("Could Not Execute: confirm linked images have a caption.");
// }

try{
	$('#teacherContent').find('img').each(function(i){
		if($(this).attr("src") != base64Img && $(this).attr("src") != b64Warning && $(this).parent().prop('tagName') == 'A'){
			if($(this).closest('figure').find("figcaption").parent().prop('tagName') != 'FIGURE'){
		 	// 	var  errMsg = "IMAGE - Image caption code has been disrupted.  Please remove this figure and redo."
				// $(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				// counter++;
			}
			else{

				if($(this).closest("figure").children("figcaption").length > 1){
					var  errMsg = "IMAGE - Found more than one figure caption."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
				}
				else{
					if($(this).parent().next().prop('tagName') == 'FIGCAPTION'){
					if($(this).parent().next().html().length > 0){
						
								var words = $(this).parent().next().find('p').text().split(" ");
								if (words.length < 4){
									var  errMsg = "IMAGE - Insufficient instructions. Please add more than three words."
									$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + b64Warning + '"></img></a>');
									counter++;
								} 
								else {}
					}
					else{
						var  errMsg = "IMAGE - No <p> found in figure caption.  Linked images require instructions in the caption."
						$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
						counter++;
					}
				}
				else{
					if($(this).parent().parent().parent().attr("class") == "media-grid"){

					}
					else{
						var  errMsg = "IMAGE - No figure caption <figcaption> found after </figure> in source view.  Please remove and insert using the 'add a image with caption' button located on the ECOT Toolbar."
						$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
						counter++;
					}
				}
				}
				
			}				
		}
		else{}
	})
}
catch(err){
	console.log("Could Not Execute: confirm linked images have a caption.");
}

	ckAudio ()
}

// Check Audio
function ckAudio () {

	//locate link to absolute dir and display error 
	try{
		$(".ecaAudio").each(function(i){
		  if($(this).attr('src').indexOf("../") > -1 || $(this).attr('src').indexOf("file://") > -1){
				var  errMsg = 'AUDIO - File path not relative. e.g. "audio/cats.mp3"'
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate link to absolute dir and display error ");
	}
	ckEmbed ()
}


// Check Embed
function ckEmbed () {
	//locate link to absolute dir and display error 
	try{
		$(".ecaEmbed").each(function(i){
		  if($(this).find('source').attr('src').indexOf("../") > -1  || $(this).find('source').attr('src').indexOf("file://") > -1){
				var  errMsg = 'EMBED - File path not relative. e.g. "video/cats.mp4"'
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate link to absolute dir and display error ");
	}

	//locate .mp4 and error if not in "video" tag
	try{
		$(".ecaEmbed").each(function(i){
		  if($(this).find('source').attr('src').indexOf(".mp4") > -1){
		  	if($(this).find('video') == 0){
					var  errMsg = "EMBED - Outdated embed code. Please remove and insert using the 'add embed code' button located on the ECOT Toolbar."
					$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
					counter++;
		  	}
		  	else{}
		  }
		  else{}
		})
	}
	catch(err){
		console.log("Could Not Execute: locate .mp4 and error if not in 'video' tag");
	}

	//locate embed and error if not in "figure" tag
	try{
		$("video").each(function(i){			
			if($(this).parent().get(0).tagName !="FIGURE" ){
				var  errMsg = "EMBED - Incorrect media embed. Please remove and insert using the 'Add Embed Code' button located on the ECOT Toolbar."
				$(this).before('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
			else{}	  
		})
	}
	catch(err){
		console.log("Could Not Execute: locate image and error if not in 'figure' tag");
	}
	ckVocab()
}

function ckVocab(){
	$('.vocabSection').each(function(i){
		try{
			if($(this).find('.vocabDefine').length > 0){

			}
			else{
				var  errMsg = "VOCAB - Missing vocabDefine div.  Please remove and redo."
				$(this).append('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
				counter++;
			}
		}
		catch(err){
			console.log("Could Not Execute: Missing vocabDefine div.");
		}

		
	})
	ckLavaData()
}

function ckLavaData(){
	try{

		var domTrim = $('#teacherContent').clone(true);

		$(domTrim).find('#contentContainer').each(function(i){
			$(this).remove();
		})
		$(domTrim).find('hr').each(function(i){
			$(this).remove();
		})
		$(domTrim).find('br').each(function(i){
			$(this).remove();
		})

		if(domTrim.html().trim().length == 0){

			}
		else{
			var  errMsg = "Content exists outside of a section."
			$('#teacherContent').prepend('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
			counter++;
		}
	}
	catch(err){
		console.log("Could Not Execute: Content outside of sections. ckLavaData()");
	}
	ckNonPTxt()

}

function ckNonPTxt(){
	$('#contentContainer').each(function(i){
		var temp = $(this).contents().filter(function(){
	    	return this.nodeType == Node.TEXT_NODE;
	  	}).text().trim()

		if(temp.length > 0){
			var  errMsg = "TXT - Text outside paragraph tags."
			$(this).append('<a class="anchorLoc bgqcc_error" id="'+counter+'" title="' + errMsg + '"><img class= "errorImage" src="' + base64Img + '"></img></a>');
			counter++;
		}
		else{}
		temp = '';
	})
	
}

//Create results container
//$('#eca_alertbar').after('<div class="docContent" id"BGQCCResultsContainer" ><div id="BGQCCResults" style="background: repeating-linear-gradient(  -55deg, #FFF5F5, #FFF5F5 20px, #FFE9E9 20px, #FFE9E9 40px"><h1>Page Checker v'+versionNum+'</h1><h4>Results:</h4><ol id="resultsList" style="font-size: .8em"></ol><div class="helpInfo" style="padding-left: 20px; font-size: .6em;">If errors found include the following:<br>Consult the Page Development OneNote for proper usage.<br>If you have additional questions, please contact Lisa Honsberger.</div></div></div></div><br>');
$('#eca_alertbar').after('<div class="docContent" id"BGQCCResultsContainer" ><div id="BGQCCResults" style="background: repeating-linear-gradient(  -55deg, #FFF5F5, #FFF5F5 20px, #FFE9E9 20px, #FFE9E9 40px"><h1>Page Checker v'+versionNum+'</h1><h4>Results:</h4><ol id="resultsList" style="font-size: .8em"></ol></div></div></div><br>');	

//render results
$('.errorImage').each(function(i){
	/*List item with selection HTML code
	$('#resultsList').append('<li><a class="anchor" href="#'+$(this).parent().attr('id')+ '">' + $(this).parent().attr('title') +'</a><br><xmp id="htmlBlock" style="display:none">' + $(this).parent().next().html() + '</xmp></li>');*/
	var errMsg = $(this).parent().attr('title').replace(/</g, "&lt;").replace(/>/g,"&gt;").replace(/`/g,"&quot;");
	$('#resultsList').append('<li><a class="anchor" href="#'+$(this).parent().attr('id')+ '">' + errMsg +'</a></li>');
})

//Page passed Green Light message
if($('#resultsList').children('li').length == 0){
	$('#BGQCCResults').append('<h1 style="text-align: center;">No errors found</h1><br>');
	$('#BGQCCResults').attr('style','background: repeating-linear-gradient(  45deg, #E9FFF8, #E9FFF8 20px, #CCFAEB 20px, #CCFAEB 40px');
}
else{}

$('#BGQCCResults').append('<br>');

//Click event handler
$('#resultsList a').click(function(e){
	e.preventDefault();
	var scrollLoc = $(this).attr('href')
	$('html, body').animate({
       scrollTop: $(scrollLoc).offset().top - 20
     }, 500, function() {
  		$(scrollLoc).fadeToggle( "slow", function() {
  			$(scrollLoc).fadeToggle( "slow", function() {
  				$(scrollLoc).fadeToggle( "slow", function() {
  					$(scrollLoc).fadeToggle( "slow", function() {
  						$(this).fadeToggle();
  					});
  				});
  			});
  		});
  });
})

console.log("Completed BGQCC");
