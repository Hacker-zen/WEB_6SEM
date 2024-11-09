const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const fullName = document.querySelector('#fullName').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;

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
      {
        id: 'fullName',
        value: fullName,
      },
      {
        id: 'phoneNumber',
        value: phoneNumber,
      },
      {
        id: 'role',
        value: 'user',
      },
    ],
  };

  try {
    const baseUrl = 'https://web-6.onrender.com';
    const url = `${baseUrl}/auth-api/signup`;

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
      login(email, password);
    } else {
      console.log(data.formFields);
      alert(data.formFields);
    }
  } catch (error) {
    console.error(error);
  }
});

async function login(email, password) {
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
    const baseUrl = 'https://web-6.onrender.com'; // Set default if no env variable
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

    if (response.ok) {
      console.log(response.headers);

      localStorage.setItem('is_logged', true);

      window.location.href = '/';
    } else {
      const error = await response.json();

      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
}
