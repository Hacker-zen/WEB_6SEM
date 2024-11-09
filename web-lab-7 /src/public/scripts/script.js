(function () {
  window.addEventListener('load', function () {
    var loadTime =
      performance.timing.domContentLoadedEventEnd -
      performance.timing.navigationStart;
    console.log('Время загрузки страницы: ' + loadTime + ' ms');
    const p = document.getElementById('pageLoad');
    // Check if the element exists before setting innerHTML
    if (p) {
      p.innerHTML =
        'Total load time: ' +
        loadTime +
        ' ms (client) and ' +
        server_processed_time +
        ' ms (server)';
    }

    // Step 2.1: Add a preloader with a GIF animation
    const preloader = document.getElementById('preloader');

    // Check if the preloader element exists before setting innerHTML
    if (preloader) {
      preloader.innerHTML =
        '<img src="./pics/homer-simpson-the-simpsons.gif" alt="Loading...">';
    }

    // Step 2.2: Wait for the page load event and initiate a call to the data provider using the Fetch API
    fetchUserData();
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Adjust this value to control the number of products per slide
    spaceBetween: 0,
    loop: false,
    // Add other configuration options as needed
  });

  var currentPage = document.location.href;
  var menuLinks = document.querySelectorAll('.navchoice a');

  menuLinks.forEach(function (link) {
    if (currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  var nextButton = document.querySelector('.swiper-button-next');

  nextButton.addEventListener('click', function () {
    // Get the total number of slides
    var totalSlides = mySwiper.slides.length;
    // Get the current active slide
    var activeIndex = mySwiper.activeIndex;

    // Check if the next click will go beyond the total number of slides
    if (activeIndex + mySwiper.params.slidesPerView < totalSlides) {
      // If not, proceed with the next slides
      mySwiper.slideNext();
    } else {
      // If the next click will exceed the total slides, go to the first slide
      mySwiper.slideTo(0);
    }
  });
});

function fetchUserData() {
  // Step 3: Initiate a call to the data provider using the Fetch API
  const randomId = Math.floor(Math.random() * 10) + 1; // Generate a random number (1 or 2)

  // Adjust the request URL based on the random number
  const apiUrl = `https://jsonplaceholder.typicode.com/users/${randomId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found)
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Step 4: Hide the preloader, deserialize the data, and render the received data
      const preloader = document.getElementById('preloader');

      // Check if the preloader element exists before hiding it
      if (preloader) {
        preloader.style.display = 'none';
      }

      // Step 5: Render the received data to the user profile container
      const usernameElement = document.getElementById('username');
      const nameElement = document.getElementById('name');

      if (usernameElement && nameElement) {
        // Check if the elements exist before updating their content
        usernameElement.innerText = data.username;
        nameElement.innerText = data.name;
        // Add more profile fields as needed
      }

      // Step 6: Pseudo-random filtering and additional logic (not implemented in this example)
    })
    .catch((error) => {
      // Step 6: Handle errors
      console.error('Error during data fetch:', error);

      // Hide the preloader and display an error message
      const preloader = document.getElementById('preloader');

      // Check if the preloader element exists before hiding it
      if (preloader) {
        preloader.style.display = 'none';
      } else {
        console.error('Element with id "preloader" not found.');
      }

      const errorMessageElement = document.getElementById('error-message');
      if (errorMessageElement) {
        errorMessageElement.innerText =
          '⚠ Something went wrong. Please try again later.';
      } else {
        console.error('Element with id "error-message" not found.');
      }
    });
}

// Function to open the profile.html page
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openProfilePage() {
  window.location.href = '/profile';
}

document.addEventListener('DOMContentLoaded', function () {
  const userElement = document.getElementById('user');
  const is_authorised = localStorage.getItem('is_logged');

  if (is_authorised == 'true') {
    // User is logged in
    userElement.innerHTML = `
      <div id="profile-picture" onclick="openProfilePage()">
        <img src="pics/profile.jpeg" alt="profile">
      </div>
      <button id="logoutButton" type="submit">Logout</button>
    `;
  } else {
    // User is not logged in
    userElement.innerHTML = `
      <a class="login_text" href="/login">Login</a>
      <a class="signUp_text" href="/signUp">Sign Up</a>
    `;
  }
});
