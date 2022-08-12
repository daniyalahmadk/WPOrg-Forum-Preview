jQuery(document).ready(function($){
	function wporgprev_parseMd(md){
	  //ul
	  md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
	  md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
	  md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
	  
	  //ol
	  md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
	  md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
	  md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');
	  
	  //blockquote
	  md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
	  
	  
	  //alt h
	  md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
	  md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
	  
	  //images
	  md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
	  
	  //links
	  md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
	  
	  //font styles
	  md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
	  md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
	  md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
	  
	  //pre
	  md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
	  md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
	  
	  //code
	  md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
	  
	  //p
	  md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
	    return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
	  });
	  
	  //strip p from pre
	  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
	  return md; 
	}
	$(".bbp-the-content-wrapper").prepend('<div class="vsbox-prev-box"></div>');
	$(".bbp-the-content-wrapper").prepend('<div class="vsbox-wrp-links"><a class="vsbox-cs-con vsbox-cs-text vsbox-active" href="javascript:void(0)">Text</a><a class="vsbox-cs-con vsbox-cs-prev" href="javascript:void(0)">Visual</a></div>');
	$(document.body).on("click",".vsbox-cs-prev",function(){
		$(".vsbox-cs-con").removeClass('vsbox-active');
		$(this).addClass('vsbox-active');
		$("#wp-bbp_reply_content-wrap").hide();
		$(".vsbox-prev-box").show();
		var contenttext = $("textarea#bbp_reply_content").val();
		var arr = contenttext.split('\n');
		var contentfinal =  wporgprev_parseMd(contenttext);
		var avatarurl = $("li#wp-admin-bar-my-account img.avatar").attr("src").split('/');
		var lastSegment_avt = avatarurl.pop() || avatarurl.pop();
		avatarurl = 'https://secure.gravatar.com/avatar/'+lastSegment_avt+'&s=150&d=retro&r=g'
		$(".vsbox-prev-box").html('<div class="vsbox-cs-wrp"><ul class="forums bbp-replies"><li class="bbp-body"><div class="status-publish hentry by-plugin-author author-has-badge vsbox-m-con"><div class="bbp-reply-author"><span class="author-badge author-badge-plugin" title="This person is the author of this plugin">Plugin Author</span><a href="#" title="" class="bbp-author-link"><span class="bbp-author-avatar"><img loading="lazy" alt="" src="'+avatarurl+'" class="avatar avatar-100 photo" height="100" width="100" decoding="async"></span><span class="bbp-author-name">'+$("#wp-admin-bar-my-account .display-name").html()+'</span> </a><p class="bbp-user-nicename"> (@'+$("#wp-admin-bar-user-info span.username").html()+')</p><div class="bbp-reply-meta"><p class="bbp-reply-post-date"><a href="#" title="" class="bbp-reply-permalink">Few moments ago</a></p></div></div><div class="bbp-reply-content">'+contentfinal+'</div></div></li></ul></div>');
	});
	$(document.body).on("click",".vsbox-cs-text",function(){
		$(".vsbox-cs-con").removeClass('vsbox-active');
		$("#wp-bbp_reply_content-wrap").show();
		$(".vsbox-prev-box").hide();
		$(this).addClass('vsbox-active');
		

	});
});