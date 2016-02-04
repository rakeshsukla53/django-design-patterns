**URL anatomy**
Technically, URLs belong to a more general family of identifiers called Uniform Resource Identifiers (URIs). Hence, a URL has the same structure as a URI.
A URI is composed of several parts:
`URI = Scheme + Net Location + Path + Query + Fragment`

**The URL pattern syntax**

The problem with positional arguments is that it is very easy to mix up the order. Hence, we have name-based arguments, where each captured value can be named. Our example will now look like "^jobs/(?P<pk>\d+)/" . This means that the view will be called with a keyword argument pk being equal to "1234"

If you have a class-based view, you can access your positional arguments in self.args and name-based arguments in self.kwargs. Many generic views expect their arguments solely as name-based arguments, for example, self.kwargs["slug"].

**Pattern Order**

Order your patterns to take advantage of how Django processes them, that is, top-down. A good rule of thumb is to keep all the special cases at the top. Broader patterns can be mentioned further down. The broadest—a catch-all—if present, can go at the very end.

For example, the path to your blog posts might be any valid set of characters, but you might want to handle the About page separately. The right sequence of patterns should be as follows:

    urlpatterns = patterns(
        '',
        url(r'^about/$', AboutView.as_view(), name='about'),
        url(r'^(?P<slug>\w+)/$', ArticleView.as_view(), name='article'),
    )  
**If we reverse the order, then the special case, the AboutView, will never get called.**












