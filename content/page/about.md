---
title: Professional Self Assessment
subtitle: Completed for Project Two of CS-499
comments: false
---

**Professional Self-Assessment**

**Adrienne Sturgeon – CS-499 Capstone Portfolio**

As I complete the Computer Science program and present this ePortfolio,
I reflect on a journey marked by growth, resilience, and a deepening
commitment to secure, scalable, and user-centered software development.
This portfolio represents not only my technical capabilities but also my
ability to communicate, collaborate, and solve complex problems across
diverse computing environments. Through coursework, project
enhancements, and reflective practice, I’ve developed a strong
foundation in full-stack development, cloud-native workflows, and
defensive design which are skills that position me to contribute
meaningfully to the software industry.

**Collaboration and Communication**

Throughout the program, I’ve engaged in collaborative environments that
mirror real-world development teams. Whether through peer code reviews,
group assignments, or stakeholder-focused documentation, I’ve learned to
adapt my communication style to technical and nontechnical audiences. My
code review video was designed to walk peers and managers through
enhancement plans using clear, contextual explanations.

I also practiced in-code commenting and modular design to support future
maintainability. For example, in my Android app, I externalized
hardcoded UI strings to improve localization and readability:

```javascript
// Original hardcoded string
Toast.makeText(this, "Login successful", Toast.LENGTH_SHORT).show();

// Enhanced version using XML localization
Toast.makeText(this, getString(R.string.login_success), Toast.LENGTH_SHORT).show();
```

This change supports internationalization and aligns with Android best
practices, making the code more adaptable for diverse audiences.

**Algorithmic Thinking and Design Trade-offs**

In my second artifact, a data dashboard built with Python, Dash, and
MongoDB, I applied algorithmic principles to abstract and optimize
filtering logic. I replaced repetitive query code with a centralized
helper function:

```python
def get_filtered_query(filter_type):
    return {
        "$and": [
            {"$or": [{'breed': {"$regex": breed}} for breed in breed_map[filter_type]]},
            {'sex_upon_outcome': sex_map[filter_type]},
            {
                age_field: {
                    "$gt": age_ranges[filter_type][0],
                    "$lt": age_ranges[filter_type][1]
                }
            }
        ]
    }
```
This abstraction reduced redundancy, improved scalability, and made the code
easier to maintain. I also corrected variable naming inconsistencies
(e.g., age\_upon-outcome\_in\_weeks → age\_upon\_outcome\_in\_weeks) to
prevent silent query failures which is an important lesson in data
integrity and debugging.

**Innovative Techniques and Industry Value**

My enhancements reflect a commitment to using well-founded and
innovative techniques to deliver value. In the Event Track App, I
implemented asynchronous processing to avoid ANR errors:

```javascript
new Thread(() -> {
    boolean isValid = databaseHelper.checkUser(username, password);
    runOnUiThread(() -> {
        // UI updates safely executed
    });
}).start();
```
I also integrated Firebase Cloud Messaging (FCM) for scalable push
notifications:

```javascript
private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        NotificationChannel channel = new NotificationChannel(
            "event_notifications", "Event Alerts", NotificationManager.IMPORTANCE_HIGH);
        channel.setDescription("Notifications about scheduled events");
        notificationManager.createNotificationChannel(channel);
    }
}
```
These enhancements demonstrate my ability to work with modern APIs and build
responsive, scalable mobile applications.

**Security Mindset and Defensive Design**

Security has been a consistent focus throughout my work. In the
dashboard project, I used environment variables to protect credentials:

```python
"AAC_USERNAME": os.getenv("AAC_USERNAME", "aacuser")
```

I also added defensive checks to prevent runtime errors:

```python
if not os.path.isfile(IMAGE_FILENAME):
    raise FileNotFoundError(f"Logo image '{IMAGE_FILENAME}' not found.")
```
In my web authentication system, I resolved JWT timing issues by reading
tokens directly from cookies and applying them to outgoing requests:

```javascript
const token = this.cookieService.get('auth_token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.get(`${API_URL}/secure-data`, { headers });
```
I also configured CORS on the backend to support cross-origin communication:

```javascript
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
```

These examples reflect my ability to anticipate vulnerabilities, enforce
permission checks, and design systems that prioritize privacy and
resilience.

**Portfolio Cohesion and Artifact Integration**

The three artifacts in this portfolio were selected to showcase distinct
areas of expertise:

- **Artifact One: Event Track App (Android)**  
  Demonstrates software engineering and design through modular
  architecture, UI localization, and Firebase integration.

- **Artifact Two: Animal Shelter Dashboard (Python/Dash/MongoDB)**  
  Highlights algorithmic thinking and data structure fluency through
  abstraction, fault tolerance, and consistent data handling.

- **Artifact Three: Web Authentication System (Angular/Express.js)**  
  Represents database and security expertise through secure token
  workflows, CORS configuration, and user feedback enhancements.

Together, these artifacts form a cohesive narrative of my growth as a
developer. They illustrate my ability to work across full-stack
environments, integrate modern tools, and build systems that are secure,
maintainable, and user-friendly. This portfolio is not just a showcase
of technical skills. It is a reflection of my values as a
problem-solver, communicator, and lifelong learner in the field of
computer science.
