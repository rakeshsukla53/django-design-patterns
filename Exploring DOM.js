/**
 * Created by rakesh on 2/7/16.
 */


Skip to content

    Safari
    Recommended
    Queue
        Recent
        Topics
        Tutorials
        Highlights
        Settings
        Feedback
        Sign Out

Table of Contents for
Introduction to JavaScript
Introduction to JavaScript
0 of 25 lessons completed (5 hrs, 42 mins left)

Books and videos featured in this tutorial

    The JavaScript Language

Nuts ’n’ Bolts (27 mins)
Data Types (17 mins)
Functions (19 mins)
Error Handling (6 mins)
Idiomatic JavaScript (23 mins)
Test Your Code (15 mins)

    Build Your Own Programming Language (17 mins)

The Browser

The DOM (17 mins)
Ajax (15 mins)
Web Sockets (9 mins)
jQuery (5 mins)
Modules (21 mins)
Frameworks (8 mins)

    Create a Web Application (15 mins)

Node.js

The Problem That Node.js Solves (8 mins)
Core of Node.js’s APIs (11 mins)
Use of Node.js (9 mins)
NPM (9 mins)
Storage of Data (32 mins)

    Build a Socket.IO Chat Server (3 mins)

Asynchronous Programming in JavaScript

Callbacks (25 mins)
Event Emitters (10 mins)
Promises (9 mins)
Streams (10 mins)

        Scheduling Events (4 mins)

Prev Previous Chapter
Build Your Own Programming Language
Next Next Chapter
Ajax

    Search in book...

    Toggle Font Controls

0 of 25 lessons completed (5 hrs, 42 mins left)

The DOM
Introduction

You manipulate the content on the page and its presentation via the document object model (DOM), the JavaScript representation of the things the user sees. In this lesson, you’ll learn how the DOM allows you to react to events, create content, and more.

Document Structure

You can imagine an HTML document as a nested set of boxes. Tags such as <body> and </body> enclose other tags, which in turn contain other tags or text. Here’s the example document from the previous chapter:

<!doctype html>
<html>
  <head>
    <title>My  home page</title>

  </head>
  <body>
    <h1>My home  page</h1>
    <p>Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>

This page has the following structure:
image with no caption

The data structure the browser uses to represent the document follows this shape. For each box, there is an object, which we can interact with to find out things such as what HTML tag it represents and which boxes and text it contains. This representation is called the Document Object Model, or DOM for short.

The global variable document gives us access to these objects. Its documentElement property refers to the object representing the <html> tag. It also provides the properties head and body, which hold the objects for those elements.
Trees

Think back to the syntax trees from Chapter 11 for a moment. Their structures are strikingly similar to the structure of a browser’s document. Each node may refer to other nodes, children, which in turn may have their own children. This shape is typical of nested structures where elements can contain subelements that are similar to themselves.

We call a data structure a tree when it has a branching structure, has no cycles (a node may not contain itself, directly or indirectly), and has a single, well-defined “root.” In the case of the DOM, document.documentElement serves as the root.

Trees come up a lot in computer science. In addition to representing recursive structures such as HTML documents or programs, they are often used to maintain sorted sets of data because elements can usually be found or inserted more efficiently in a sorted tree than in a sorted flat array.

A typical tree has different kinds of nodes. The syntax tree for the Egg language had variables, values, and application nodes. Application nodes always have children, whereas variables and values are leaves, or nodes without children.

The same goes for the DOM. Nodes for regular elements, which represent HTML tags, determine the structure of the document. These can have child nodes. An example of such a node is document.body. Some of these children can be leaf nodes, such as pieces of text or comments (comments are written between <!- and -> in HTML).

Each DOM node object has a nodeType property, which contains a numeric code that identifies the type of node. Regular elements have the value 1, which is also defined as the constant property document.ELEMENT_NODE. Text nodes, representing a section of text in the document, have the value 3 (document.TEXT_NODE). Comments have the value 8 (document.COMMENT_NODE).

So another way to visualize our document tree is as follows:
image with no caption

The leaves are text nodes, and the arrows indicate parent-child relationships between nodes.
The Standard

Using cryptic numeric codes to represent node types is not a very JavaScript-like thing to do. Later in this chapter, we’ll see that other parts of the DOM interface also feel cumbersome and alien. The reason for this is that the DOM wasn’t designed for just JavaScript. Rather, it tries to define a languageneutral interface that can be used in other systems as well—not just HTML but also XML, which is a generic data format with an HTML-like syntax.

This is unfortunate. Standards are often useful. But in this case, the advantage (cross-language consistency) isn’t all that compelling. Having an interface that is properly integrated with the language you are using will save you more time than having a familiar interface across languages.

