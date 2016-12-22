$(document).ready(function () {

	var sticky = {

		// sticky: $('.element'),
		// parent: $('.sidebar'),
		// stickyHeight: this.sticky.height(),
		// parentHeight: this.parent.height(),

		init: function(sticky, parent, spacer){
			var self = this;
			self.sticky = $(sticky);
			self.parent = $(parent);
			self.spacer = $(spacer);
			self.stickyHeight = self.sticky.outerHeight();
			self.parentHeight = self.parent.outerHeight();
			self.spacerHeight = self.spacer.outerHeight();
			self.render();
			self.attachEvents();
		},

		render: function(){
			var self = this;
			var stickyOffset = self.sticky.offset().top;
			var parentOffset = self.parent.offset().top;
			var winScroll = $(window).scrollTop();
			var winHeight = $(window).outerHeight();
			
			var cond = 
			self.inViewport(self.parent, false)
			&& (self.spacer ? (winScroll > (self.spacerHeight + parentOffset - winHeight)) : true)
			&& (winScroll < self.parentHeight)
			&& ((self.parentHeight + parentOffset - self.stickyHeight) >= (winHeight + winScroll));

			if(cond){
				self.sticky.addClass('sticky');
			} else {
				self.sticky.removeClass('sticky');
			}
		},

		attachEvents: function(){
			var self = this;
			$(window).on('resize scroll', function(){
				self.render();
			});
		},

		inViewport: function(element, fullyInView) {
			var pageTop = $(window).scrollTop();
			var pageBottom = pageTop + $(window).outerHeight();
			var elementTop = $(element).offset().top;
			var elementBottom = elementTop + $(element).outerHeight();

			if (fullyInView === true) {
				return ((pageTop < elementTop) && (pageBottom > elementBottom));
			} else {
				return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
			}
		}
		
	};

	sticky.init('.element', '.sidebar', '.spacer');

});