/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){module.exports=a}else{a(jQuery)}}}(function(c){var d=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],k=("onwheel" in document||document.documentMode>=9)?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],h=Array.prototype.slice,j,b;if(c.event.fixHooks){for(var e=d.length;e;){c.event.fixHooks[d[--e]]=c.event.mouseHooks}}var f=c.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener){for(var m=k.length;m;){this.addEventListener(k[--m],l,false)}}else{this.onmousewheel=l}c.data(this,"mousewheel-line-height",f.getLineHeight(this));c.data(this,"mousewheel-page-height",f.getPageHeight(this))},teardown:function(){if(this.removeEventListener){for(var m=k.length;m;){this.removeEventListener(k[--m],l,false)}}else{this.onmousewheel=null}c.removeData(this,"mousewheel-line-height");c.removeData(this,"mousewheel-page-height")},getLineHeight:function(m){var i=c(m),n=i["offsetParent" in c.fn?"offsetParent":"parent"]();if(!n.length){n=c("body")}return parseInt(n.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(i){return c(i).height()},settings:{adjustOldDeltas:true,normalizeOffset:true}};c.fn.extend({mousewheel:function(i){return i?this.bind("mousewheel",i):this.trigger("mousewheel")},unmousewheel:function(i){return this.unbind("mousewheel",i)}});function l(i){var o=i||window.event,u=h.call(arguments,1),w=0,q=0,p=0,t=0,s=0,r=0;i=c.event.fix(o);i.type="mousewheel";if("detail" in o){p=o.detail*-1}if("wheelDelta" in o){p=o.wheelDelta}if("wheelDeltaY" in o){p=o.wheelDeltaY}if("wheelDeltaX" in o){q=o.wheelDeltaX*-1}if("axis" in o&&o.axis===o.HORIZONTAL_AXIS){q=p*-1;p=0}w=p===0?q:p;if("deltaY" in o){p=o.deltaY*-1;w=p}if("deltaX" in o){q=o.deltaX;if(p===0){w=q*-1}}if(p===0&&q===0){return}if(o.deltaMode===1){var v=c.data(this,"mousewheel-line-height");w*=v;p*=v;q*=v}else{if(o.deltaMode===2){var n=c.data(this,"mousewheel-page-height");w*=n;p*=n;q*=n}}t=Math.max(Math.abs(p),Math.abs(q));if(!b||t<b){b=t;if(a(o,t)){b/=40}}if(a(o,t)){w/=40;q/=40;p/=40}w=Math[w>=1?"floor":"ceil"](w/b);q=Math[q>=1?"floor":"ceil"](q/b);p=Math[p>=1?"floor":"ceil"](p/b);if(f.settings.normalizeOffset&&this.getBoundingClientRect){var m=this.getBoundingClientRect();s=i.clientX-m.left;r=i.clientY-m.top}i.deltaX=q;i.deltaY=p;i.deltaFactor=b;i.offsetX=s;i.offsetY=r;i.deltaMode=0;u.unshift(i,w,q,p);if(j){clearTimeout(j)}j=setTimeout(g,200);return(c.event.dispatch||c.event.handle).apply(this,u)}function g(){b=null}function a(m,i){return f.settings.adjustOldDeltas&&m.type==="mousewheel"&&i%120===0}}));if(window.M&&typeof window.M.define=="function"){window.M.define("jq-mousewheel",function(){return jQuery})}M.define("ScrollBar",function(a){a("jq-mousewheel");var c=15;function b(d){this.wrap=null;this.container=null;this.dir=1;this.barTPL='<div style="position:absolute; top:0; right:0; padding:1px"><div style="width:7px; height:100%; background:#bbb"></div></div>';this.maxHeight=0;M.mix(this,d);this.container=$(this.container);this.wrap=$(this.wrap);this.scrollBar=null;this.stopped=false;this.scrollToEnd=false;this.init()}b.prototype={init:function(){if(!this.container.length){M.error("ScrollBar init failed for no scroll container.");return false}this.posDir=this.dir===0?"left":"top";this.lengthDir=this.dir===0?"width":"height";this.scrollScale=this.dir===0?"scrollWidth":"scrollHeight";this.clientScale=this.dir===0?"clientWidth":"clientHeight";this.scrollDir=this.dir===0?"scrollLeft":"scrollTop";this.initWrap();this.bindEvents();this.setted=false},initWrap:function(){this.container.css({position:"relative"});if(this.dir==1){this.container.css({"overflow-y":"hidden"})}else{this.container.css({"overflow-x":"hidden"})}if(this.maxHeight&&!isNaN(this.maxHeight)){this.container.css("max-"+this.lengthDir,this.maxHeight).addClass("maxh")}if(!this.wrap.length){this.container.wrap('<div style="position:relative"></div>');this.wrap=this.container.parent()}else{if(this.wrap.css("position")=="static"){this.wrap.css("position","relative")}}this.createScrollBar();if(this.container.height()>0){this.setScrollBar()}},createScrollBar:function(){this.container[0][this.scrollDir]=0;this.scrollBar=$(this.barTPL).css("opacity",0).appendTo(this.wrap)},bindEvents:function(){this.wrap.bind("mouseenter",$.proxy(this.enterWrap,this)).bind("mouseleave",$.proxy(this.leaveWrap,this)).mousewheel($.proxy(this.rollWrap,this));this.scrollBar.mousedown($.proxy(this.holdBar,this));M.Event(this).on("contentchange",$.proxy(this.checkShowScrollBar,this))},setScrollBar:function(){this.checkShowScrollBar()},setDimension:function(){this.wrapStart=this.wrap.offset()[this.posDir]},checkShowScrollBar:function(){var e=this.container[0];this.wrap.css("height",this.container.height());this.wrapLength=this.dir===0?this.wrap.width():this.wrap.height();this.scrollLength=this.dir===0?e.scrollWidth:e.scrollHeight;this.clientLength=this.dir===0?e.clientWidth:e.clientHeight;var d=e[this.scrollDir];if(this.scrollLength>this.clientLength){this.updateScrollBarLength();this.scrollBar.show();if(d<=this.scrollLength-this.clientLength){this.scroll(d)}else{this.scroll(this.scrollLength-this.clientLength)}}else{this.scrollBar.hide()}},updateScrollBarLength:function(){this.barLength=this.wrapLength*(this.clientLength/this.scrollLength);this.barLength=this.barLength<c?c:this.barLength;this.scrollBar.css((this.dir===0?"width":"height"),this.barLength);this.barLength=this.dir===0?this.scrollBar.outerWidth():this.scrollBar.outerHeight()},enterWrap:function(){if(!this.setted){this.setScrollBar();this.setted=true}this.on=true;this.setDimension();this.scrollBar.stop(true,true).animate({opacity:0.8},300)},leaveWrap:function(){this.on=false;if(!this.holded){this.scrollBar.stop(true,true).animate({opacity:0},300)}},stop:function(){this.stopped=true},start:function(){this.stopped=false},rollWrap:function(f,h){if(this.stopped){return true}var d=this.getScrollUnit(-h*f.deltaFactor);d=d<0?Math.floor(d):Math.ceil(d);var g=0,e=this.container[0][this.scrollDir];if(e+d<0){g=0}else{if(e+d+this.clientLength>this.scrollLength){g=this.scrollLength-this.clientLength}else{g=e+d}}this.scroll(g);if(this.scrollBar.is(":visible")){f.preventDefault();f.stopPropagation()}},getScrollUnit:function(d){if($.browser.msie&&parseInt($.browser.version,10)<9){d=30*d}return d},holdBar:function(d){this.holded=true;this.cursorPosition=this.dir===0?d.clientX:d.clientY;this.startCursorOffset=this.cursorPosition-this.scrollBar.offset()[this.posDir];this.listenMouseMove();d.preventDefault()},listenMouseMove:function(){$(document).bind("mousemove",this.getMoveCursorHandler()).bind("mouseup",this.getReleaseCursorHandler())},stopListenMouseMove:function(){$(document).unbind("mousemove",this.getMoveCursorHandler()).unbind("mouseup",this.getReleaseCursorHandler())},getMoveCursorHandler:function(){if(!this.moveCursorHandler){this.moveCursorHandler=$.proxy(this.moveCursor,this)}return this.moveCursorHandler},getReleaseCursorHandler:function(){if(!this.releaseCursorHandler){this.releaseCursorHandler=$.proxy(this.releaseCursor,this)}return this.releaseCursorHandler},moveCursor:function(i){if(this.holded){var e=this.dir===0?i.clientX:i.clientY,h=e-this.cursorPosition,j=this.cursorPosition-this.startCursorOffset-this.wrapStart,g=e-this.startCursorOffset-this.wrapStart,d=this.cursorPosition+(this.barLength-this.startCursorOffset)-this.wrapStart-this.wrapLength,f=e+(this.barLength-this.startCursorOffset)-this.wrapStart-this.wrapLength;if(g>0&&f<0&&h!==0){this.cursorPosition=e;this.moveScrollBar(h)}else{if(g<=0&&j>0&&h!==0){h=-j;this.cursorPosition=this.cursorPosition+h;this.moveScrollBar(h)}else{if(f>=0&&d<0&&h!==0){h=-d;this.cursorPosition=this.cursorPosition+h;this.moveScrollBar(h)}}}}i.preventDefault()},moveScrollBar:function(e){var f=parseInt(this.scrollBar.css(this.posDir),10),d=this.wrapLength-this.barLength-f;if(e<0&&e>-f||e>0&&e<d){f=f+e}else{if(e<0){f=0}else{if(e>0){f=f+d}}}this.scroll((f/(this.wrapLength-this.barLength))*(this.scrollLength-this.clientLength))},scroll:function(d){this.scrollBar.css(this.posDir,d*(this.wrapLength-this.barLength)/(this.scrollLength-this.clientLength));this.container[0][this.scrollDir]=d;M.Event(this).fire("scroll");if(d===0){M.Event(this).fire("scrollToTop");this.scrollToEnd=true}else{if(d+this.container[0][this.clientScale]>=this.container[0][this.scrollScale]){M.Event(this).fire("scrollToBottom");this.scrollToEnd=true}else{this.scrollToEnd=false}}},scrollLength:function(){return this.container[0][this.scrollDir]},releaseCursor:function(){this.holded=false;this.stopListenMouseMove();if(!this.on){this.scrollBar.stop(true,true).animate({opacity:0},300)}}};return b});M.define("/js/note/ControllerCatalogDirectory",function(d){var c=d("ScrollBar");var e=$("#_j_catalogList"),b=$("._j_sticky_block"),i=$("#_j_catalogtitle"),g=i.outerHeight(true),h=$("#_j_sticky_relmdd"),f=h.length?h.outerHeight(true):0;var a=new c({container:e,barTPL:'<div class="scrollbar" style="height: auto;"></div>'});return{events:{"click,._j_cataloglink":"catalogLinkClick"},init:function(){M.Event.on("sticky element height change",$.proxy(this.setCatalogCntHeight,this));if(this.data.init_show){this.setCatalogCntHeight()}M.Event.on("right bottom catalog change",$.proxy(function(j){if(j.target=="schedule"){e.hide()}else{e.show();this.setCatalogCntHeight()}},this))},setCatalogCntHeight:function(j){var m=b.find("._j_topblock"),l=m.length?m.outerHeight(true):0,k=b.height()-g-f-l;e.css("max-height",k);M.Event(a).fire("contentchange")},catalogLinkClick:function(l){var n=$(l.currentTarget),k=n.closest("dl"),j=n.data("index"),m=$("#_j_paragraph_"+j);if(!j){m=$(".view")}$("html, body").animate({scrollTop:m.offset().top-60},500);if(!k.hasClass("show_all")){n.next("._j_toggler").trigger("click")}}}});