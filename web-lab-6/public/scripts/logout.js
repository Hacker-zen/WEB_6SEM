function logout() {
  const baseUrl = 'https://web-6.onrender.com';
  const url = `${baseUrl}/auth-api/signout`;
  fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        console.log('Logout successful!');
        localStorage.setItem('is_logged', false);
        window.location.href = '/index';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Logout error:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', logout);
});
