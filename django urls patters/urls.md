**URL anatomy**
Technically, URLs belong to a more general family of identifiers called Uniform Resource Identifiers (URIs). Hence, a URL has the same structure as a URI.
A URI is composed of several parts:
`URI = Scheme + Net Location + Path + Query + Fragment`

**The URL pattern syntax**

The problem with positional arguments is that it is very easy to mix up the order. Hence, we have name-based arguments, where each captured value can be named. Our example will now look like "^jobs/(?P<pk>\d+)/" . This means that the view will be called with a keyword argument pk being equal to "1234"

If you have a class-based view, you can access your positional arguments in self.args and name-based arguments in self.kwargs. Many generic views expect their arguments solely as name-based arguments, for example, self.kwargs["slug"].

