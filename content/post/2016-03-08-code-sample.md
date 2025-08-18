---
title: Travlr Full Stack App
subtitle: Using MEAN Stack
date: 2025-08-12
tags: ["example", "code"]
bigimg: [{src: "/img/triangle.jpg", desc: "Triangle"}, {src: "/img/sphere.jpg", desc: "Sphere"}, {src: "/img/hexagon.jpg", desc: "Hexagon"}]
---
I have provided a link to download the Event Track App Original and Improved Versions Here:


**Artifact Three Narrative**

**Artifact Overview**  
This artifact is a web authentication system that uses Angular for the
frontend and Express.js for the backend. It supports secure logins by
storing JSON Web Tokens (JWT) in cookies, allowing authenticated access
without revealing sensitive credentials. The system started with a focus
on creating smooth and secure login experiences. Through successive
improvements, it became more efficient in managing token timing, error
reporting, and frontend-backend interactions. I was also able to
successfully implement an authorization strategy in addition to the
existing authentication system.

**Reason for Including the Artifact**  
I added this system to my portfolio because it offers a real-world
example of strengthening authentication and authorization workflows.
Secure login functionality is a key part of modern web development, and
this artifact showcases practical experience across different layers of
the stack. It highlights my ability to resolve authentication failures,
refine API communication, and improve user feedback, while applying
concepts that span backend logic, client behavior, and browser-based
security.

**Key Improvements**  
After implementing the authorization strategy I had some issues with
improving secure token storage. Originally, JWT headers were missing
from requests due to timing issues in Angular’s HTTP interceptor. I
addressed this by reading the token directly from cookies and applying
it immediately to each outgoing request:

```javascript
const cookieString = document.cookie;
const cookies = cookieString.split("; ").reduce((acc, cookie) => {
  const [name, value] = cookie.split("=");
  acc[name] = decodeURIComponent(value);
  return acc;
}, {} as Record<string, string>);

const token = cookies["jwt"];
if (token) {
  const authReq = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next.handle(authReq);
}
```

Another important fix involved correcting the frontend’s request port.
Angular was initially targeting port 4200 for authentication, while the
backend ran on port 3000. This mismatch resulted in 404 errors. I
resolved it by explicitly setting the correct API endpoint:

```javascript
this.http.post("http://localhost:3000/api/login", { email: user.email, password: passwd }, { withCredentials: true });
```

To support cross-origin communication, I also modified the backend’s
CORS configuration:

```javascript
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
```

Lastly, I improved how login errors are communicated. Initially, failed
logins were only shown in the browser console. I updated the UI to
display messages directly to users:

```javascript
public formError: string = '';

onLoginSubmit(): void {
  this.authenticationService.login(this.credentials.email, this.credentials.password)
    .subscribe({
      next: (response: any) => {
        alert("Welcome back! You are now logged in.");
        this.authenticationService.saveToken(response.token);
        this.router.navigate(['/trips']);
      },
      error: (error: any) => {
        this.ngZone.run(() => {
          this.formError = "Invalid email or password. Please try again.";
        });
      }
    });
}
```

**Alignment with Course Outcomes**  
The improvements applied to this project reflect the ability to build
and evaluate reliable systems that follow sound software engineering
practices. The debugging work and token handling demonstrate clear
understanding of both technical and security concerns. The project also
encouraged strong written communication through documentation and
problem analysis.

By working across components, I developed a holistic approach to problem
solving. From backend API design to client-side UX fixes, the steps
taken were interconnected and reflect an ability to coordinate across
moving parts of a system.

**Reflection on the Enhancement Process**  
This authentication project taught me the importance of precision in
both timing and feedback. One major insight involved the way
asynchronous operations affect request construction. Fixing that timing
gap changed how authentication headers were managed and greatly improved
reliability. I also learned how easy it is for simple mistakes like port
mismatches to cause cascading failures. Resolving these issues required
careful inspection and good debugging habits. It reminded me to think
critically about systems as a whole, rather than treating frontend and
backend as isolated parts. Improving error feedback was another
milestone. The original login form offered no visible cues when
authentication failed. By enabling direct feedback in the UI, I closed
the gap between technical failure and user experience. Together, these
refinements illustrate a thoughtful approach to system enhancement. I
gained practical experience in handling security protocols, diagnosing
client-server issues, and improving user interaction design. The lessons
learned here will carry over into future development work, especially
when building secure and scalable web applications.