As an example of such poor integration, consider the childNodes property that element nodes in the DOM have. This property holds an array-like object, with a length property and properties labeled by numbers to access the child nodes. But it is an instance of the NodeList type, not a real array, so it does not have methods such as slice and forEach.

Then there are issues that are simply poor design. For example, there is no way to create a new node and immediately add children or attributes to it. Instead, you have to first create it, then add the children one by one, and finally set the attributes one by one, using side effects. Code that interacts heavily with the DOM tends to get long, repetitive, and ugly.

But these flaws aren’t fatal. Since JavaScript allows us to create our own abstractions, it is easy to write some helper functions that allow you to express the operations you are performing in a clearer and shorter way. In fact, many libraries intended for browser programming come with such tools.
Moving Through the Tree

DOM nodes contain a wealth of links to other nearby nodes. The following diagram illustrates these:
image with no caption

Although the diagram shows only one link of each type, every node has a parentNode property that points to its containing node. Likewise, every element node (node type 1) has a childNodes property that points to an array-like object holding its children.

In theory, you could move anywhere in the tree using just these parent and child links. But JavaScript also gives you access to a number of additional convenience links. The firstChild and lastChild properties point to the first and last child elements or have the value null for nodes without children. Similarly, previousSibling and nextSibling point to adjacent nodes, which are nodes with the same parent that appear immediately before or after the node itself. For a first child, previousSibling will be null, and for a last child, nextSibling will be null.

When dealing with a nested data structure like this one, recursive functions are often useful. The following recursive function scans a document for text nodes containing a given string and returns true when it has found one:

function talksAbout(node, string) {
  if (node.nodeType == document.ELEMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string))
        return true;
    }
    return false;
  } else if (node.nodeType == document.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "book"));
// ▹ true

The nodeValue property of a text node refers to the string of text that it represents.
Finding Elements

Navigating these links among parents, children, and siblings is often useful, as in the previous function, which runs through the whole document. But if we want to find a specific node in the document, reaching it by starting at document.body and blindly following a hard-coded path of links is a bad idea. Doing so bakes assumptions into our program about the precise structure of the document—a structure we might want to change later. Another complicating factor is that text nodes are created even for the whitespace between nodes. The example document’s body tag does not have just three children (<h1> and two <p> elements) but actually has seven: those three, plus the spaces before, after, and between them.

So if we want to get the href attribute of the link in that document, we don’t want to say something like “Get the second child of the sixth child of the document body.” It’d be better if we could say “Get the first link in the document.” And we can.

var link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

All element nodes have a getElementsByTagName method, which collects all elements with the given tag name that are descendants (direct or indirect children) of the given node and returns them as an array-like object.

To find a specific single node, you can give it an id attribute and use document.getElementById instead.

<p>My ostrich Gertrude:</p>
<p><img id="gertrude" src="img/ostrich.png"></p>

<script>
  var ostrich = document.getElementById("gertrude");
  console.log(ostrich.src);
</script>

A third, similar method is getElementsByClassName, which, like getElementsByTagName, searches through the contents of an element node and retrieves all elements that have the given string in their class attribute.
Changing the Document

Almost everything about the DOM data structure can be changed. Element nodes have a number of methods that can be used to change their content. The removeChild method removes the given child node from the document. To add a child, we can use appendChild, which puts it at the end of the list of children, or insertBefore, which inserts the node given as the first argument before the node given as the second argument.

<p>One</p>
<p>Two</p>
<p>Three</p>

<script>
  var paragraphs = document.body.getElementsByTagName("p");
  document.body.insertBefore(paragraphs[2], paragraphs[0]);
</script>

A node can exist in the document in only one place. Thus, inserting paragraph “Three” in front of paragraph “One” will first remove it from the end of the document and then insert it at the front, resulting in “Three/ One/Two.” All operations that insert a node somewhere will, as a side effect, cause it to be removed from its current position (if it has one).

The replaceChild method is used to replace a child node with another one. It takes as arguments two nodes: a new node and the node to be replaced. The replaced node must be a child of the element the method is called on. Note that both replaceChild and insertBefore expect the new node as their first argument.
Creating Nodes

In the following example, we want to write a script that replaces all images (<img> tags) in the document with the text held in their alt attributes, which specifies an alternative textual representation of the image.

This involves not only removing the images but adding a new text node to replace them. For this, we use the document.createTextNode method.

<p>The <img src="img/cat.png" alt="Cat"> in the
  <img src="img/hat.png" alt="Hat">.</p>

<p><button onclick="replaceImages()">Replace</button></p>

<script>
  function replaceImages() {
    var images = document.body.getElementsByTagName("img");
    for (var i = images.length - 1; i >= 0; i--) {
      var image = images[i];
      if (image.alt) {
        var text = document.createTextNode(image.alt);
        image.parentNode.replaceChild(text, image);
      }
    }
  }
