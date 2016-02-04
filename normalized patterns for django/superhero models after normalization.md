
**Django Models**

We can now take a look at how these normalized tables can be represented as Django models. Composite keys are not directly supported in Django. The solution used here is to apply the surrogate keys and specify the unique_together property in the Meta class:


    class Origin(models.Model):
        superhero = models.ForeignKey(settings.AUTH_USER_MODEL)
        origin = models.CharField(max_length=100)
    
    class Location(models.Model):
        latitude = models.FloatField()
        longitude = models.FloatField()
        country = models.CharField(max_length=100)
    
        class Meta:
            unique_together = ("latitude", "longitude")
    
    class Sighting(models.Model):
        superhero = models.ForeignKey(settings.AUTH_USER_MODEL)
        power = models.CharField(max_length=100)
        location = models.ForeignKey(Location)
        sighted_on = models.DateTimeField()
    
        class Meta:
            unique_together = ("superhero", "power")

**Performance and Denormalization**

Normalization can adversely affect performance. As the number of models increase, the number of joins needed to answer a query also increase. For instance, to find the number of superheroes with the Freeze capability in USA, you will need to join four tables. Prior to normalization, any information can be found by querying a single table.

You should design your models to keep the data normalized. This will maintain data integrity. However, if your site faces scalability issues, then you can selectively derive data from those models to create denormalized data.














