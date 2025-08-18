---
title: Salvadore Dash App
subtitle: Using KaTeX
date: 2035-08-05
tags: ["example", "math"]
bigimg: [{src: "/img/triangle.jpg", desc: "Triangle"}, {src: "/img/sphere.jpg", desc: "Sphere"}, {src: "/img/hexagon.jpg", desc: "Hexagon"}]
---
I have provided a link to download the Event Track App Original and Improved Versions Here:

**Artifact Two Narrative**

**Briefly describe the artifact. What is it? When was it created?**

The artifact is a Jupyter Notebook project titled
ProjectTwoDashboard.ipynb, created to support an interactive dashboard
for visualizing animal shelter data in my CS-340 course. It was built
using Python, Dash, and MongoDB and first developed during Module One of
the course. The dashboard allows users to view and filter dog profiles
by breed, rescue suitability, and location. It integrates components
like charts, a dynamic data table, and a geolocation map for individual
animal entries.

**Justify the inclusion of the artifact in your ePortfolio. Why did you select this item? What specific components of the artifact showcase your skills and abilities in algorithms and data structure? How was the artifact improved?**

I chose this dashboard because it demonstrates how I apply algorithmic
logic and data structuring principles in a practical setting. One of the
biggest improvements involved replacing the repetitive rescue-filter
logic with a centralized helper function called

```python
def get_filtered_query(filter_type):
    return {
        "$and": [
            {
                "$or": [
                    {"breed": {"$regex": breed}}
                    for breed in breed_map[filter_type]
                ]
            },
            {"sex_upon_outcome": sex_map[filter_type]},
            {
                "$and": [
                    {age_field: {"$gt": age_ranges[filter_type][0]}},
                    {age_field: {"$lt": age_ranges[filter_type][1]}}
                ]
            }
        ]
    }

```

This approach reduced redundancy and made the filter logic scalable and
easier to maintain. I also standardized column naming by replacing
inconsistent references like age\_upon-outcome\_in\_weeks with
age\_upon\_outcome\_in\_weeks throughout the code to avoid query
mismatches and provide consistent filtering.

Another key enhancement involved introducing defensive programming
techniques. For example, before reading the logo image, I added a check
to make sure the file exists:

```python
if not os.path.isfile(IMAGE_FILENAME):
    raise FileNotFoundError(f"Logo image '{IMAGE_FILENAME}' not found.")
```

In the update\_map() callback, I introduced index bounds checks to avoid
runtime errors when a user-selected row did not return valid
coordinates:

```python
if row >= len(df_map) or df_map.iloc[row].isnull().any():
    return []
```

These changes reflect a deeper understanding of how to write resilient,
fault-tolerant code, which is vital in real-world application
development.

**Did you meet the course outcomes you planned to meet with this enhancement in Module One? Do you have any updates to your outcome-coverage plans?**

Yes, I met the outcomes I targeted in Module One, particularly outcomes
three and four, which emphasize designing secure and maintainable
software solutions. By modularizing my code and securing credential
management using environment variables like this:

```python
"AAC\_USERNAME": os.getenv("AAC\_USERNAME", "aacuser")
```
I reinforced principles of secure software engineering and improved
maintainability. At this point, I don’t plan to change my coverage plan,
though I might explore additional enhancements related to data
validation or user permissions in future iterations.

**Reflect on the process of enhancing and modifying the artifact. What did you learn as you were creating it and improving it? What challenges did you face?**

The enhancement process taught me the value of abstraction and defensive
coding. Writing a helper function to handle filtering logic forced me to
think systematically about how different parts of the code repeated
similar patterns. Once I identified the overlap, I realized I could
parameterize the logic using dictionaries like breed\_map and
age\_ranges to control behavior across all categories.

One challenge was diagnosing inconsistent filter results. I eventually
discovered that variable naming errors like using
age\_upon-outcome\_in\_weeks instead of age\_upon\_outcome\_in\_weeks
were causing MongoDB queries to fail silently. That taught me how
crucial it is to maintain clarity and consistency in data structures
when integrating front-end interactivity with backend storage.

Another challenge involved managing dynamic indexing within the map
callback. Without bounds checking, the application would crash if a user
selected an incomplete row. Solving that required me to better
understand how Dash’s derived\_virtual\_data interacts with user
selections and how to build logic around edge-case handling.

These experiences strengthened my ability to anticipate user behaviors,
write reusable logic, and build applications that communicate clearly
with both the user and the underlying data systems.
