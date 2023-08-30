<<<<<<< HEAD
<template>
=======
<!-- <template>
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
    <div>
      <h1>Login Success Page</h1>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      if (code) {
        // Send the 'code' to the backend
        this.sendCodeToBackend(code);
      }
    },
    methods: {
      async sendCodeToBackend(code) {
        try {
<<<<<<< HEAD
          const response = await axios.post('http://124.221.99.127:10810/user/login', { code });
=======
          const response = await axios.post('https://recruit.sends.cc/api/user/login', { code });
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
          const token = response.data.token;
  
          // Save the 'token' to local storage or state
          localStorage.setItem('token', token);
  
          // Now you have the token, you can redirect the user to the homepage or do further actions
          // For example: 
          this.$router.push('/homepage');
        } catch (error) {
          console.error('Error sending code to backend', error);
        }
      }
    }
  }
  </script>
<<<<<<< HEAD
  
=======
   -->
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
