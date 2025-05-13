// Dark Torch - script.js

// --- State ---
let currentUser = null; 
// For testing logged-in state (uncomment to test):
// currentUser = { username: 'Jannik Testuser', email: 'user@darktorch.com' };

// --- DOM Elements ---
// These will be selected after DOM is loaded
let appContent;
let navLinksContainer; 

// --- Page Content (dynamically generated for account-settings) ---
function getPageContents() {
    // This function generates the HTML content for each "page" of the SPA.
    // It's called each time a page is rendered to ensure dynamic content (like currentUser info) is up-to-date.
    return {
        home: `
            <div class="home-container">
                <section class="home-hero">
                    <div class="container">
                        <h1>Illuminate Your <span class="highlight">Workflow</span> with DarkTorch</h1>
                        <p class="subtitle">The ultimate tool to streamline your projects, enhance collaboration, and bring clarity to complexity. Discover a new era of productivity.</p>
                        <a href="#signup" data-page="signup" class="cta-button">Get Started Free</a>
                    </div>
                </section>
                <section class="features-section">
                    <div class="container">
                        <h2>Why DarkTorch Shines</h2>
                        <div class="features-grid">
                            <div class="feature-card"> <svg><use xlink:href="#icon-lightbulb"></use></svg> <h3>Intuitive Design</h3> <p>Navigate complex tasks with an interface that's both powerful and easy to master. Reduce clutter and focus on what matters.</p> </div>
                            <div class="feature-card"> <svg><use xlink:href="#icon-zap"></use></svg> <h3>Blazing Fast Performance</h3> <p>Engineered for speed, DarkTorch ensures your workflow is never held back. Experience seamless transitions and instant updates.</p> </div>
                            <div class="feature-card"> <svg><use xlink:href="#icon-shield-check"></use></svg> <h3>Secure & Reliable</h3> <p>Your data's security is our top priority. With robust measures, work with peace of mind knowing your information is protected.</p> </div>
                        </div>
                    </div>
                </section>
                <section class="testimonial-section">
                    <div class="container">
                        <h2>What Our Users Say</h2>
                        <div class="testimonial-card"> <blockquote>"DarkTorch revolutionized how our team manages projects. The clarity it brings is unparalleled!"</blockquote> <cite>&ndash; Alex P., Project Manager</cite> </div>
                        <div class="testimonial-card"> <blockquote>"I was up and running in minutes. The intuitive design makes even the most complex features accessible. Highly recommended!"</blockquote> <cite>&ndash; Sarah K., Freelance Developer</cite> </div>
                    </div>
                </section>
            </div>`,
        login: `
            <div class="auth-container">
                <h2 class="form-title">Login to Dark<span class="highlight">Torch</span></h2>
                <p class="form-subtitle">Welcome back! Access your dashboard.</p>
                <div id="message-box-login" class="message-box"></div>
                <form id="login-form">
                    <div class="form-group"> <label for="login-email">Email Address</label> <input type="email" id="login-email" name="email" required autocomplete="email"> </div>
                    <div class="form-group"> <label for="login-password">Password</label> <input type="password" id="login-password" name="password" required autocomplete="current-password"> </div>
                    <button type="submit" class="btn-submit"><span class="btn-text">Login</span><span class="btn-loader" style="display:none;">Loading...</span></button>
                </form>
                <div class="auth-links"> <a href="#forgot-password" data-page="forgot-password">Forgot Password?</a> <a href="#signup" data-page="signup">Create Account</a> </div>
            </div>`,
        pricing: `
            <section class="page-section">
                <h1>Flexible Plans for Every Team</h1>
                <p>Choose the DarkTorch plan that best fits your needs. Start free, and scale as you grow. All prices in USD.</p>
                <div class="pricing-grid">
                    <div class="pricing-card"> <h3>Spark</h3> <p class="price">Free<span>/forever</span></p> <ul> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Up to 3 Projects</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Basic Collaboration Tools</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Community Support</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>1GB Storage</li> </ul> <button class="btn-submit nav-button-secondary" data-page="signup">Get Started</button> </div>
                    <div class="pricing-card featured"> <h3>Beacon <span style="font-size:0.8rem; color:var(--accent-torch);">(Popular)</span></h3> <p class="price">$12<span>/user/month</span></p> <ul> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Unlimited Projects</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Advanced Collaboration Suite</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Priority Email Support</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>25GB Storage per User</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Workflow Automations</li> </ul> <button class="btn-submit" data-page="signup">Choose Beacon</button> </div>
                    <div class="pricing-card"> <h3>Lighthouse</h3> <p class="price">Custom<span>/enterprise</span></p> <ul> <li><svg><use xlink:href="#icon-check-circle"></use></svg>All Beacon Features, plus:</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Dedicated Account Manager</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Custom Integrations & API Access</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Enterprise-grade Security & SSO</li> <li><svg><use xlink:href="#icon-check-circle"></use></svg>Tailored Onboarding & Training</li> </ul> <button class="btn-submit nav-button-secondary" onclick="alert('Please contact our sales team for Enterprise solutions.')">Contact Sales</button> </div>
                </div>
            </section>`,
        forum: `
            <section class="page-section">
                <h1>DarkTorch Community Forum</h1>
                <p>Connect with other DarkTorch users, share tips, ask questions, and contribute to the evolution of the platform. Our team actively monitors the forums to provide support and gather feedback.</p>
                <form id="forum-search-form" style="margin-bottom: 2rem; display:flex; gap:10px;"> <input type="search" id="forum-search-input" placeholder="Search topics..." style="flex-grow:1; padding: 0.8rem; border: 1px solid var(--border-color); background-color: var(--bg-dark); color: var(--text-light); border-radius: 8px; font-size: 1rem;"> <button type="submit" class="btn-submit" style="width:auto; padding: 0.8rem 1.5rem;"><span class="btn-text">Search</span><span class="btn-loader" style="display:none;">...</span></button> </form>
                <h2>Popular Topics</h2>
                <ul class="forum-topic-list">
                    <li><a href="#" onclick="event.preventDefault(); alert('Navigating to topic: Getting Started...')">Getting Started Guide for New Users</a><p>Posted by Admin, 3 days ago - 15 replies</p></li>
                    <li><a href="#" onclick="event.preventDefault(); alert('Navigating to topic: Feature Request...')">Feature Request: Advanced Reporting Dashboard</a><p>Posted by UserX, 1 day ago - 8 replies</p></li>
                    <li><a href="#" onclick="event.preventDefault(); alert('Navigating to topic: Troubleshooting...')">Troubleshooting: Sync Issues with Mobile App</a><p>Posted by UserY, 5 hours ago - 2 replies</p></li>
                </ul> <button class="btn-submit nav-button-secondary" style="margin-top:1.5rem;" onclick="alert('Creating new topic functionality is coming soon!')">Create New Topic</button>
            </section>`,
        signup: `
            <div class="auth-container">
                <h2 class="form-title">Join Dark<span class="highlight">Torch</span></h2>
                <p class="form-subtitle">Create your account and start illuminating your projects.</p>
                <div id="message-box-signup" class="message-box"></div>
                <form id="signup-form">
                    <div class="form-group"> <label for="signup-username">Full Name</label> <input type="text" id="signup-username" name="username" required autocomplete="name"> </div>
                    <div class="form-group"> <label for="signup-email">Email Address</label> <input type="email" id="signup-email" name="email" required autocomplete="email"> </div>
                    <div class="form-group"> <label for="signup-password">Password (min. 8 characters)</label> <input type="password" id="signup-password" name="password" required minlength="8" autocomplete="new-password"> </div>
                    <div class="form-group"> <label for="signup-confirm-password">Confirm Password</label> <input type="password" id="signup-confirm-password" name="confirmPassword" required minlength="8" autocomplete="new-password"> </div>
                    <button type="submit" class="btn-submit"><span class="btn-text">Create Account</span><span class="btn-loader" style="display:none;">Creating...</span></button>
                </form>
                <div class="auth-links"> <a href="#login" data-page="login">Already have an account? Login</a> </div>
            </div>`,
        'forgot-password': `
            <div class="auth-container">
                <h2 class="form-title">Reset Password</h2>
                <p class="form-subtitle">Enter your email to receive a password reset link.</p>
                <div id="message-box-forgot" class="message-box"></div>
                <form id="forgot-password-form">
                    <div class="form-group"> <label for="forgot-email">Email Address</label> <input type="email" id="forgot-email" name="email" required autocomplete="email"> </div>
                    <button type="submit" class="btn-submit"><span class="btn-text">Send Reset Link</span><span class="btn-loader" style="display:none;">Sending...</span></button>
                </form>
                <div class="auth-links"> <a href="#login" data-page="login">Back to Login</a> </div>
            </div>`,
        'account-settings': `
            <section class="page-section">
                <h1>Account Settings</h1>
                <p>Manage your DarkTorch profile and preferences. ${currentUser ? '(Logged in as ' + currentUser.email + ')' : '(Not Logged In)'}</p>
                <div id="message-box-settings" class="message-box"></div>
                <form id="settings-form">
                    <div class="form-group"> <label for="settings-name">Full Name</label> <input type="text" id="settings-name" name="name" value="${currentUser ? currentUser.username : ''}" required> </div>
                    <div class="form-group"> <label for="settings-email">Email Address</label> <input type="email" id="settings-email" name="email" value="${currentUser ? currentUser.email : ''}" required> </div>
                    <div class="form-group"> <label for="settings-current-password">Current Password (for changes)</label> <input type="password" id="settings-current-password" name="currentPassword" autocomplete="current-password"> </div>
                    <div class="form-group"> <label for="settings-new-password">New Password (leave blank if no change)</label> <input type="password" id="settings-new-password" name="newPassword" autocomplete="new-password"> </div>
                    <button type="submit" class="btn-submit"><span class="btn-text">Save Changes</span><span class="btn-loader" style="display:none;">Saving...</span></button>
                </form>
            </section>`,
        'app-loading': ` <section class="page-section" style="text-align:center;"> <h1>Loading DarkTorch App...</h1> <p>Hold tight! We're preparing your workspace.</p> <div style="margin-top: 30px;"> <svg width="60" height="60" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="var(--accent-torch)"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2.5"> <circle stroke-opacity=".4" cx="24" cy="24" r="22"/> <path d="M46 24c0-12.15-9.85-22-22-22"> <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="0.8s" repeatCount="indefinite"/> </path> </g> </g> </svg> </div> </section>`
    };
}

