$(document).ready(function () {

	var sticky = {

		init: function(el){
			var self = this;
			var container = $(el);
			self.sticky = container.find('.element');
			self.static = container.find('.text');
			self.stickyHeight = self.sticky.outerHeight();
			self.staticHeight = self.static.outerHeight();
			self.render();
			self.attachEvents();
		},

		render: function(){
			var self = this;
			var staticOffset = self.static.offset().top;
			var winBottomPos = $(window).height() + $(window).scrollTop();
			
			var cond = 
			(winBottomPos >= staticOffset)
			&& (winBottomPos <= (staticOffset + self.staticHeight + self.stickyHeight));

			self.sticky.toggleClass('sticky', cond);
		},

		attachEvents: function(){
			var self = this;
			$(window).on('resize scroll', function(){
				self.render();
			});
		}
		
	};

	sticky.init('#sidebar');

});