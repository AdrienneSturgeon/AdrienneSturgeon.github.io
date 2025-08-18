---
title: Event Track App
subtitle: Using Multiple Images
date: 2017-03-07
tags: ["example", "bigimg"]
bigimg: [{src: "/img/triangle.jpg", desc: "Triangle"}, {src: "/img/sphere.jpg", desc: "Sphere"}, {src: "/img/hexagon.jpg", desc: "Hexagon"}]
---
I have provided a link to download the Event Track App Original and Improved Versions Here:


**Event Track App: Artifact Enhancement Narrative**

**What is the artifact? When was it created?**

The Event Track App is a mobile Android application originally built as
part of my software development coursework in CS-360. It is designed to
help users log, view, and receive notifications about scheduled events.
The app was created in early Februrary 2025 and refined throughout this
month as part of a comprehensive enhancement process. It consists of
multiple interconnected classes (MainActivity, EventDisplayActivity,
RegisterActivity, SMSNotificationsActivity, and DatabaseHelper)
supporting user authentication, event CRUD operations, and notification
workflows.

**Why include this artifact in my ePortfolio?**

This artifact was chosen for inclusion because it clearly demonstrates
my proficiency across multiple core areas of software engineering:
full-stack logic, modular design, user experience improvements, database
handling, and system optimization.

Improvements incorporated include:

- Migrating hardcoded UI strings such as:

```javascript
Toast.makeText(this, "Login successful", Toast.LENGTH_SHORT).show();
```

to localized XML:

```xml
<string name="login_success">Login successful</string>
```

and accessed via:

```javascript
getString(R.string.login_success);
```

- Refactoring thread-sensitive code in MainActivity to avoid Application
  Not Responding (ANR) errors:

```javascript
new Thread(() -> {
    boolean isValid = databaseHelper.checkUser(username, password);
    runOnUiThread(() -> {
        // UI updates safely executed
    });
}).start();

```

- Implementing defensive design strategies including:

  - Null safety checks for UI components

  - Permission gating for SMS and notifications

  - Intent validation in SMSNotificationsActivity to avoid crashes

These updates showcase a security-conscious mindset and alignment with
Android best practices.

I also integrated Firebase Cloud Messaging (FCM) for push notifications,
with dynamic channel creation:

```javascript
private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        NotificationChannel channel = new NotificationChannel(
            "event_notifications",
            "Event Alerts",
            NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Notifications about scheduled events");
        notificationManager.createNotificationChannel(channel);
    }
}
```

Combined with FCM token handling and permission-aware dispatching:

```javascript
if (ContextCompat.checkSelfPermission(this,
    Manifest.permission.POST_NOTIFICATIONS) ==
    PackageManager.PERMISSION_GRANTED) {

    NotificationManagerCompat.from(this).notify(1001, builder.build());
}
```

These changes elevated the app into a scalable, modern, and compliant
solution.

**Did I meet the Module One outcome goals?**

Yes, my original goal in Module One was to improve the artifact’s
robustness and user-centered notification system while expanding its
technical depth. By the end of the enhancement process, I incorporated
asynchronous processing, permissions management, reusable architecture,
and scalable messaging. I met all intended learning outcomes and
extended my coverage of security design principles and mobile
optimization.

**What did I learn through enhancing the artifact?**

This experience solidified my understanding of practical asynchronous
design and defensive coding in Android development. I deepened my
fluency with permission models and user interaction flows. I also gained
hands-on experience with Firebase integration, which reinforced my
knowledge of backend-token management and cross-platform notification
architecture.

One specific learning moment was resolving a crash due to premature
usage of getString() in a field initializer:

```javascript
// Crashing code
private final String PHONE_NUMBER = getString(R.string.default_event_phone); // invalid here

// Fixed approach
private String PHONE_NUMBER;

PHONE_NUMBER = getString(R.string.default_event_phone); // set in onCreate
```

This taught me the importance of lifecycle-aware design and context-safe
resource access.

The most challenging part was debugging silent notification failures due
to missing channel registration. By explicitly invoking
createNotificationChannel() before dispatching notifications, I ensured
delivery success on Android 8+.

**How does this artifact reflect the Computer Science program
outcomes?**

- **Collaborative Environment Design:** Through modularization and
  refactoring, I improved code readability and future team
  collaboration.

- **Professional Communication:** The enhanced structure, string
  externalization, and clean logging deliver a maintainable and
  well-documented solution.

- **Algorithmic Evaluation:** I refactored event validation, user
  lookup, and notification dispatch to balance performance and
  responsiveness.

- **Innovative Software Design:** Firebase integration and
  permission-aware dispatching show my ability to adapt tools to solve
  real user needs.

- **Security Mindset:** I mitigated crash risks, validated input,
  enforced permission checks, and ensured defensive handling of system
  resources.

In summary, the Event Track App exemplifies my ability to synthesize
technical rigor, usability enhancements, and platform-native compliance
into a real-world software solution. It stands as a well-rounded
representation of my growth as a developer and problem-solver.
