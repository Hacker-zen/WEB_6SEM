const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const body = {
    formFields: [
      {
        id: 'email',
        value: email,
      },
      {
        id: 'password',
        value: password,
      },
    ],
  };

  try {
    const baseUrl = 'https://web-6.onrender.com';
    const url = `${baseUrl}/auth-api/signin`;

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.status === 'OK') {
      localStorage.setItem('is_logged', true);
      localStorage.setItem('userId', data.user.id);

      console.log(data);
      window.location.href = '/';
    } else {
      const error = data.status;
      alert(error);
    }
  } catch (error) {
    console.error(error);
  }
});