// --- Routing and Rendering ---
function navigateTo(pageName) {
    // Updates the URL hash, which triggers the 'hashchange' event listener.
    window.location.hash = pageName;
}

function renderPage(pageName) {
    // Determines the target page, defaulting to 'home'.
    const targetPage = pageName || 'home';
    const allContents = getPageContents(); // Get fresh HTML content for pages.

    // Security check: If trying to access account settings while not logged in, redirect to login.
    if (!currentUser && targetPage === 'account-settings') {
        navigateTo('login'); 
        displayMessage('login', 'Please login to access account settings.');
        return;
    }

    // Inject the HTML content of the target page into the #app-content element.
    appContent.innerHTML = allContents[targetPage] || allContents.home; // Fallback to home if page not found.
    
    // Update the active state of navigation links.
    updateNavActiveState(targetPage);
    
    // Attach event listeners to forms on the newly rendered page.
    attachFormListeners(targetPage);
    
    // Scroll to the top of the page after rendering new content.
    window.scrollTo(0,0); 
}

function updateNavActiveState(currentPage) {
    // Updates the visual state of navigation links to highlight the active page.
    document.querySelectorAll('#nav-links a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === currentPage);
    });
    // Special handling for the account menu toggle's active state.
    const accountToggle = document.querySelector('.account-menu-toggle');
    if (accountToggle) {
         accountToggle.classList.toggle('active', currentPage === 'account-settings');
    }
}

