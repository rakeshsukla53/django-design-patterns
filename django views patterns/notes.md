Type
	

Class Name
	

Description

Base
	

View
	

This is the parent of all views. It performs dispatch and sanity checks.

Base
	

TemplateView
	

This renders a template. It exposes the URLConf keywords into context.

Base
	

RedirectView
	

This redirects on any GET request.

List
	

ListView
	

This renders any iterable of items, such as a queryset.

Detail
	

DetailView
	

This renders an item based on pk or slug from URLConf.

Edit
	

FormView
	

This renders and processes a form.

Edit
	

CreateView
	

This renders and processes a form for creating new objects.

Edit
	

UpdateView
	

This renders and processes a form for updating an object.

Edit
	

DeleteView
	

This renders and processes a form for deleting an object.

Date
	

ArchiveIndexView
	

This renders a list of objects with a date field, the latest being the first.

Date
	

YearArchiveView
	

This renders a list of objects on year given by URLConf.

Date
	

MonthArchiveView
	

This renders a list of objects on a year and month.

Date
	

WeekArchiveView
	

This renders a list of objects on a year and week number.

Date
	

DayArchiveView
	

This renders a list of objects on a year, month, and day.

Date
	

TodayArchiveView
	

This renders a list of objects on today's date.

Date
	

DateDetailView
	

This renders an object on a year, month, and day identified by its pk or slug.

We have not mentioned b