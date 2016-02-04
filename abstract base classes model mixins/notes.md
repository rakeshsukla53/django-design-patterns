**Pattern – model mixins**

`Problem`: Distinct models have the same fields and/or methods duplicated violating the DRY principle.

`Solution`: Extract common fields and methods into various reusable model mixins.
Problem details

While designing models, you might find certain common attributes or behaviors shared across model classes. For example, a Post and Comment model needs to keep track of its created date and modified date. Manually copy-pasting the fields and their associated method is not a very DRY approach.

Since Django models are classes, object-oriented approaches such as composition and inheritance are possible solutions. However, compositions (by having a property that contains an instance of the shared class) will need an additional level of indirection to access fields.

Inheritance can get tricky. We can use a common base class for Post and Comments. However, there are three kinds of inheritance in Django: concrete, abstract, and proxy.

Concrete inheritance works by deriving from the base class just like you normally would in Python classes. However, in Django, this base class will be mapped into a separate table. Each time you access base fields, an implicit join is needed. This leads to horrible performance.

Proxy inheritance can only add new behavior to the parent class. You cannot add new fields. Hence, it is not very useful for this situation.

Finally, we are left with abstract inheritance.
Solution details

Abstract base classes are elegant solutions used to share data and behavior among models. When you define an abstract class, it does not create any corresponding table in the database. Instead, these fields are created in the derived non-abstract classes.

Accessing abstract base class fields doesn't need a JOIN statement. The resulting tables are also self-contained with managed fields. Due to these advantages, most Django projects use abstract base classes to implement common fields or methods.

Limitations of abstract models are as follows:

    They cannot have a Foreign Key or many-to-many field from another model
    They cannot be instantiated or saved
    They cannot be directly used in a query since it doesn't have a manager

Here is how the post and comment classes can be initially designed with an abstract base class:

    class Postable(models.Model):
        created = models.DateTimeField(auto_now_add=True)
        modified = models.DateTimeField(auto_now=True)
        message = models.TextField(max_length=500)
    
        class Meta:
            abstract = True


    class Post(Postable):
        ...
    
    
    class Comment(Postable):
    ...

To turn a model into an abstract base class, you will need to mention abstract = True in its inner Meta class. Here, Postable is an abstract base class. However, it is not very reusable.

In fact, if there was a class that had just the created and modified field, then we can reuse that timestamp functionality in nearly any model needing a timestamp. In such cases, we usually define a model mixin.

**Model mixins**

Model mixins are abstract classes that can be added as a parent class of a model. Python supports multiple inheritances, unlike other languages such as Java. Hence, you can list any number of parent classes for a model.

Mixins ought to be orthogonal and easily composable. Drop in a mixin to the list of base classes and they should work. In this regard, they are more similar in behavior to composition rather than inheritance.

Smaller mixins are better. Whenever a mixin becomes large and violates the Single Responsibility Principle, consider refactoring it into smaller classes. Let a mixin do one thing and do it well.

In our previous example, the model mixin used to update the created and modified time can be easily factored out, as shown in the following code:

    class TimeStampedModel(models.Model):
        created = models.DateTimeField(auto_now_add=True)
        modified = models.DateTimeField(auto_now =True)
    
        class Meta:
            abstract = True
    
    class Postable(TimeStampedModel):
        message = models.TextField(max_length=500)
        ... 
    
        class Meta:
            abstract = True
    
    class Post(Postable):
        ...
    
    class Comment(Postable):
        ...

We have two base classes now. However, the functionality is clearly separated. The mixin can be separated into its own module and reused in other contexts.