// --- Navigation Update based on Login State ---
function updateNav() {
    // Dynamically updates the navigation bar based on whether a user is logged in.
    let navHTML = `
        <li><a href="#home" data-page="home">Home</a></li>
        <li><a href="#pricing" data-page="pricing">Pricing</a></li>
        <li><a href="#forum" data-page="forum">Forum</a></li>
    `;
    navLinksContainer.classList.add('right-nav');

    if (currentUser) {
        // If logged in, show account menu with settings and logout.
        navHTML += `
            <li class="account-menu">
                <a href="#" class="account-menu-toggle" aria-expanded="false" aria-controls="account-dropdown">
                    <svg><use xlink:href="#icon-user"></use></svg>
                    <span>${currentUser.username.split(' ')[0]}</span> </a>
                <div class="dropdown-content" id="account-dropdown">
                    <div class="dropdown-username">${currentUser.username}</div>
                    <a href="#account-settings" data-page="account-settings">
                        <svg><use xlink:href="#icon-cog"></use></svg>Settings
                    </a>
                    <a href="#" id="logout-link" data-page="logout"> 
                        <svg><use xlink:href="#icon-logout"></use></svg>Logout
                    </a>
                </div>
            </li>
        `;
    } else {
        // If logged out, show Login and Sign Up buttons.
        navHTML += `
            <li><a href="#login" data-page="login" class="nav-button-secondary">Login</a></li>
            <li><a href="#signup" data-page="signup" class="nav-button">Sign Up</a></li>
        `;
    }
    navLinksContainer.innerHTML = navHTML; // Update the navigation UL
    
    const currentPage = window.location.hash.substring(1) || 'home';
    updateNavActiveState(currentPage); // Re-apply active state to new nav items.

    // Add event listeners for newly created navigation elements (account menu, logout).
    if (currentUser) {
        const accountToggle = navLinksContainer.querySelector('.account-menu-toggle');
        const dropdown = navLinksContainer.querySelector('.dropdown-content');
        if (accountToggle && dropdown) {
            accountToggle.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default link behavior.
                // Toggle the 'show' class to display/hide the dropdown.
                const isExpanded = dropdown.classList.toggle('show');
                this.setAttribute('aria-expanded', isExpanded); // Update ARIA attribute for accessibility.
            });
        }
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) logoutLink.addEventListener('click', handleLogout);
    }
}

