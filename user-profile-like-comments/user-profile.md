
Let's forget models for a moment and talk in terms of the objects we are modeling. Each user has a profile. A user can make several comments or several posts. A Like can be related to a single user/post combination.

Drawing a class diagram of your models like this is recommended. Some attributes might be missing at this stage but you can detail them later. Once the entire project is represented in the diagram, it makes separating the apps easier.

Here are some tips to create this representation:

    Boxes represent entities, which become models.
    Nouns in your write-up typically end up as entities.
    Arrows are bi-directional and represent one of the three types of relationships in Django: one-to-one, one-to-many (implemented with Foreign Keys), and many-to-many.
    The field denoting the one-to-many relationship is defined in the model on the Entity-relationship model (ER-model). In other words, the star is where the Foreign Key gets declared.
    
**CODE DJANGO** 
    
    class Profile(models.Model):
        user = models.OneToOneField(User)

    class Post(models.Model):
        posted_by = models.ForeignKey(User)
    
    class Comment(models.Model):
        commented_by = models.ForeignKey(User)
        for_post = models.ForeignKey(Post)
    
    class Like(models.Model):
        liked_by = models.ForeignKey(User)
        post = models.ForeignKey(Post)

**Splitting models.py into multiple files**

All definitions that can be exposed at package level must be defined in __init__.py with global scope. For example, if we split models.py into individual classes, in corresponding files inside models subdirectory such as postable.py, post.py, and comment.py, then the __init__.py package will look like:

    from postable import Postable
    from post import Post
    from comment import Comment

