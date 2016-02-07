# if you want to create index of a particular field then you can do 

max = models.CharField(max_length=30, db_index=True)
This is not really django specific; more to do with databases. You add indexes on columns when you want to speed up searches on that column.

Typically, only the primary key is indexed by the database. This means look ups using the primary key are optimized.

If you do a lot of lookups on a secondary column, consider adding an index to that column to speed things up.

Keep in mind, like most problems of scale, these only apply if you have a statistically large number of rows (10,000 is not large).

Additionally, every time you do an insert, indexes need to be updated. So be careful on which column you add indexes.

As always, you can only optimize what you can measure - so use the EXPLAIN statement and your database logs (especially any slow query logs) to find out where indexes can be useful.

# django debug toolbar https://github.com/django-debug-toolbar/django-debug-toolbar#django-debug-toolbar

