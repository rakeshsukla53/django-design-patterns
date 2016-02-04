
**Multiple Profile Types**

Assume that you need several kinds of user profiles in your application. There needs to be a field to track which type of profile the user has. The profile data itself needs to be stored in separate models or a unified model.

An aggregate profile approach is recommended since it gives the flexibility to change the profile types without loss of profile details and minimizes complexity. In this approach, the profile model contains a superset of all profile fields from all profile types.

For example, SuperBook will need a SuperHero type profile and an Ordinary (non-superhero) profile. It can be implemented using a single unified profile model as follows:

    class BaseProfile(models.Model):
        USER_TYPES = (
            (0, 'Ordinary'),
            (1, 'SuperHero'),
        )
        user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                    primary_key=True)
        user_type = models.IntegerField(max_length=1, null=True,
                                        choices=USER_TYPES)
        bio = models.CharField(max_length=200, blank=True, null=True)
    
        def __str__(self):
            return "{}: {:.20}". format(self.user, self.bio or "")
    
        class Meta:
            abstract = True

    class SuperHeroProfile(models.Model):
        origin = models.CharField(max_length=100, blank=True, null=True)
    
        class Meta:
            abstract = True

    class OrdinaryProfile(models.Model):
        address = models.CharField(max_length=200, blank=True, null=True)
    
        class Meta:
            abstract = True

    class Profile(SuperHeroProfile, OrdinaryProfile, BaseProfile):
        pass

We grouped the profile details into several abstract base classes to separate concerns. The BaseProfile class contains all the common profile details irrespective of the user type. It also has a user_type field that keeps track of the user's active profile.

The SuperHeroProfile class and OrdinaryProfile class contain the profile details specific to superhero and non-hero users respectively. Finally, the profile class derives from all these base classes to create a superset of profile details.

Some details to take care of while using this approach are as follows:

        All profile fields that belong to the class or its abstract bases classes must be nullable or with defaults.
        This approach might consume more database space per user but gives immense flexibility.
        The active and inactive fields for a profile type need to be managed outside the model. Say, a form to edit the profile must show the appropriate fields based on the currently active user type.