</script>

Given a string, createTextNode gives us a type 3 DOM node (a text node), which we can insert into the document to make it show up on the screen.

The loop that goes over the images starts at the end of the list of nodes. This is necessary because the node list returned by a method like getElementsByTagName (or a property like childNodes) is live. That is, it is updated as the document changes. If we started from the front, removing the first image would cause the list to lose its first element so that the second time the loop repeats, where i is 1, it would stop because the length of the collection is now also 1.

If you want a solid collection of nodes, as opposed to a live one, you can convert the collection to a real array by calling the array slice method on it.

var arrayish = {0: "one", 1: "two", length: 2};
var real = Array.prototype.slice.call(arrayish, 0);
real.forEach(function(elt) { console.log(elt); });
// ▹ one
//   two

To create regular element nodes (type 1), you can use the document.createElement method. This method takes a tag name and returns a new empty node of the given type.

The following example defines a utility elt, which creates an element node and treats the rest of its arguments as children to that node. This function is then used to add a simple attribution to a quote.

<blockquote id="quote">
  No book can ever be finished. While working on it we learn
  just enough to find it immature the moment we turn away
  from it.
</blockquote>

<script>
  function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
      var child = arguments[i];
      if (typeof child == "string")
        child = document.createTextNode(child);
      node.appendChild(child);
    }
    return node;
  }

  document.getElementById("quote").appendChild(
    elt("footer", "--",
        elt("strong", "Karl Popper"),
        ", preface to the second editon of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"));
</script>

This is what the resulting document looks like:

    No book can ever be finished. While working on it we learn just enough to find it immature the moment we turn away from it.

    —Karl Popper, preface to the second edition of The Open Society and Its Enemies, 1950

Attributes

Some element attributes, such as href for links, can be accessed through a property of the same name on the element’s DOM object. This is the case for a limited set of commonly used standard attributes.

But HTML allows you to set any attribute you want on nodes. This can be useful because it allows you to store extra information in a document. If you make up your own attribute names, though, such attributes will not be present as a property on the element’s node. Instead, you’ll have to use the getAttribute and setAttribute methods to work with them.

<p data-classified="secret">The launch code is 00000000.</p>
<p data-classified="unclassified">I have two feet.</p>

<script>
  var paras = document.body.getElementsByTagName("p");
  Array.prototype.forEach.call(paras, function(para) {
    if (para.getAttribute("data-classified") == "secret")
      para.parentNode.removeChild(para);
  });
</script>

I recommended prefixing the names of such made-up attributes with data- to ensure they do not conflict with any other attributes.

As a simple example, we’ll write a “syntax highlighter” that looks for <pre> tags (“preformatted,” used for code and similar plaintext) with a data- language attribute and crudely tries to highlight the keywords for that language.

function highlightCode(node, keywords) {
  var text = node.textContent;
  node.textContent = ""; // Clear the node

  var match, pos = 0;
  while (match = keywords.exec(text)) {
    var before = text.slice(pos, match.index);
    node.appendChild(document.createTextNode(before));
    var strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(match[0]));
    node.appendChild(strong);
    pos = keywords.lastIndex;
  }
  var after = text.slice(pos);
  node.appendChild(document.createTextNode(after));
}

The function highlightCode takes a <pre> node and a regular expression (with the “global” option turned on) that matches the keywords of the programming language that the element contains.

The textContent property is used to get all the text in the node and is then set to an empty string, which has the effect of emptying the node. We loop over all matches of the keyword expression, appending the text between them as regular text nodes, and the text matched (the keywords) as text nodes wrapped in <strong> (bold) elements.

We can automatically highlight all programs on the page by looping over all the <pre> elements that have a data-language attribute and calling highlightCode on each one with the correct regular expression for the language.

var languages = {
  javascript: /\b(function|return|var)\b/g /* ... etc */
};

function highlightAllCode() {
  var pres = document.body.getElementsByTagName("pre");
  for (var i = 0; i < pres.length; i++) {
    var pre = pres[i];
    var lang = pre.getAttribute("data-language");
    if (languages.hasOwnProperty(lang))
      highlightCode(pre, languages[lang]);
  }
}

Here is an example:

<p>Here it is, the identity function:</p>
<pre data-language="javascript">
function id(x) { return x; }
</pre>

<script>highlightAllCode();</script>

This produces a page that looks like this:

Here it is, the identity function:

function id(x) { return x; }

There is one commonly used attribute, class, which is a reserved word in the JavaScript language. For historical reasons—some old JavaScript implementations could not handle property names that matched keywords or reserved words—the property used to access this attribute is called className. You can also access it under its real name, "class", by using the getAttribute and setAttribute methods.
Layout

