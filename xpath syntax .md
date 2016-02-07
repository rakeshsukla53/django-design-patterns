
XPath Syntax

XPath (short for XML Path) is a query language used for navigating and selecting portions of an XML document. It was founded by the W3C in 1999 and is occasionally used in languages such as Python, Java, and C# when dealing with XML documents.

Although BeautifulSoup does not support XPath, many of the other libraries in this book do. It can often be used in the same way as CSS selectors (such as mytag#idname), although it is designed to work with more generalized XML documents rather than HTML documents in particular.

There are four major concepts in the XPath syntax:

    Root nodes versus non-root nodes
        /div will select the div node only if it is at the root of the document
        //div selects all divs anywhere in the document

    Attribute selection
        //@href selects any nodes with the attribute href
        //a[@href='http://google.com'] selects all links in the document that point to Google

    Selection of nodes by position
        //a[3] selects the third link in the document
        //table[last()] selects the last table in the document
        //a[position() < 3] selects the first three links in the document

    Asterisks (*) match any set of characters or nodes, and can be used in a variety of situations
        //table/tr/* selects all children of tr tags in all tables (this is good for selecting cells using both th and td tags)
        //div[@*] selects all div tags that have any attributes

Of course, there are many advanced features of the XPath syntax. Over the years it has developed into a relatively complicated query language, with boolean logic, functions (such as position()), and a variety of operators not discussed here. 

If you have an HTML or XML selection problem that cannot be addressed by the functions shown here, see Microsoft’s XPath syntax page.
Handling Redire