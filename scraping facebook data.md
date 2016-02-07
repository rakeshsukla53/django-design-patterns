    from selenium import webdriver
    
    def facebook(username, password, url):
        driver = webdriver.Firefox()
        driver.get('https://www.facebook.com')
        driver.find_element_by_id('email').send_keys(username)
        driver.find_element_by_id('pass').send_keys(password)
        driver.find_element_by_id('login_form').submit()
        driver.implicitly_wait(30)
        # wait until the search box is available,
        # which means have successfully logged in
        search = driver.find_element_by_id('q')
        # now logged in so can go to the page of interest
        driver.get(url)
        # add code to scrape data of interest here ...
    
 

    >>> import json, pprint
    >>> html = D('http://graph.facebook.com/PacktPub')
    >>> pprint.pprint(json.loads(html))
    {u'about': u'Packt Publishing provides books, eBooks, video tutorials, and articles for IT developers, administrators, and users.',
     u'category': u'Product/service',
     u'founded': u'2004',
     u'id': u'204603129458',
     u'likes': 4817,
     u'link': u'https://www.facebook.com/PacktPub',
     u'mission': u'We help the world put software to work in new ways, through the delivery of effective learning and information services to IT professionals.',
     u'name': u'Packt Publishing',
     u'talking_about_count': 55,
     u'username': u'PacktPub',
     u'website': u'http://www.PacktPub.com'}