// --- Form Handling & Button States ---
function setButtonLoading(button, isLoading) {
    // Toggles a loading state on a submit button (shows/hides text and loader).
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    if (btnText && btnLoader) {
        btnText.style.display = isLoading ? 'none' : 'inline';
        btnLoader.style.display = isLoading ? 'inline' : 'none';
    }
    button.disabled = isLoading; // Disable button during loading.
}

function attachFormListeners(pageName) {
    // Attaches submit event listeners to forms based on the current page.
    // This needs to be called after new page content is rendered.
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', (e) => handleLoginFormSubmit(e, loginForm.querySelector('button[type="submit"]')));

    const signupForm = document.getElementById('signup-form');
    if (signupForm) signupForm.addEventListener('submit', (e) => handleSignup(e, signupForm.querySelector('button[type="submit"]')));

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) forgotPasswordForm.addEventListener('submit', (e) => handleForgotPassword(e, forgotPasswordForm.querySelector('button[type="submit"]')));

    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) settingsForm.addEventListener('submit', (e) => handleSettingsUpdate(e, settingsForm.querySelector('button[type="submit"]')));

    const forumSearchForm = document.getElementById('forum-search-form');
    if(forumSearchForm) forumSearchForm.addEventListener('submit', (e) => handleForumSearch(e, forumSearchForm.querySelector('button[type="submit"]')));
}

function handleLoginFormSubmit(event, submitButton) {
    event.preventDefault();
    setButtonLoading(submitButton, true);
    // Simulate login
    setTimeout(() => {
        // Replace with actual login logic here
        alert('Login form submitted!');
        setButtonLoading(submitButton, false);
    }, 1000);
}

function handleForumSearch(event, submitButton){
    // Mock handler for forum search.
    event.preventDefault();
    const searchInput = document.getElementById('forum-search-input');
    if (!searchInput || !searchInput.value.trim()) {
        alert("Please enter a search term.");
        return;
    }
    setButtonLoading(submitButton, true);
    setTimeout(() => { // Simulate search
        alert(`Searching for: "${searchInput.value}" (Search functionality is a demo).`);
        setButtonLoading(submitButton, false);
    }, 1000);
}

function displayMessage(formType, message, isSuccess = false) {
    // Displays a success or error message in the designated message box for a form.
    const messageBox = document.getElementById(`message-box-${formType}`);
    if (messageBox) {
        messageBox.innerHTML = message; // Use innerHTML to allow for simple HTML in messages if needed.
        messageBox.className = 'message-box'; // Reset classes.
        messageBox.classList.add(isSuccess ? 'success' : 'error');
        messageBox.style.display = 'block';
    }
}
function clearMessage(formType) {
    // Clears any existing message from a form's message box.
    const messageBox = document.getElementById(`message-box-${formType}`);
    if (messageBox) {
        messageBox.style.display = 'none';
        messageBox.textContent = '';
    }
}