You might have noticed that different types of elements are laid out differently. Some, such as paragraphs (<p>) or headings (<h1>), take up the whole width of the document and are rendered on separate lines. These are called block elements. Others, such as links (<a>) or the <strong> element used in the previous example, are rendered on the same line with their surrounding text. Such elements are called inline elements.

For any given document, browsers are able to compute a layout, which gives each element a size and position based on its type and content. This layout is then used to actually draw the document.

The size and position of an element can be accessed from JavaScript. The offsetWidth and offsetHeight properties give you the space the element takes up in pixels. A pixel is the basic unit of measurement in the browser and typically corresponds to the smallest dot that your screen can display. Similarly, clientWidth and clientHeight give you the size of the space inside the element, ignoring border width.

<p style="border: 3px solid red">
  I'm boxed in
</p>

<script>
  var para = document.body.getElementsByTagName("p")[0];
  console.log("clientHeight:", para.clientHeight);
  console.log("offsetHeight:", para.offsetHeight);
</script>

Giving a paragraph a border draws a rectangle around it.
image with no caption

The most effective way to find the precise position of an element on the screen is the getBoundingClientRect method. It returns an object with top, bottom, left, and right properties, indicating the pixel positions of the sides of the element relative to the top left of the screen. If you want them relative to the whole document, you must add the current scroll position, found under the global pageXOffset and pageYOffset variables.

Laying out a document can be quite a lot of work. In the interest of speed, browser engines do not immediately re-layout a document every time it is changed but rather wait as long as they can. When a JavaScript program that changed the document finishes running, the browser will have to compute a new layout in order to display the changed document on the screen. When a program asks for the position or size of something by reading properties such as offsetHeight or calling getBoundingClientRect, providing correct information also requires computing a layout.

A program that repeatedly alternates between reading DOM layout information and changing the DOM forces a lot of layouts to happen and will consequently run really slowly. The following code shows an example of this. It contains two different programs that build up a line of X characters 2,000 pixels wide and measures the time each one takes.

<p><span id="one"></span></p>
<p><span id="two"></span></p>
<script>
  function time(name, action) {
    var start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
  }

  time("naive", function() {
    var target = document.getElementById("one");
    while (target.offsetWidth < 2000)
      target.appendChild(document.createTextNode("X"));
  });
  // ▹ naive took 32 ms

  time("clever", function() {
    var target = document.getElementById("two");
    target.appendChild(document.createTextNode("XXXXX"));
    var total = Math.ceil(2000 / (target.offsetWidth / 5));
    for (var i = 5; i < total; i++)
      target.appendChild(document.createTextNode("X"));
  });
  // ▹ clever took 1 ms
</script>

Styling

We have seen that different HTML elements display different behavior. Some are displayed as blocks, others inline. Some add styling, such as <strong> making its content bold and <a> making it blue and underlining it.

The way an <img> tag shows an image or an <a> tag causes a link to be followed when it is clicked is strongly tied to the element type. But the default styling associated with an element, such as the text color or underline, can be changed by us. Here is an example using the style property:

<p><a href=".">Normal link</a></p>
<p><a href="." style="color: green">Green link</a></p>

The second link will be green instead of the default link color.

Normal link

Green link

A style attribute may contain one or more declarations, which are a property (such as color) followed by a colon and a value (such as green). When there is more than one declaration, they must be separated by semicolons, as in "color: red; border: none".

There are a lot of aspects that can be influenced by styling. For example, the display property controls whether an element is displayed as a block or an inline element.

This text is displayed <strong>inline</strong>,
<strong style="display: block">as a block</strong>, and
<strong style="display: none">not at all</strong>.

The block tag will end up on its own line since block elements are not displayed inline with the text around them. The last tag is not displayed at all—display: none prevents an element from showing up on the screen. This is a way to hide elements. It is often preferable to removing them from the document entirely because it makes it easy to reveal them again at a later time.

    This text is displayed inline,

    as a block

    , and .

JavaScript code can directly manipulate the style of an element through the node’s style property. This property holds an object that has properties for all possible style properties. The values of these properties are strings, which we can write to in order to change a particular aspect of the element’s style.

<p id="para" style="color: purple">
  Pretty text
</p>

<script>
  var para = document.getElementById("para");
  console.log(para.style.color);
  para.style.color = "magenta";
</script>

Some style property names contain dashes, such as font-family. Because such property names are awkward to work with in JavaScript (you’d have to say style["font-family"]), the property names in the style object for such properties have their dashes removed and the letters that follow them capitalized (style.fontFamily).
Mark as Completed and Continue
This lesson is from 13. The Document Object Model in Eloquent JavaScript, 2nd Edition - show this chapter in full.

Enjoy Safari? Subscribe Today

    Recommended Queue Recent Topics Tutorials Settings Blog Support Feedback Sign Out

© 2016 Safari. Terms of Service / Privacy Policy

