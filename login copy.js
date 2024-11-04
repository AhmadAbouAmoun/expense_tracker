document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    window.location.href = 'money.html';
    let userName = document.getElementById('name_field').value;
    let budget = document.getElementById('budget').value;
    localStorage.setItem('userName', userName);
    console.log(`Saved userName: ${userName}`)
    localStorage.setItem('budget', budget);
  
    alert('Account information saved to local storage');
  });
  
  
  const userName = localStorage.getItem('userName');
  const budget = localStorage.getItem('budget');
  if (userName && budget) {
    window.location.href = 'money.html';
  }
 