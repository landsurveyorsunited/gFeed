(function(b){var c=null;b.fn.rssfeed=function(e,d){var f={limit:10,header:true,entriesHead:'<h1 class="rssHeader">                        <a href="{feedLink}" title="{feedDescription}">{feedTitle}</a>                        <span style="font-size:10px;color:#ccc">                          ({feedCount} feeds)                        </span>                      </h1>                    <div class="rssBody">                    <ul>',entriesBody:'<li class="rssRow">                      <h4>                        <a href="{link}" title="View this feed at {title}">                          {title}                         </a>                      </h4>                      <div style="font-size:10px;color:#ccc">{pubDate}</div>                      <p>{contentSnippet}</p>                      </li>',entriesFooter:"</ul></div>",rowSnippet:false,displayHeadingAt:false,showerror:true,errormsg:"",key:null};var d=b.extend(f,d);return this.each(function(h,k){var g=b(k);if(!g.hasClass("rssFeed")){g.addClass("rssFeed")}if(e==null){return false}var j="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+e;if(d.limit!=null){j+="&num="+d.limit}if(d.key!=null){j+="&key="+d.key}b.getJSON(j,function(i){if(i.responseStatus==200){a(k,i.responseData.feed,d)}else{if(d.showerror){if(d.errormsg!=""){var l=d.errormsg}else{var l=i.responseDetails}}b(k).html('<div class="rssError"><p>'+l+"</p></div>")}})})};var a=function(j,p,q){if(!p){return false}var h="";var o={feedURL:p.feedURL,feedTitle:p.title,feedLink:p.link,feedDescription:p.description,feedAuthor:p.author,feedEntries:p.entries,feedCount:p.entries.length};var d=b.extend(q,o);if(q.rowSnippet){if(q.displayHeadingAt){var l=b(q.displayHeadingAt).html().interpret(d);b(q.displayHeadingAt).html(l)}for(var g=0;g<p.entries.length;g++){var m=p.entries[g];var n=new Date(m.publishedDate);var k=n.toLocaleDateString()+" "+n.toLocaleTimeString();var f=b.extend(d,m,{pubDate:k});h+=b(j).children(q.rowSnippet).html().interpret(f)}}else{if(q.header){h+=q.entriesHead.interpret(d)}for(var g=0;g<p.entries.length;g++){var m=p.entries[g];var n=new Date(m.publishedDate);var k=n.toLocaleDateString()+" "+n.toLocaleTimeString();var f=b.extend(d,m,{pubDate:k});h+=q.entriesBody.interpret(f)}if(q.header&&!q.inline){h+=q.entriesFooter.interpret(f)}}b(j).html(h)}})(jQuery);String.prototype.interpret=function(a){return this.replace(/{([^{}]*)}/g,function(d,c){var e=a[c];return typeof e==="string"||typeof e==="number"?e:d})};