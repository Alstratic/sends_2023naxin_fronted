<!-- <template>
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
          const response = await axios.post('http://124.221.99.127:10810/user/login', { code });
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
   -->