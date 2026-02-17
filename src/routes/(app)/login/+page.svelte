<script lang="ts">
  import salonBg from '$lib/assets/hero3.png';

  // function to handle login
  const handleLogin = async (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get('email')
    const password = formData.get('password')
    
    const request = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const response = await request.json()
    console.log(response)
    if (response.success) {
      window.location.href = '/dashboard'
    }
  }
</script>

<div class="relative flex items-center justify-center min-h-screen py-12 px-4 overflow-hidden bg-background  ">

  <div class="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#C8A180]/80 rounded-full blur-[100px] pointer-events-none"></div>

  <div class="absolute -bottom-20 -right-30 w-[500px] h-[500px] bg-[#D9B79A]/80 rounded-full blur-[100px] pointer-events-none"></div>

 
  <div class="relative z-10 flex flex-col md:flex-row  max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-secondary">
    
    
    

    
    <div class="flex-1 flex flex-col justify-start p-8 md:p-16 pt-20">
      <div class="w-full max-w-md mx-auto space-y-16 md:pt-12">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold text-[#4A2F1F] mb-2">Welcome Back</h2>
        <p class="text-gray-500 mb-8 font-medium">
          Login to your account and start enjoying our services.
        </p>

        </div>
        <form class="space-y-6" on:submit|preventDefault={handleLogin}>
          

          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Email Address</span>
            <input
              type="email"
              placeholder="jane@example.com"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              name="email"
              required
            />
          </div>

          <div class="space-y-2">
            <span class="text-sm font-semibold text-gray-700">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              name="password"
              required
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-primary hover:bg-[#8B6A50] text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] mt-8"
          >
            Login
          </button>

          <p class="text-center text-gray-600 mt-6">
            Don't have an account? 
            <a href="/register" class="text-[#9E7A5D] font-bold hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>

    <div class="hidden md:flex flex-1 relative bg-cover bg-center bg-primary">
      
      <img src={salonBg}  alt="salon" />


      <div class="absolute inset-0 bg-black/20 "></div>
      
     
      
    </div>
  </div>
</div>