// --- Authentication Logic Callbacks ---
function handleLogin(event, submitButton) {
    event.preventDefault();
    setButtonLoading(submitButton, true);
    clearMessage('login');
    const email = event.target.email.value;
    const password = event.target.password.value;

    setTimeout(() => { // Simulate API call delay
        if (email === 'user@darktorch.com' && password === 'password123') {
            currentUser = { username: 'Jannik Darktorch', email: email }; // Example user
            updateNav(); 
            displayMessage('login', 'Login successful! Redirecting to the main application...', true);
            setTimeout(() => { appContent.innerHTML = getPageContents()['app-loading']; }, 500); // Show loading screen
            setTimeout(() => { 
                // Attempt to redirect to your main app.
                // IMPORTANT: Adjust 'client/public/index.html' to the correct path of your main React app.
                // If running locally, this might be 'http://localhost:3000/' or similar.
                window.location.href = 'client/public/index.html'; 
            }, 2500);
        } else if (email && password) {
            displayMessage('login', 'Invalid email or password. (Hint: user@darktorch.com / password123)');
        } else {
            displayMessage('login', 'Please enter both email and password.');
        }
        setButtonLoading(submitButton, false);
    }, 1000);
}

function handleSignup(event, submitButton) {
    event.preventDefault();
    setButtonLoading(submitButton, true);
    clearMessage('signup');
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    setTimeout(() => { // Simulate API call
        if (!username || !email || !password || !confirmPassword) {
            displayMessage('signup', 'All fields are required.'); setButtonLoading(submitButton, false); return;
        }
        if (password.length < 8) {
            displayMessage('signup', 'Password must be at least 8 characters.'); setButtonLoading(submitButton, false); return;
        }
        if (password !== confirmPassword) {
            displayMessage('signup', 'Passwords do not match.'); setButtonLoading(submitButton, false); return;
        }
        // Mock successful signup:
        currentUser = { username: username, email: email }; 
        updateNav(); // Update navigation to reflect logged-in state.
        displayMessage('signup', `Account for ${username} created successfully! Welcome to DarkTorch!`, true);
        setTimeout(() => navigateTo('home'), 2500); // Redirect to home or a dashboard page after signup.
        setButtonLoading(submitButton, false);
    }, 1000);
}

function handleForgotPassword(event, submitButton) {
    event.preventDefault();
    setButtonLoading(submitButton, true);
    clearMessage('forgot');
    const email = event.target.email.value;
    
    setTimeout(() => { // Simulate API call
        if (!email) {
            displayMessage('forgot', 'Please enter your email address.'); setButtonLoading(submitButton, false); return;
        }
        // Mock sending reset link:
        displayMessage('forgot', `If an account exists for ${email}, a password reset link has been sent. Please check your inbox.`, true);
        setTimeout(() => navigateTo('login'), 3500); // Redirect to login page.
        setButtonLoading(submitButton, false);
    }, 1000);
}
        
function handleSettingsUpdate(event, submitButton) {
    event.preventDefault();
    if (!currentUser) {
         displayMessage('settings', 'Error: You must be logged in to change settings.', false);
         return;
    }
    setButtonLoading(submitButton, true);
    clearMessage('settings');
    const name = event.target.name.value;
    const email = event.target.email.value;
    // Basic validation
    if (!name || !email) {
        displayMessage('settings', 'Name and Email cannot be empty.', false);
        setButtonLoading(submitButton, false);
        return;
    }
    
    setTimeout(() => { // Simulate API call
        currentUser.username = name;
        currentUser.email = email;
        // Add actual password change logic here if currentPassword and newPassword are provided and valid.
        updateNav(); // Update nav if username (displayed part) changed.
        renderPage('account-settings'); // Re-render to show updated values in form fields.
        displayMessage('settings', 'Account settings updated successfully!', true);
        setButtonLoading(submitButton, false);
    }, 1000);
}

function handleLogout(event) {
    if(event) event.preventDefault(); // Prevent default link behavior if it's an anchor.
    currentUser = null; // Clear user state.

    // Close dropdown if open
    const dropdown = document.getElementById('account-dropdown');
    if(dropdown) dropdown.classList.remove('show');
    const accountToggle = document.querySelector('.account-menu-toggle');
    if(accountToggle) accountToggle.setAttribute('aria-expanded', 'false');
    
    updateNav(); // Update navigation to reflect logged-out state.
    navigateTo('home'); // Go to home page.

    // Display a transient logout message on the home page.
    setTimeout(() => {
        if(window.location.hash === '#home' || window.location.hash === ''){
            const homeHeroContainer = document.querySelector('.home-hero .container'); // Target a specific element on home
            if(homeHeroContainer){
                let logoutMsgEl = document.getElementById('logout-message-transient');
                if(!logoutMsgEl){ // Create if doesn't exist
                    logoutMsgEl = document.createElement('p');
                    logoutMsgEl.id = 'logout-message-transient';
                    logoutMsgEl.style.color = 'var(--success-color)';
                    logoutMsgEl.style.marginTop = '1.5rem'; // More spacing
                    logoutMsgEl.style.fontSize = '1.05rem';
                    logoutMsgEl.style.fontWeight = '500';
                    // Insert after the subtitle or at the end of container
                    const subtitle = homeHeroContainer.querySelector('p.subtitle');
                    if(subtitle && subtitle.nextSibling) {
                        homeHeroContainer.insertBefore(logoutMsgEl, subtitle.nextSibling);
                    } else {
                        homeHeroContainer.appendChild(logoutMsgEl);
                    }
                }
                logoutMsgEl.textContent = 'You have been successfully logged out.';
                logoutMsgEl.style.opacity = '1';
                logoutMsgEl.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => { 
                    logoutMsgEl.style.opacity = '0';
                    setTimeout(() => { logoutMsgEl.remove(); }, 500); // Remove after fade
                }, 3500); // Message visible for 3.5 seconds
            }
        }
    }, 100); // Slight delay to ensure page transition
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM element selectors once the DOM is ready.
    appContent = document.getElementById('app-content');
    navLinksContainer = document.getElementById('nav-links');
    if (!navLinksContainer) {
        navLinksContainer = document.createElement('ul');
        navLinksContainer.id = 'nav-links';
        document.querySelector('nav').appendChild(navLinksContainer);
    }
    document.getElementById('current-year').textContent = new Date().getFullYear();

    updateNav(); // Set up initial navigation based on login state.
    const initialPage = window.location.hash.substring(1) || 'home';
    renderPage(initialPage); // Render the initial page based on URL hash or default to home.
});

window.addEventListener('hashchange', () => {
    // Handles navigation when the URL hash changes.
    const pageName = window.location.hash.substring(1) || 'home';
    renderPage(pageName);
    
    // Ensure dropdown closes if open when navigating via hash change (e.g., browser back/forward)
    const dropdown = document.getElementById('account-dropdown');
    const accountToggle = document.querySelector('.account-menu-toggle');
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        if(accountToggle) accountToggle.setAttribute('aria-expanded', 'false');
    }
});

// Global click listener for closing dropdown and handling data-page navigation from dynamic content.
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Close account dropdown if click is outside
    const openDropdown = document.querySelector('.dropdown-content.show');
    const accountMenu = target.closest('.account-menu'); // Check if click is within the account menu
    if (openDropdown && !accountMenu) { // If dropdown is open AND click is outside account menu
        openDropdown.classList.remove('show');
        const toggle = document.querySelector('.account-menu-toggle');
        if(toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    // Handle clicks on links with data-page attribute (for SPA navigation)
    const targetLink = target.closest('a[data-page]');
    if (targetLink) {
        if (targetLink.dataset.page === 'logout') {
            // Logout is handled by its specific event listener in updateNav, no further action needed here.
            // but if it wasn't, we could call handleLogout(event) here.
        } else if (targetLink.getAttribute('href').startsWith('#')) {
            // For internal SPA links, the hashchange event will handle rendering.
            // No preventDefault needed as we want the hash to change.
        }
        // For external links or buttons not using hash navigation, they'd be handled normally.
    }

    // Handle clicks on pricing card buttons that should navigate to signup
    const pricingSignupButton = target.closest('.pricing-card button[data-page="signup"]');
    if (pricingSignupButton) {
        navigateTo('signup');
    }
});
